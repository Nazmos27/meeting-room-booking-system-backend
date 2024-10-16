import { isAfter, parseISO } from 'date-fns';
import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);

export const createSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string(),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Date must be in YYYY-MM-DD format',
        })
        .refine((date) => isAfter(parseISO(date), new Date()), {
          message: 'Date cannot be in the past',
        }),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});
export const updateSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string().optional(),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Date must be in YYYY-MM-DD format',
        })
        .refine((date) => isAfter(parseISO(date), new Date()), {
          message: 'Date cannot be in the past',
        })
        .optional(),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    )
    .optional(),
});
