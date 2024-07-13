/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
};

export interface RoomModelInterface extends Model<TRoom> {
  isRoomExistChecker(id: Types.ObjectId): Promise<TRoom>;
  isRoomDeletedChecker(roomData: TRoom): Promise<boolean>;
}
