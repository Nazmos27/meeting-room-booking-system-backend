/* eslint-disable @typescript-eslint/no-explicit-any */
export class SharedData {
  private static instance: SharedData;
  private userLoginData: any = null;

  private constructor() {}

  public static getInstance(): SharedData {
    if (!SharedData.instance) {
      SharedData.instance = new SharedData();
    }
    return SharedData.instance;
  }

  public setUserLoginData(data: any) {
    this.userLoginData = data;
  }

  public getUserLoginData() {
    return this.userLoginData;
  }
}
