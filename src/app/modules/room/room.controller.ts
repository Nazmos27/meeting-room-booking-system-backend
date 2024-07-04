import catchAsync from "../../utils/catchAsync";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async(req,res) => {
    const result = await RoomServices.createRoomIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: 'Room created successfully',
        data: result,
      });
})

export const RoomControllers = {
    createRoom,
}