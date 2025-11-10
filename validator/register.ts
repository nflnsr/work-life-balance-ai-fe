import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(3, "minimal 3 karakter"),
    email: z.email("alamat email invalid"),
    password: z.string().min(8, "password minimal 8 karakter"),
    confirmPassword: z
      .string()
      .min(8, "konfirmasi password minimal 8 karakter"),
    phone: z.string().min(8, "minimal 8 karakter"),
    gender: z.enum(["male", "female"], "gender harus dipilih"),
    isStudent: z.boolean("status pelajar harus dipilih"),
    age: z.number().min(1, "umur harus diisi"),
    field: z.string().min(2, "bidang harus diisi"),
    hobbies: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "konfirmasi password harus sama dengan password",
    path: ["confirmPassword"],
  });

export type FormType = z.infer<typeof formSchema>;
