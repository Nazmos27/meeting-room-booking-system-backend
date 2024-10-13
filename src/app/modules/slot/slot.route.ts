import { Router } from 'express';
import { SlotControllers } from './slot.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createSlotValidationSchema,
  updateSlotValidationSchema,
} from './slot.validation';
import auth from '../../middlewares/authentication';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(createSlotValidationSchema),
  SlotControllers.createSlot,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(updateSlotValidationSchema),
  SlotControllers.updateSingleSlot,
);
router.delete('/:id', auth('admin'), SlotControllers.deleteSingleSlot);

router.get('/availability', SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
