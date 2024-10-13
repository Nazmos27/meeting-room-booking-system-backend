import { Schema, model } from 'mongoose';
import { SlotModelInterface, TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot, SlotModelInterface>(
  {
    room: {
      type: Schema.Types.ObjectId,
      required: true,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

slotSchema.pre('save', async function (next) {
  this.isBooked = false;
  next();
});

slotSchema.statics.isSlotExistsChecker = async function (
  id: Schema.Types.ObjectId,
) {
  return await SlotModel.findOne({ _id: id });
};

slotSchema.statics.isSlotBookedChecker = async function (slotData: TSlot) {
  return slotData?.isBooked;
};

export const SlotModel = model<TSlot, SlotModelInterface>('slots', slotSchema);
