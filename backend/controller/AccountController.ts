import { Request, Response, NextFunction } from 'express';
import {getAllAccount, addAccount, deleteAccount} from '../services/AccountService';

export const getAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("test");
  } catch (err) {
    next(err);
  }
};

