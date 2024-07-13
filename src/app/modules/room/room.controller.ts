import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Room created successfully',
    data: result,
  });
});

const getAllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomsFromDB();
  if (result.length > 0) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Rooms retrieved successfully',
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
});

const getSingleRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.getSingleRoomFromDB(req.params.id);
  if (result) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Room retrieved successfully',
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
});

const updateRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.updateRoomIntoDB(req.params.id, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Room updated successfully',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.deleteRoomFromDB(req.params.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
