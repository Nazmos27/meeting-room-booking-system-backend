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
        statusCode : 200,
        message : "All bookings retrieved successfully",
        data : result
    })
})

const getMyBookings = catchAsync(async(req,res) => {
    const result = await BookingServices.getMyBookingsFromDB(req.headers.authorization?.split(' ')[1] as string)
    res.status(200).json({
        success : true,
        statusCode : 200,
        message : "User bookings retrieved successfully",
        data : result
    })
})

const updateBooking = catchAsync(async(req, res) => {
    const result = await BookingServices.updateBookingIntoDB(req.params.id, req.body)
    res.status(200).json({
        success : true,
        statusCode : 200,
        message : "Booking updated successfully",
        data : result
    })
})

export const BookingControllers = {
    createBooking,
    getAllBookings,
    updateBooking,
    getMyBookings,
}