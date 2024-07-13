import { TUser, TUserLoginInfo } from './user.interface';
import { UserLoginModel, UserModel } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const newUser = await UserModel.create(payload);
  return newUser;
};


const createLoginInfoIntoDB = async (payload : TUserLoginInfo) => {
  const newLoginInfo = await UserLoginModel.create(payload);
  return newLoginInfo;
}

const updateLoginInfo = async(payload : TUserLoginInfo) => {
  const email = payload?.userEmail
  const result = await UserLoginModel.findOneAndUpdate({userEmail : email}, payload, {new: true});
  return result;

}

export const UserServices = {
    createUserIntoDB,
    createLoginInfoIntoDB,
    updateLoginInfo
}
