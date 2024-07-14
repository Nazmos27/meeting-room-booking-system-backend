import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, {
        message: 'Password is required & should be at least 6 character',
      }),
    phone: z
      .string()
      .min(1, { message: 'Number should be minimum 11 digits' }),
    address: z.string().min(1, { message: 'Address is required' }),
    role: z.enum(['user', 'admin'], {
      message: "Role must be either 'user' or 'admin'",
    }),
  }),
});
