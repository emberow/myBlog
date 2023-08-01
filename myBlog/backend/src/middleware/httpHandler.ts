import { Request, Response, NextFunction } from 'express';

export const httpHandler = (res, httpStatusCode, data, message) => {
  let status;
  if ( httpStatusCode === 200) {
    status = 'success';
  } else {
    status = 'error';
  }
  res.status(httpStatusCode).json({
    "status": status,
    "data": data,
    "message": message,
  });
};
