import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import jwt from 'jsonwebtoken'
import config from "../../config";
import { TUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";


const signUpUser = async (payload : TUser) => {
    const newUser = await UserModel.create(payload);
    return newUser;
}



const loginUser  = async (payload:TLoginUser) => {
    const user = await UserModel.isUserExistChecker(payload.email);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User not exist")
    }
    if(!(await UserModel.isPasswordMatchedChecker(payload?.password, user?.password))){
        throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect")
    }

    //generate access token
    const jwtPayload = {
        userEmail : user.email,
        role : user.role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn : '30d'})

    return {
        accessToken,
        user
    }
}

export const AuthServices = {
    loginUser,
    signUpUser,
}