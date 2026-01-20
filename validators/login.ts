import { z } from "zod";

export const formSchema = z.object({
  email: z.email({
    error: "alamat email tidak valid",
  }),
  password: z
    .string()
    .min(8, {
      error: "password minimal 8 karakter",
    }),
    // .max(32, {
    //   error: "Password must be at most 32 characters long",
    // })
    // .refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val), {
    //   error:
    //     "Password must contain at least one uppercase letter, one lowercase letter and one number.",
    // }),
  rememberMe: z.boolean().optional(),
});

export type FormType = z.infer<typeof formSchema>;
