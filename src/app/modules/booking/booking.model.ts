import { model, Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'slots',
        required: true,
      },
    ],
    room: {
      type: Schema.Types.ObjectId,
      ref: 'rooms',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
    },
    tnxId: {
      type: String,
      required: true,
    },
    isConfirmed: {
      type: String,
      enum: ['unconfirmed', 'confirmed'],
      default: 'unconfirmed',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// bookingSchema.pre('save', async function (next) {
//   this.isConfirmed = 'unconfirmed';
//   this.isDeleted = false;
//   next();
// });

bookingSchema.post('save', async function (doc, next) {
  await doc.populate([
    { path: 'user', select: '-password' }, // Exclude password field
    { path: 'room' },
    { path: 'slots' },
  ]);
  next();
});

export const BookingModel = model<TBooking>('bookings', bookingSchema);
