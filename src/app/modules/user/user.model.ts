import { Schema, model } from 'mongoose';
import { TUser, TUserLoginInfo, UserModelInterface } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { SharedData } from '../../utils/loginData';

const userSchema = new Schema<TUser, UserModelInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },
});

const userLoginSchema = new Schema<TUserLoginInfo>({
  userEmail: {
    type: String,
    required: true,
  },
  loginAt: {
    type: Date,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const checker = await UserModel.find({ email: this.email });
  if (checker.length > 0) {
    throw new Error('User already exists with this email');
  }
  next();
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistChecker = async function (
  data: Record<string, unknown>,
) {
  if (data.id !== '') {
    return await UserModel.findOne({ _id: data.id }).select('+password');
  }
  if (data.email) {
    return await UserModel.findOne({ email: data.email }).select('+password');
  }
};

userSchema.statics.isAuthorizedUserChecker = async function (email: string) {
  const sharedData = SharedData.getInstance();
  const userLoginData = sharedData.getUserLoginData();

  if (userLoginData.userEmail !== email) {
    return false;
  }
};

userSchema.statics.isPasswordMatchedChecker = async function (
  plaintextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plaintextPassword, hashedPassword);
};

export const UserModel = model<TUser, UserModelInterface>('users', userSchema);

export const UserLoginModel = model<TUserLoginInfo>(
  'userLoginInfo',
  userLoginSchema,
);
