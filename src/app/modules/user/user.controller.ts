import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB(req.query);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'All User retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.updateUserIntoDB(userId, req.body);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.deleteUserIntoDB(userId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User deleted successfully',
    data: result,
  });
});

//   const loginUser = catchAsync(async (req, res) => {
//     const result = await UserServices.loginUserWithEmail(req.body);

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: 'User logged in successfully',
//       token: result.token,
//       data: result.data,
//     });
//   });

export const UserControllers = {
  getAllUser,
  updateUser,
  deleteUser,
};
