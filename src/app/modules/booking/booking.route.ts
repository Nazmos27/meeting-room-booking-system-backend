import { Router } from "express";
import { BookingControllers } from "./booking.controller";
import auth from "../../middlewares/authentication";
import { USER_ROLE } from "../user/user.constant";

const router = Router()

router.post('/',auth(USER_ROLE.admin,USER_ROLE.user), BookingControllers.createBooking)

export const BookingRoutes = router;