/* eslint-disable no-unused-vars */
import { Model } from "mongoose"
import { USER_ROLE } from "./user.constant";

export type TUser = {
    name : string,
    email : string,
    password : string,
    phone : number,
    address : string,
    role : 'user' | 'admin'
}

export interface UserModelInterface extends Model<TUser> {
    isUserExistChecker( email : string) : Promise<TUser>;
    isPasswordMatchedChecker( plaintextPassword : string, hashedPassword : string) : Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;