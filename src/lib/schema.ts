import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  userid: z.string(),
  username: z.string().min(2).max(50),
  userrole: z.string(),
  email: z.string().email(),
  phone: z.string(),
  country: z.string(),
});

export const userFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  role: z.string().min(1, { message: "Role is required" }),
});
