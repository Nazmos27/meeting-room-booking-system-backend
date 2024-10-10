import z from 'zod';
export const roomValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Room name is required' }),
    img: z.string().nonempty({ message: 'Img is required' }).optional(),

    detailImages: z
      .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
      .optional(),
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
  }),
});


export const updateRoomsValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }).optional(),
  img: z.string().nonempty({ message: 'Img is required' }).optional(),

  detailImages: z
    .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
    .optional(),
  roomNo: z
    .number()
    .int()
    .nonnegative({ message: 'Room number must be a non-negative integer' })
    .optional(),
  floorNo: z
    .number()
    .int()
    .nonnegative({ message: 'Floor number must be a non-negative integer' })
    .optional(),
  capacity: z
    .number()
    .int()
    .positive({ message: 'Capacity must be a positive integer' })
    .optional(),
  pricePerSlot: z
    .number()
    .positive({ message: 'Price per slot must be a positive number' })
    .optional(),
  amenities: z
    .array(z.string().nonempty({ message: 'Amenity cannot be empty' }))
    .nonempty({ message: 'At least one amenity is required' })
    .optional(),
});
