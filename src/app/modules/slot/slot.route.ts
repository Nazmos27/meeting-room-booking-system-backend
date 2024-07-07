import { Router } from "express";
import { SlotControllers } from "./slot.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createSlotValidationSchema } from "./slot.validation";

const router = Router()

router.post('/', validateRequest(createSlotValidationSchema), SlotControllers.createSlot)

export const SlotRoutes = router;