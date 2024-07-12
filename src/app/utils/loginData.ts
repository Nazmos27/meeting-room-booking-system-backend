import { TUserLoginInfo } from "../modules/user/user.interface";

export class SharedData {
    private static instance: SharedData;
    private userLoginData: TUserLoginInfo = {
        userEmail : '',
        loginAt : new Date,
        token : '',
    };
  
    private constructor() {}
  
    public static getInstance(): SharedData {
      if (!SharedData.instance) {
        SharedData.instance = new SharedData();
      }
      return SharedData.instance;
    }
  
    public setUserLoginData(data: TUserLoginInfo) {
      this.userLoginData = data;
    }
  
    public getUserLoginData() {
      return this.userLoginData;
    }
  }
  