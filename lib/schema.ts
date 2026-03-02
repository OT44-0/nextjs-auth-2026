import z from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email address!"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name must be at most 64 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(32, "Username must be at most 32 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  admin: z.boolean(),
});
export const loginSchema = z.object({
  username: z.string().min(1, "Username cannot be empty!"),
  password: z.string().min(1, "Password cannot be empty!"),
});
