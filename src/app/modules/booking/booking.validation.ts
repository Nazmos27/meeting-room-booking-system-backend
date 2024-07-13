import z from 'zod';
import { parseISO, isAfter } from 'date-fns';

export const bookingValidationSchema = z.object({
  body: z.object({
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Date must be in YYYY-MM-DD format',
      })
      .refine((date) => isAfter(parseISO(date), new Date()), {
        message: 'Date cannot be in the past',
      }),
    slots: z
      .array(z.string().min(1, { message: 'Slot ID is required' }))
      .min(1, { message: 'At least one slot is required' }),
    room: z.string().min(1, { message: 'Room ID is required' }),
    user: z.string().min(1, { message: 'User ID is required' }),
  }),
});
