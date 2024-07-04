import { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>({
    room : {
        type : Schema.Types.ObjectId,
        ref : 'rooms'
    },
    date : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    },
    isBooked : {
        type : Boolean,
        required : true
    }
})

export const SlotModel = model<TSlot>('slots', slotSchema)