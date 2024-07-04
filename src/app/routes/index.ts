import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { RoomRoutes } from "../modules/room/room.route";

const router = Router()

const moduleRoutes = [
    {
        path : '/users',
        route : UserRoutes
    },
    {
        path : '/rooms',
        route : RoomRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;