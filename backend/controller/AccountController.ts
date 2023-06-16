import { Request, Response, NextFunction } from 'express';
import * as AccountService from '../services/AccountService';
import { httpHandler } from '../middleware/httpHandler';

export const addAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    if (!userName) {
      httpHandler(res, 400, null, 'INVALID_USERNAME');
    }
    if (!password) {
      httpHandler(res, 400, null, 'INVALID_PASSWORD');
    }
    const data = await AccountService.addAccount(userName, password);
    httpHandler(res, 200, data, null);
  } catch (err) {
    httpHandler(res, 500, null, 'Internal Server Error');
  }
};
