import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user', 'admin']
    }
})

export const UserModel = model<TUser>('users', userSchema)