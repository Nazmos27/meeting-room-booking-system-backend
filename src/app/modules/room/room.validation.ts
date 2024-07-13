import z from 'zod';
export const roomValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Room name is required' }),
    roomNo: z
      .number()
      .int()
      .min(1, { message: 'Room number must be a positive integer' }),
    floorNo: z
      .number()
      .int()
      .min(1, { message: 'Floor number must be a positive integer' }),
    capacity: z
      .number()
      .int()
      .min(1, { message: 'Capacity must be a positive integer' }),
    pricePerSlot: z
      .number()
      .min(0, { message: 'Price per slot must be a non-negative number' }),
    amenities: z
      .array(z.string())
      .nonempty({ message: 'At least one amenity is required' }),
    isDeleted: z
      .boolean()
      .refine((val) => val === true || val === false, {
        message: 'isDeleted must be a boolean',
      }),
  }),
});
