import { Router } from "express";
import { RoomControllers } from "./room.controller";
import auth from "../../middlewares/authentication";
import { USER_ROLE } from "../user/user.constant";

const router = Router()

router.post('/', auth(USER_ROLE.admin),RoomControllers.createRoom)

router.get('/',RoomControllers.getAllRooms)

router.get('/:id', RoomControllers.getSingleRoom)

router.put('/:id',auth(USER_ROLE.admin), RoomControllers.updateRoom)

router.delete('/:id',auth(USER_ROLE.admin), RoomControllers.deleteRoom)

export const RoomRoutes = router;