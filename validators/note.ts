import { z } from "zod";

export const noteSchema = z.object({
  content: z.string().min(3, { error : "note minimal 3 karakter"})
});

export type NoteFormType = z.infer<typeof noteSchema>;
