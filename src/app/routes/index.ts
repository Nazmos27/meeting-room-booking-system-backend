import { Router } from "express";
import { RoomRoutes } from "../modules/room/room.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoutes, MyBookingsRoute } from "../modules/booking/booking.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router()

const moduleRoutes = [
    {
        path : '/auth',
        route : AuthRoutes
    },
    {
        path : '/rooms',
        route : RoomRoutes
    },
    {
        path : '/slots',
        route : SlotRoutes
    },
    {
        path : '/bookings',
        route : BookingRoutes
    },
    {
        path : '/my-bookings',
        route : MyBookingsRoute
    }
    
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;