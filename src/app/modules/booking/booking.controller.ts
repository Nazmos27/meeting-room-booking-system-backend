import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async(req,res) => {
    const result = await BookingServices.createBookingIntoDB(req.body)
    res.status(200).json({
        success : true,
        message : "Booking created successfully",
        data : result
    })
})

const getAllBookings = catchAsync(async(req,res) => {
    const result = await BookingServices.getAllBookingsFromDB()
    res.status(200).json({
        success : true,
        message : "All bookings retrieved successfully",
        data : result
    })
})

export const BookingControllers = {
    createBooking,
    getAllBookings,
}