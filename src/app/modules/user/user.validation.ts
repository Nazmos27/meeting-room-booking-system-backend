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


export const updateUserValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name cannot be empty' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }).optional(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .optional(),
  phone: z
    .string()
    .nonempty({ message: 'Phone number is required' })
    .optional(),
  address: z.string().nonempty({ message: 'Address is required' }).optional(),
  role: z
    .enum(['user', 'admin'], {
      message: 'Role must be either user or admin',
    })
    .optional(),
});
