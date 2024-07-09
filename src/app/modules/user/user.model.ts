import { Schema, model } from "mongoose";
import { TUser, TUserLoginInfo, UserModelInterface } from "./user.interface";
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


const userLoginSchema = new Schema<TUserLoginInfo>({
    userEmail: {
        type : String,
        required : true,
    },
    loginAt : {
        type : Date,
        required : true
    },
    token : {
        type : String,
        required : true
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
    if(data.id !== ''){
        return await UserModel.findOne({_id: data.id}).select('+password')
    }
    if(data.email){
        return await UserModel.findOne({email: data.email}).select('+password')
    }
    
}

userSchema.statics.isPasswordMatchedChecker = async function(plaintextPassword: string, hashedPassword : string) {
    return await bcrypt.compare(plaintextPassword, hashedPassword)
}


userSchema.statics.isNewTokenGrantedAfterPassChangeChecker = async function (
    passwordChangedTimestamp: Date,
    tokenIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
      console.log(Math.floor(passwordChangedTime), tokenIssuedTimestamp);
    return passwordChangedTime === tokenIssuedTimestamp;
  };

export const UserModel = model<TUser, UserModelInterface>('users', userSchema)

export const UserLoginModel = model<TUserLoginInfo>('userLoginInfo',userLoginSchema)