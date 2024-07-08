import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    room : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'rooms'
    },
    slots : {
        type : [Schema.Types.ObjectId],
        required : true,
        ref : 'slots'
    },
    user : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'users'
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