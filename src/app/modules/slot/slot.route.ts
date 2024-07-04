import { Router } from "express";
import { SlotControllers } from "./slot.controller";

const router = Router()

router.post('/create-slot',SlotControllers.createSlot)

export const SlotRoutes = router;