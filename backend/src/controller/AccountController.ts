import { Request, Response, NextFunction } from 'express';
import * as AccountService from '../services/AccountService';
import { CustomError, errorHandler } from '../middleware/errors';
import * as Joi from 'joi';

const verifyAccountSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required()
}).unknown(true);

const addAccountSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required()
}).unknown(true);

const changePasswordSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required()
}).unknown(true);

export const verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = verifyAccountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { userName, password } = req.body;
    const jwtToken = await AccountService.verifyAccount(userName, password);
    res.status(200).json({ data: jwtToken });
  } catch (err) {
    next(err);
  }
};

export const addAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = addAccountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { userName, password } = req.body;
    await AccountService.addAccount(userName, password);
    res.status(200).json({ message: 'succeed' });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = changePasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { userName, password, newPassword } = req.body;
    await AccountService.changePassword(userName, password, newPassword);
    res.status(200).json({ message: 'succeed' });
  } catch (err) {
    next(err);
  }
};
