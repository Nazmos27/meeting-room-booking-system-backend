import { Router } from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/authentication";
import { USER_ROLE } from "../user/user.constant";

const router = Router()
const mybookingRouter = Router()

mybookingRouter.get('/', auth(USER_ROLE.admin,USER_ROLE.user), BookingControllers.getMyBookings)

router.post('/',auth(USER_ROLE.admin,USER_ROLE.user), BookingControllers.createBooking)

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings)



router.patch('/:id', auth(USER_ROLE.admin), BookingControllers.updateBooking)

export const BookingRoutes = router;
export const MyBookingsRoute = mybookingRouter