import { Request, Response, NextFunction } from 'express';

export const httpHandler = (res, httpStatusCode, data, message) => {
  res.status(httpStatusCode).json({
    "status": "error",
    "data": data,
    "message": message,
  });
};
