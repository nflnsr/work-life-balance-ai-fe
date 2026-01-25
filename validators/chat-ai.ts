import { z } from "zod";

export const chatAISchema = z.object({
  message: z.string().min(5, { error : "pesan minimal 5 karakter"})
});

export type ChatAIFormType = z.infer<typeof chatAISchema>;
