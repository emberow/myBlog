import { Request, Response, NextFunction } from 'express';
import * as AccountService from '../services/AccountService';

export const addAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    res.send(await AccountService.addAccount(userName, password));
  } catch (err) {
    next(err);
  }
};

