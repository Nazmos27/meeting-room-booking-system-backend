import { Router } from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidationSchema } from './booking.validation';

const router = Router();

router.get(
  '/my-bookings',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BookingControllers.getMyBookings,
);

router.post(
  '/',
  validateRequest(bookingValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user),
  BookingControllers.createBooking,
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.patch('/:id', auth(USER_ROLE.admin), BookingControllers.updateBooking);

router.delete('/:id', auth(USER_ROLE.admin), BookingControllers.deleteBooking);

export const BookingRoutes = router;
