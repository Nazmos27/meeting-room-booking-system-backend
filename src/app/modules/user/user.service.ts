import QueryBuilder from '../../../builder/QueryBuilder';
import { TUser, TUserLoginInfo } from './user.interface';
import { UserLoginModel, UserModel } from './user.model';

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

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(UserModel.find(), query)
    .search(['name', 'email', 'phone'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await roomQuery.countTotal();
  const result = await roomQuery.modelQuery;
  return {
    meta,
    result,
  };
};

const updateUserIntoDB = async (userId: string, payload: Partial<TUser>) => {
  const result = UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  return result;
};

const deleteUserIntoDB = async (userId: string) => {
  const result = UserModel.findByIdAndUpdate(
    userId,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

export const UserServices = {
  createLoginInfoIntoDB,
  updateLoginInfo,
  getAllUserFromDB,
  deleteUserIntoDB,
  updateUserIntoDB,
};
