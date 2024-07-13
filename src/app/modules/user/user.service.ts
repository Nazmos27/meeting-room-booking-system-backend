import { TUserLoginInfo } from './user.interface';
import { UserLoginModel } from './user.model';

const createLoginInfoIntoDB = async (payload: TUserLoginInfo) => {
  const newLoginInfo = await UserLoginModel.create(payload);
  return newLoginInfo;
};

const updateLoginInfo = async (payload: TUserLoginInfo) => {
  const email = payload?.userEmail;
  const result = await UserLoginModel.findOneAndUpdate(
    { userEmail: email },
    payload,
    { new: true },
  );
  return result;
};

export const UserServices = {
  createLoginInfoIntoDB,
  updateLoginInfo,
};
