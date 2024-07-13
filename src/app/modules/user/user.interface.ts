/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
};

export type TUserLoginInfo = {
  userEmail: string;
  loginAt: Date;
  token: string;
};

export interface UserModelInterface extends Model<TUser> {
  isUserExistChecker(data: Record<string, unknown>): Promise<TUser>;

  isPasswordMatchedChecker(
    plaintextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  
  isAuthorizedUserChecker(email: string): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
