export type Dimension = 
  | 'Akademik'
  | 'Pengembangan Diri'
  | 'Sosial dan Relasi'
  | 'Personal dan Mental'
  | 'Karier dan Masa Depan';

export interface Question {
  id: number;
  dimension: Dimension;
  text: string;
}

export interface Answer {
  questionId: number;
  questionText: string;
  dimension: Dimension;
  score: number;
}

export interface DimensionalScore {
  dimension: string;
  score: number;
  analysis: string;
}

export interface Recommendation {
  id: number;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface WLBResult {
  overallScore: number;
  summary: string;
  dimensionalScores: DimensionalScore[];
  recommendations: Recommendation[];
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

export interface UserProgress {
  initialResult: WLBResult;
  currentScore: number;
  lastUpdate: string; // ISO date string
  checkedRecommendationIds: number[];
  schedule: string;
}
