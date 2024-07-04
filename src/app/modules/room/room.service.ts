import { TRoom } from "./room.iterface";
import { RoomModel } from "./room.model"

const createRoomIntoDB = async(payload : TRoom) => {
    const newRoom = RoomModel.create(payload)
    return newRoom;
}

export const RoomServices = {
    createRoomIntoDB,
}