import { Request, Response, NextFunction } from 'express';
import * as AccountService from '../services/AccountService';
import { CustomError, errorHandler } from '../middleware/errors';

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;
    const jwtToken = await AccountService.verifyAccount(userName, password);
    res.status(200).json({ data: jwtToken });
  } catch (err) {
    next(err);
  }
};


export const addAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;
    await AccountService.addAccount(userName, password);
    res.status(200).json({ message: 'succeed' });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password, newPassword } = req.body;
    await AccountService.changePassword(userName, password, newPassword);
    res.status(200).json({ message: 'succeed' });
  } catch (err) {
    next(err);
  }
};
