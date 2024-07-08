import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { RoomModel } from '../room/room.model';
import { TSlot } from './slot.interface';
import { SlotModel } from './slot.model';

const createSlotIntoDB = async (payload: TSlot) => {
  //check if that room exist
  const room = await RoomModel.isRoomExistChecker(payload.room);
  if (!room) throw new AppError(httpStatus.NOT_FOUND, 'Room does not exist');

  //check if the room is already deleted
  if (await RoomModel.isRoomDeletedChecker(room)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found, may be deleted');
  }

  const startTime = payload.startTime;
  const endTime = payload.endTime;

  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  const startDate = new Date(0, 0, 0, startHours, startMinutes);
  const endDate = new Date(0, 0, 0, endHours, endMinutes);

  // Calculate the difference in milliseconds
  let difference = endDate - startDate;

  // If the difference is negative, it means the end time is past midnight
  if (difference < 0) {
    difference += 24 * 60 * 60 * 1000;
  }

  // Convert the difference back to hours and minutes
  const diffHours = Math.floor(difference / (1000 * 60 * 60));

  const slotQuantity = diffHours;
  const data = [];
  for (let i = 0; i < slotQuantity; i++) {
    if (i === 0) {
      const newEndTime =
        (Number(startTime.split(':')[0]) + 1 < 10
          ? `0${Number(startTime.split(':')[0]) + 1}`
          : `${(Number(startTime.split(':')[0]) + 1).toString()}`) +
        ':' +
        `${startTime.split(':')[1].toString()}`;

      const newData = {
        room: payload.room,
        date: payload.date,
        startTime: payload.startTime,
        endTime: newEndTime,
      };
      data.push(newData);
    } else {
      const newStartTime =
        (Number(startTime.split(':')[0]) + i < 10
          ? `0${Number(startTime.split(':')[0]) + i}`
          : `${(Number(startTime.split(':')[0]) + i).toString()}`) +
        ':' +
        startTime.split(':')[1];
      const newEndTime =
        (Number(newStartTime.split(':')[0]) + 1 < 10
          ? `0${Number(newStartTime.split(':')[0]) + 1}`
          : `${(Number(newStartTime.split(':')[0]) + 1).toString()}`) +
        ':' +
        startTime.split(':')[1];

      const newData = {
        room: payload.room,
        date: payload.date,
        startTime: newStartTime,
        endTime: newEndTime,
      };
      data.push(newData);
    }
  }

  const newSlot = SlotModel.create(...data);
  return newSlot;
};

const getAvailableSlots = async (query?: Record<string, unknown>) => {
  if (!query) {
    const result = await SlotModel.find().populate('room');
    return result;
  } else {
    const { date, roomId } = query;
    const result = await SlotModel.find({ date, room: roomId }).populate(
      'room',
    );
    return result;
  }
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableSlots,
};
