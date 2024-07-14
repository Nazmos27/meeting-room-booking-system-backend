import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import { UserLoginModel, UserModel } from '../modules/user/user.model';
import RouteError from '../errors/RouteError';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    //check if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token not found');
    }

    //check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userEmail } = decoded;
    //check if the user exist using static method
    const userDataForChecking = {
      email: userEmail,
      id: '',
    };
    const user = await UserModel.isUserExistChecker(userDataForChecking);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    const userLoginData = await UserLoginModel.findOne({
      userEmail: user.email,
    });

    if (!userLoginData || userLoginData.token !== token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token is invalid');
    }

    //check if someone trying to access data with other person's token
    // if((await UserModel.isAuthorizedUserChecker(userEmail)) === false){
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    // }

    //check if the user is in the required rolls
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new RouteError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
