/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose"

export type TSlot = {
    room : Types.ObjectId,
    date : string,
    startTime : string,
    endTime : string,
    isBooked? : boolean
}

export interface SlotModelInterface extends Model<TSlot> {
    isSlotExistsChecker( id : Types.ObjectId) : Promise<TSlot>
    isSlotBookedChecker( slotData : TSlot) : Promise<boolean>
}