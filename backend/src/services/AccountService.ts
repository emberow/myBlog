import { signJwt } from '../utils/jwt/jwt';
import * as AccountModel from '../model/AccountModel';
import { Account } from '../utils/interfaces/Account';
import { CustomError } from '../middleware/errors';

export const verifyAccount = async (userName: string, password: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!password) {
    throw new CustomError(400, 'INVALID_PASSWORD');
  }

  // if account and password correct, then sign jwt token.
  if (await AccountModel.verifyAccount(userName, password)) {
    return await signJwt({ userName });
  } else {
    throw new CustomError(401, 'INVALID_USERNAME_OR_PASSWORD');
  }
};

export const addAccount = async (userName: string, password: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!password) {
    throw new CustomError(400, 'INVALID_PASSWORD');
  }
  if (await AccountModel.isAccountExist(userName)) {
    throw new CustomError(400, 'ACCOUNT_EXISTS');
  }

  const account: Account = {
    userName, 
    password,
  };
  return AccountModel.addAccount(account);
};

export const changePassword = async (userName: string, password: string, newPassword: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!password) {
    throw new CustomError(400, 'INVALID_PASSWORD');
  }
  if (!newPassword) {
    throw new CustomError(400, 'INVALID_NEWPASSWORD');
  }

  if (password !== newPassword && (await verifyAccount(userName, password))) {
    return AccountModel.changePassword(userName, newPassword);
  }
  throw new CustomError(400, 'CHANGE_PASSWORD_ERROR');
};
