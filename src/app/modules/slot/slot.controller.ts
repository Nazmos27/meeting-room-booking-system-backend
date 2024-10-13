import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req, res) => {
  if (req.query.date && req.query.roomId) {
    const result = await SlotServices.getAvailableSlots(req.query);
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Available slots retrieved successfully',
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
  } else {
    const result = await SlotServices.getAvailableSlots();
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Available slots retrieved successfully',
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
  }
});

const updateSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.updateSlotIntoDB(id, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Slot updated successfully',
    data: result,
  });
});

const deleteSingleSlot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SlotServices.deleteSlotFromDB(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Slot deleted successfully',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAvailableSlots,
  updateSingleSlot,
  deleteSingleSlot,
};
