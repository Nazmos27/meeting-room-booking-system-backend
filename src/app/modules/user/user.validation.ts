import { z } from 'zod';


export const userValidationSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    phone: z.number().positive({ message: "Phone number must be positive" }).int({ message: "Phone number must be an integer" }),
    address: z.string().min(1, { message: "Address is required" }),
    role: z.enum(['user', 'admin'], { message: "Role must be either 'user' or 'admin'" })
  });