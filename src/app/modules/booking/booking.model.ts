import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    room : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    slots : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    user : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    date : {
        type : String,
        required : true
    },
    totalAmount : {
        type : Number,
        required : true
    },
    isConfirmed : {
        type : Boolean,
        required : true
    },
    isDeleted : {
        type : Boolean,
        required : true
    }
})

export const BookingModel = model<TBooking>('bookings', bookingSchema)