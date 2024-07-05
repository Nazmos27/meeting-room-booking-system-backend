import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const createBookingIntoDB = async(payload : TBooking) => {
    const newBooking = await BookingModel.create(payload)
    return newBooking;
}

export const BookingServices = {
    createBookingIntoDB,
}