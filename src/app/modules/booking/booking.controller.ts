import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req.query);
  if (result.result.length > 0) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'All bookings retrieved successfully',
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
});

const getMyBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getMyBookingsFromDB(
    req.headers.authorization?.split(' ')[1] as string,
  );

  if (result.length > 0) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User bookings retrieved successfully',
      data: result,
    });
  } else {
    res.status(200).json({
      success: false,
      statusCode: 404,
      message: 'No Data Found',
      data: [],
    });
  }
});

const updateBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.updateBookingIntoDB(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Booking updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.deleteBookingFromDB(req.params.id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
  getMyBookings,
  deleteBooking,
};
