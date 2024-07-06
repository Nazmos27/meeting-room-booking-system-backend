import { Schema, model } from "mongoose";
import { TRoom } from "./room.iterface";

const roomSchema = new Schema<TRoom>({
    name : {
        type : String,
        required : true
    },
    roomNo : {
        type : Number,
        required : true
    },
    floorNo : {
        type : Number,
        required : true
    },
    capacity : {
        type : Number,
        required : true
    },
    pricePerSlot : {
        type : Number,
        required : true
    },
    amenities : {
        type : [String],
        required : true

    },
    isDeleted : {
        type : Boolean,
        required : true
    }

})

roomSchema.pre('find', async function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
roomSchema.pre('findOne', async function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  

export const RoomModel = model<TRoom>('rooms', roomSchema)