/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TErrorSources,
  TGenericErrorResponse,
} from '../global-interfaces/error.interface';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMsg = match && match[1];

  const errorMessages: TErrorSources = [
    {
      path: '',
      message: `${extractedMsg} already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate key:value error',
    errorMessages,
  };
};

export default handleDuplicateError;
