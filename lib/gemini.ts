
import { GoogleGenAI, Type } from "@google/genai";
import type { Answer, ChatMessage, Recommendation, UserProgress, WLBResult } from "@/types/gemini";

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    overallScore: {
      type: Type.NUMBER,
      description: "An overall work-life balance score from 0 to 100, where 100 is perfect balance."
    },
    summary: {
      type: Type.STRING,
      description: "A 2-3 sentence summary of the user's work-life balance status, written in an encouraging and helpful tone."
    },
    dimensionalScores: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dimension: { type: Type.STRING },
          score: { type: Type.NUMBER, description: "A score for this specific dimension from 0 to 100." },
          analysis: { type: Type.STRING, description: "A brief, 1-2 sentence analysis of this dimension's score." }
        },
        required: ["dimension", "score", "analysis"]
      }
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
          title: { type: Type.STRING, description: "A short, actionable title for the recommendation." },
          description: { type: Type.STRING, description: "A detailed, practical description of the recommendation (2-3 sentences)." }
        },
        required: ["priority", "title", "description"]
      }
    }
  },
  required: ["overallScore", "summary", "dimensionalScores", "recommendations"]
};

export const analyzeWlbAnswers = async (ai: GoogleGenAI, answers: Answer[]): Promise<WLBResult> => {
  const formattedAnswers = answers.map(a => `- ${a.dimension}: "${a.questionText}" -> Score: ${a.score}/5`).join('\n');

  const prompt = `
    You are an expert AI work-life balance coach. Analyze the following user responses from a questionnaire. The scores range from 1 (Strongly Disagree) to 5 (Strongly Agree).

    User's Answers:
    ${formattedAnswers}

    Based on these answers, please perform the following tasks:
    1.  Calculate a score (0-100) for each unique dimension. A higher user score on a question translates to better balance in that area.
    2.  Calculate an overall work-life balance score (0-100).
    3.  Provide a brief, encouraging summary of their situation.
    4.  For each dimension, provide a short analysis.
    5.  Provide 3-5 concrete, actionable recommendations to help the user improve their work-life balance, focusing on the lowest-scoring areas. Assign a priority (High, Medium, Low) to each recommendation.

    Return the entire analysis in the specified JSON format and in Indonesian language response.
    `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: responseSchema,
      temperature: 0.5,
    }
  });

  const jsonText = response.text?.trim();
  try {
    const result = JSON.parse(jsonText as string) as WLBResult;
    // Sort recommendations by priority and add a unique ID
    const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    result.recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    (result.recommendations as Recommendation[]).forEach((rec, index) => {
        (rec as Recommendation).id = index;
    });
    return result;
  } catch (error) {
    console.error("Failed to parse Gemini response:", jsonText, error);
    throw new Error("The AI response was not in the expected format.");
  }
};

const recalculationSchema = {
    type: Type.OBJECT,
    properties: {
        newScore: { type: Type.NUMBER, description: "The new, improved score between 0 and 100." },
        feedback: { type: Type.STRING, description: "A short, 1-2 sentence encouraging feedback message." },
    },
    required: ["newScore", "feedback"]
};

export const recalculateWlbScore = async (
  ai: GoogleGenAI,
  progress: UserProgress
): Promise<{ newScore: number; feedback: string }> => {
    
    const completedRecs = progress.initialResult.recommendations.filter(r =>
        progress.checkedRecommendationIds.includes(r.id)
    );

    const prompt = `
    You are an expert AI work-life balance coach.
    A user is tracking their progress. Their previous overall score was ${progress.currentScore}.
    Today's planned schedule: "${progress.schedule || 'No schedule planned.'}".
    Today's committed WLB recommendations: ${completedRecs.length > 0 ? completedRecs.map(r => `"${r.title}"`).join(', ') : 'None'}.

    Based on these positive commitments for the day, calculate a new, improved overall score (0-100). The improvement should be gradual and realistic (e.g., a 1-5 point increase depending on the effort shown). A planned schedule and at least one completed recommendation should result in a score increase.
    
    Also, provide a short (1-2 sentences), encouraging feedback message for the user based on their planned activities.
    
    Return a JSON object with "newScore" (number) and "feedback" (string). Ensure the new score is clamped between 0 and 100.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: recalculationSchema,
      temperature: 0.4,
    }
  });

  const jsonText = response.text?.trim();
  try {
    const result = JSON.parse(jsonText as string);
    // Ensure the new score is a realistic improvement
    result.newScore = Math.max(progress.currentScore, Math.min(100, result.newScore));
     if (result.newScore === progress.currentScore && (progress.schedule || completedRecs.length > 0)) {
       result.newScore = Math.min(100, progress.currentScore + 1);
     }
    return result;
  } catch (error) {
    console.error("Failed to parse Gemini recalculation response:", jsonText, error);
    throw new Error("The AI recalculation response was not in the expected format.");
  }
};


export const getChatResponse = async (ai: GoogleGenAI, history: ChatMessage[], newMessage: string): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const systemInstruction = "You are a friendly and supportive AI assistant specializing in work-life balance. Keep your responses concise, encouraging, and focused on providing helpful advice. Do not discuss other topics.";
    
    const prompt = `
        ${systemInstruction}

        Here is the conversation history:
        ${history.map(m => `${m.sender}: ${m.text}`).join('\n')}
        user: ${newMessage}
        bot:
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            temperature: 0.7,
            maxOutputTokens: 250,
        }
    });

    return response.text as string;
};
