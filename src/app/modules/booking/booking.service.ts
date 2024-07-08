import httpStatus from 'http-status';
import { RoomModel } from '../room/room.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import AppError from '../../errors/AppError';
import { SlotModel } from '../slot/slot.model';
import { UserModel } from '../user/user.model';
import mongoose, { Types } from 'mongoose';

const createBookingIntoDB = async (payload: TBooking) => {
  //check if that room exists
  const room = await RoomModel.isRoomExistChecker(payload.room);
  if (!room) throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');

  //check if the room is already deleted
  if (await RoomModel.isRoomDeletedChecker(room)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found, may be deleted');
  }

  //check if that slot exists
  const slotArray = payload.slots;

  const checkSlots = async (slotArray: Types.ObjectId[]) => {
    for (const item of slotArray) {
      const slotId = new mongoose.Types.ObjectId(item);
      const slot = await SlotModel.isSlotExistsChecker(slotId);
      if (!slot) {
        throw new AppError(httpStatus.NOT_FOUND, 'Slot does not exist');
      }
    }
    return null;
  };

  await checkSlots(slotArray);

  //check if the user exists
  const userDataForChecking = {
    id: payload.user,
    email: '',
  };
  const user = await UserModel.isUserExistChecker(userDataForChecking);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const newBooking = await BookingModel.create(payload);
  return newBooking;
};

export const BookingServices = {
  createBookingIntoDB,
};
