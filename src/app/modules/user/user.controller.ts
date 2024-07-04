import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const createUser = catchAsync(async(req,res) => {
    const result = await UserServices.createUserIntoDB(req.body)
    res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: result,
      });
})

export const UserControllers = {
    createUser
}