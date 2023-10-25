import { NextFunction, Request, Response } from "express";

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
  }

  console.log(err);
  // Unhandled errors
  console.error(JSON.stringify(err, null, 2));
  return res.status(500).send({ message: "Something went wrong" });
};

