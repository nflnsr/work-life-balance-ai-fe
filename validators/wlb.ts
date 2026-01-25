import { z } from "zod";

export const recommendationSchema = z.object({
  content: z.string().min(3, { error : "note minimal 3 karakter"})
});

export type RecommendationFormType = z.infer<typeof recommendationSchema>;