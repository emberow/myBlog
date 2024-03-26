import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

export interface CustomErrorContent {
  message: string,
  context?: { [key: string]: any }
};

export class CustomError extends Error {
  statusCode: number;
  errors: CustomErrorContent;

  constructor(statusCode: number, message: string) {
    super(message);
    this.errors = {message};
    this.statusCode = statusCode
    
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Handled errors
  if(err instanceof CustomError) {
    const { statusCode, errors } = err;
    return res.status(statusCode).send({ message: errors.message });
  } else if (err instanceof TokenExpiredError) {
    return res.status(403).send({ message: "TOKEN_EXPIRED" }); 
  } else if (err instanceof JsonWebTokenError) {
    return res.status(401).send({ message: "TOKEN_INVALID" });  
  }

  console.log(err);
  // Unhandled errors
  return res.status(500).send({ message: "Something went wrong" });
};

