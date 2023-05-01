import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode: number = null;
  if (err instanceof UserError) {
    statusCode = 401;
  } else if (err instanceof LoginError) {
    statusCode = 403;
  } else if (err instanceof CommonError) {
    statusCode = 400;
  }

  if (statusCode) {
    res.status(statusCode).json({
      message: err.message,
    });
  } else {
    res.status(500).json({message: 'SYSTEM_ERROR'});
  }
};

export default errorHandler;

export class ErrorObject extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class UserError extends ErrorObject {
}

export class LoginError extends ErrorObject {
}

export class CommonError extends ErrorObject {
}
