import { Schema, model } from 'mongoose';
import { SlotModelInterface, TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot, SlotModelInterface>({
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

slotSchema.statics.isSlotExistsChecker = async function (
  id: Schema.Types.ObjectId,
) {
  return await SlotModel.findOne({ _id:id });
};



export const SlotModel = model<TSlot, SlotModelInterface>('slots', slotSchema);
