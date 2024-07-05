import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./booking.service";

const createBooking = catchAsync(async(req,res) => {
    const result = await BookingServices.createBookingIntoDB(req.body)
    res.status(200).json({
        success : true,
        message : "Booking done successfully",
        data : result
    })
})

export const BookingControllers = {
    createBooking,
}