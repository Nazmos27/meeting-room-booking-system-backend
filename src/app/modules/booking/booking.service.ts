import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { RoomModel } from '../room/room.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import AppError from '../../errors/AppError';
import { SlotModel } from '../slot/slot.model';
import { UserModel } from '../user/user.model';
import mongoose, { Types } from 'mongoose';
import config from '../../config';

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
      const slotBooked = await SlotModel.isSlotBookedChecker(slot);
      if (!slot || slotBooked) {
        throw new AppError(httpStatus.NOT_FOUND, 'Slot does not exist');
      }
    }
    return true;
  };

  const success = await checkSlots(slotArray);
  if (success) {
    for (const item of slotArray) {
      const slotId = new mongoose.Types.ObjectId(item);
      const slot = await SlotModel.isSlotExistsChecker(slotId);
      await SlotModel.findByIdAndUpdate(
        { _id: slotId },
        { ...payload, isBooked: !slot.isBooked },
        { new: true },
      );
    }
  }

  //check if the user exists
  const userDataForChecking = {
    id: payload?.user,
    email: '',
  };

  const user = await UserModel.isUserExistChecker(userDataForChecking);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  // const userEmail = user?.email;
  // if ((await UserModel.isAuthorizedUserChecker(userEmail)) === false) {
  //   throw new AppError(
  //     httpStatus.UNAUTHORIZED,
  //     'Use your unique User Id to create booking',
  //   );
  // }

  const totalAmount = room.pricePerSlot * slotArray.length;

  const finalData = { ...payload, totalAmount };

  const newBooking = await BookingModel.create(finalData);

  return newBooking;
};

const getAllBookingsFromDB = async () => {
  const bookings = await BookingModel.find()
    .populate({ path: 'user', select: '-password' })
    .populate('room')
    .populate('slots');
  return bookings;
};

const getMyBookingsFromDB = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userEmail } = decoded;

  const userDataForChecking = {
    email: userEmail,
    id: '',
  };
  const user = await UserModel.isUserExistChecker(userDataForChecking);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  const id = user._id;
  const bookings = await BookingModel.find({ user: id }, { user: false })
    .populate('room')
    .populate('slots');
  return bookings;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const booking = await BookingModel.findById(id);
  if (!booking)
    throw new AppError(httpStatus.NOT_FOUND, 'Booking does not exist');
  const updatedBooking = await BookingModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedBooking;
};
const deleteBookingFromDB = async (id: string) => {
  const booking = await BookingModel.findById(id);
  if (!booking)
    throw new AppError(httpStatus.NOT_FOUND, 'Booking does not exist');
  const updatedBooking = await BookingModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return updatedBooking;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  updateBookingIntoDB,
  getMyBookingsFromDB,
  deleteBookingFromDB,
};
