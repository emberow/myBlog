import { Request, Response, NextFunction } from 'express';
import * as AccountService from '../services/AccountService';
import { httpHandler } from '../middleware/httpHandler';

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;
    if (!userName) {
      httpHandler(res, 400, null, 'INVALID_USERNAME');
    }
    if (!password) {
      httpHandler(res, 400, null, 'INVALID_PASSWORD');
    }

    const isExist = await AccountService.verifyAccount(userName, password);
    
    if (!isExist) {
      httpHandler(res, 401, null, 'LOGIN_ERROR');
    } else {
      httpHandler(res, 200, isExist, null);
    }
  } catch (err) {
    httpHandler(res, 500, null, 'Internal Server Error');
  }
};


export const addAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;
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

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password, newPassword } = req.body;
    if (!userName) {
      httpHandler(res, 400, null, 'INVALID_USERNAME');
    }
    if (!password) {
      httpHandler(res, 400, null, 'INVALID_PASSWORD');
    }
    if (!newPassword) {
      httpHandler(res, 400, null, 'INVALID_NEWPASSWORD');
    }

    const data = await AccountService.changePassword(userName, password, newPassword);
    if (data) {
      httpHandler(res, 200, data, null);
    } else {
      httpHandler(res, 401, data, 'CHANGE_PASSWORD_ERROR');
    }
  } catch (err) {
    httpHandler(res, 500, null, 'Internal Server Error');
  }
};
