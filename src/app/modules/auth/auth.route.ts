import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidationSchema } from '../user/user.validation';

const router = Router();

router.post(
  '/signup',
  validateRequest(userValidationSchema),
  AuthControllers.createUser,
);
router.post('/login', AuthControllers.loginUser);

export const AuthRoutes = router;
