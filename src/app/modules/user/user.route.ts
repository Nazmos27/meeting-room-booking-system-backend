import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/authentication';
import { updateUserValidationSchema } from './user.validation';

const router = express.Router();


router.patch(
  '/update-user/:userId',
  auth('admin'),
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUser,
);
router.get('/users', auth('admin'), UserControllers.getAllUser);
router.delete('/users/:userId', auth('admin'), UserControllers.deleteUser);

export const UserRoutes = router;