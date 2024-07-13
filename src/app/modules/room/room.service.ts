import { TRoom } from './room.iterface';
import { RoomModel } from './room.model';

const createRoomIntoDB = async (payload: TRoom) => {
  const newRoom = await RoomModel.create(payload);
  return newRoom;
};

const getAllRoomsFromDB = async () => {
  const result = await RoomModel.find();
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await RoomModel.findById({ _id: id });
  return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  const result = await RoomModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await RoomModel.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
