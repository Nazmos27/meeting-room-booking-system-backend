import { Router } from "express";
import { RoomControllers } from "./room.controller";

const router = Router()

router.post('/create-room',RoomControllers.createRoom)

export const RoomRoutes = router;