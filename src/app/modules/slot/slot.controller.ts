import catchAsync from "../../utils/catchAsync";
import { SlotServices } from "./slot.service";

const createSlot = catchAsync(async(req,res) => {
    const result = await SlotServices.createSlotIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: 'Slot created successfully',
        data: result,
      });
})

export const SlotControllers = {
    createSlot,
}