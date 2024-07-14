class RouteError extends Error {
    public readonly statusCode: number;
    public readonly success: boolean;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.success = false;
      Object.setPrototypeOf(this, new.target.prototype);
      Error.captureStackTrace(this);
    }
  }
export default RouteError;
  