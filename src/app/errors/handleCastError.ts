import mongoose from 'mongoose';
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../global-interfaces/error.interface';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorMessages: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error, Invalid Id',
    errorMessages: errorMessages,
  };
};

export default handleCastError;
