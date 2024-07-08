import { Schema, model } from "mongoose";
import { TUser, UserModelInterface } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<TUser, UserModelInterface>({
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


userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds))
    next()
})

userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });

userSchema.statics.isUserExistChecker = async function( data : Record<string, unknown>) {
    return await UserModel.findOne({email: data.email}).select('+password')
}

userSchema.statics.isPasswordMatchedChecker = async function(plaintextPassword: string, hashedPassword : string) {
    return await bcrypt.compare(plaintextPassword, hashedPassword)
}

export const UserModel = model<TUser, UserModelInterface>('users', userSchema)