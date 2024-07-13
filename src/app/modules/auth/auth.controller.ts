import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpUser(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: result.accessToken,
    data: result.user,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
