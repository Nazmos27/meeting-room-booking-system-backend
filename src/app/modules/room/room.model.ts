import { Schema, model } from 'mongoose';
import { RoomModelInterface, TRoom } from './room.iterface';

const roomSchema = new Schema<TRoom, RoomModelInterface>({
  name: {
    type: String,
    required: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  floorNo: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  pricePerSlot: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
});

/* roomSchema.pre('find', async function (next) {
   this.find({ isDeleted: { $ne: true } });
   next();
 });
 roomSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
}); //this make conflict while creating slot with deleted room...insteadof showing "Room is deleted", it shows "Room does not exist", as when conducting find operation, pre hook middleware was preventing to get data of where isDeleted field is true
*/

roomSchema.pre('save', async function (next) {
  const checker = await RoomModel.find({
    roomNo: this.roomNo,
    floorNo: this.floorNo,
  });
  if (checker.length > 0) {
    throw new Error('Room already exists');
  }
  next();
});

roomSchema.statics.isRoomExistChecker = async function (
  id: Schema.Types.ObjectId,
) {
  return await RoomModel.findOne({ _id: id });
};

roomSchema.statics.isRoomDeletedChecker = async function (roomData: TRoom) {
  return roomData?.isDeleted;
};

export const RoomModel = model<TRoom, RoomModelInterface>('rooms', roomSchema);
