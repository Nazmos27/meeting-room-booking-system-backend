import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import {jwt} from 'j'

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

    const accessToken = 
}

export const AuthServices = {
    loginUser
}