import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>({
  room: {
    type: Schema.Types.ObjectId,
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

// slotSchema.pre('save', async function (next) {




// //   const [startHours, startMinutes] = this.startTime.split(':').map(Number);
// //   const [endHours, endMinutes] = this.endTime.split(':').map(Number);

// //   const startDate = new Date(0, 0, 0, startHours, startMinutes);
// //   const endDate = new Date(0, 0, 0, endHours, endMinutes);

// //   // Calculate the difference in milliseconds
// //   let difference = endDate - startDate;

// //   // If the difference is negative, it means the end time is past midnight
// //   if (difference < 0) {
// //     difference += 24 * 60 * 60 * 1000;
// //   }

// //   // Convert the difference back to hours and minutes
// //   const diffHours = Math.floor(difference / (1000 * 60 * 60));
// //   const diffMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

// //   const slotQuantity = diffHours;

// //   for (let i = 0; i <= slotQuantity; i++) {
// //     if (i === 0) {
// //       this.endTime = (Number(this.startTime.split(':')[0]) + 1) < 10 ? `0${(Number(this.startTime.split(':')[0]) + 1)}` : `${(Number(this.startTime.split(':')[0]) + 1).toString()}` +  ':' + this.startTime.split(':')[1];

// //     } else {
// //         this.startTime = this.endTime

// //         this.endTime = (Number(this.startTime.split(':')[0]) + 1) < 10 ? `0${(Number(this.startTime.split(':')[0]) + 1)}` : `${(Number(this.startTime.split(':')[0]) + 1).toString()}` +  ':' + this.startTime.split(':')[1];
// //     }
// //   }

//   //   const diff = `${diffHours}:${diffMinutes < 10 ? '0' : ''}${diffMinutes}`;
//   next();
// });

export const SlotModel = model<TSlot>('slots', slotSchema);
