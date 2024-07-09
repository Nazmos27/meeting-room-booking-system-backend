import { model, Schema, Types } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
    date : {
        type : String,
        required : true
    },
    slots : {
        type : [Schema.Types.ObjectId],
        required : true,
        ref : 'slots'
    },
    room : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'rooms'
    },
    user : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'users'
    },
    totalAmount : {
        type : Number,
        required : true
    },
    isConfirmed : {
        type : String,
        enum : ['confirmed', 'unconfirmed'],
        required : true
    },
    isDeleted : {
        type : Boolean,
        required : true
    }
})

bookingSchema.post('save',async function(doc,next){
    await doc.populate([
        { path: 'user', select: '-password' }, // Exclude password field
        { path: 'room' },
        { path: 'slots' }
      ])
    next()
})

export const BookingModel = model<TBooking>('bookings', bookingSchema)