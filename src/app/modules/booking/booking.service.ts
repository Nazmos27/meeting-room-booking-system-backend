import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { RoomModel } from '../room/room.model';
import { TBooking } from './booking.interface';
import { BookingModel } from './booking.model';
import AppError from '../../errors/AppError';
import { SlotModel } from '../slot/slot.model';
import { UserModel } from '../user/user.model';
import config from '../../config';
import QueryBuilder from '../../../builder/QueryBuilder';
import { generateTransactionId } from '../../utils/generateTnxId';
import { initiatePayment } from '../../utils/payment';
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
      const slotBooked = await SlotModel.isSlotBookedChecker(slot);
      if (!slot || slotBooked) {
        throw new AppError(httpStatus.NOT_FOUND, 'Slot does not exist');
      }
    }
    return true;
  };

  await checkSlots(slotArray);
  await SlotModel.updateMany(
    { _id: { $in: payload.slots } },
    { isBooked: true },
  );
  // if (success) {
  //   for (const item of slotArray) {
  //     const slotId = new mongoose.Types.ObjectId(item);
  //     const slot = await SlotModel.isSlotExistsChecker(slotId);
  //     await SlotModel.findByIdAndUpdate(
  //       { _id: slotId },
  //       { ...payload, isBooked: !slot.isBooked },
  //       { new: true },
  //     );
  //   }
  // }
  // Mark slots as booked
  //await SlotModel.updateMany({ _id: { $in: slots } }, { isBooked: true });
  //this command also update slots that has been booked

  //check if the user exists
  const userDataForChecking = {
    id: payload?.user,
    email: '',
  };

  const user = await UserModel.isUserExistChecker(userDataForChecking);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User does not exist');

  const transactionId = generateTransactionId(user);
  await BookingModel.create({
    ...payload,
    paymentStatus: 'Pending',
    txnId: transactionId,
  });

  const bookingData = {
    transactionId,
    ...payload,
    user: user,
  };
  const paymentData = await initiatePayment(bookingData);

  // Mark slots as booked
  await SlotModel.updateMany(
    { _id: { $in: payload.slots } },
    { isBooked: true },
  );

  return paymentData.data;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const allBookingsQuery = new QueryBuilder(
    BookingModel.find({ isDeleted: false })
      .populate({ path: 'user', select: '-password' })
      .populate('room')
      .populate('slots'),
    query,
  )
    .search(['date'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await allBookingsQuery.countTotal();
  const result = await allBookingsQuery.modelQuery;
  return {
    meta,
    result,
  };
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
