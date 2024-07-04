import { TSlot } from "./slot.interface";
import { SlotModel } from "./slot.model";

const createSlotIntoDB = async(payload : TSlot) => {
    const newSlot = SlotModel.create(payload)
    return newSlot;
}

export const SlotServices = {
    createSlotIntoDB,
}