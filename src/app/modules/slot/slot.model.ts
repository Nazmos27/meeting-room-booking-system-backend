import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
    required : true,
    ref: 'rooms',
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
  },
});

slotSchema.pre('save', async function (next) {
  this.isBooked = false;
  next();
});

slotSchema.pre('find', async function (next) {
    this.find({ isBooked: { $ne: true } });
    next();
  });



export const SlotModel = model<TSlot>('slots', slotSchema);
