import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken'
import config from "../../config";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { UserServices } from "../user/user.service";
import {  SharedData } from "../../utils/loginData";

const signUpUser = async (payload : TUser) => {
    const newUser = await UserModel.create(payload);
    const loggedInfo = {
        userEmail : payload.email,
        loginAt : new Date(),
        token : 'adfa'
    }
     await UserServices.createLoginInfoIntoDB(loggedInfo)
    return newUser;
}



const loginUser  = async (payload:TLoginUser) => {
    const data = {
        id: '',
        email: payload.email,
    }
    const user = await UserModel.isUserExistChecker(data);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User not exist")
    }
    if(!(await UserModel.isPasswordMatchedChecker(payload?.password, user?.password))){
        throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect")
    }

    //generate access token
    const jwtPayload = {
        userEmail : user.email,
        role : user.role,

    }
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn : '30d'})

    const userLoginData = {
        userEmail : user?.email,
        loginAt : new Date(),
        token : accessToken
    }
    await UserServices.updateLoginInfo(userLoginData)

    const sharedData = SharedData.getInstance();
  sharedData.setUserLoginData(userLoginData);

    

    return {
        accessToken,
        user
    }
}

export const AuthServices = {
    loginUser,
    signUpUser,
}