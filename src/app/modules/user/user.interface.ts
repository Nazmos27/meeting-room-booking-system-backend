/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose"
import { USER_ROLE } from "./user.constant";

export type TUser = {
    name : string,
    email : string,
    password : string,
    phone : number,
    address : string,
    role : 'user' | 'admin'
}

export type TUserLoginInfo = {
    userEmail : string,
    loginAt : Date,
    token : string
}

export interface UserModelInterface extends Model<TUser> {
    isUserExistChecker( data : Record<string, unknown>) : Promise<TUser>;
    isPasswordMatchedChecker( plaintextPassword : string, hashedPassword : string) : Promise<boolean>;
    isNewTokenGrantedAfterPassChangeChecker(
        passwordChangedTimestamp: Date,
        tokenIssuedTimestamp: number,
      ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;