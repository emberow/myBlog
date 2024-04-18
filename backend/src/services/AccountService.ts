import { signJwt } from '../utils/jwt/jwt';
import * as AccountModel from '../model/AccountModel';
import { Account } from '../utils/interfaces/Account';
import { CustomError } from '../middleware/errors';
import * as sha256 from 'sha256';

export const verifyAccount = async (userName: string, password: string) => {
  if (!userName) {
    throw new CustomError(400, 'MISSING_USERNAME');
  }
  if (!password) {
    throw new CustomError(400, 'MISSING_PASSWORD');
  }

  // if account and password correct, then sign jwt token.
  const sha = sha256(password);
  if (await AccountModel.verifyAccount(userName, sha)) {
    return await signJwt({ userName });
  } else {
    throw new CustomError(401, 'USERNAME_OR_PASSWORD_INCORRECT');
  }
};

export const addAccount = async (userName: string, password: string) => {
  if (!userName) {
    throw new CustomError(400, 'MISSING_USERNAME');
  }
  if (!password) {
    throw new CustomError(400, 'MISSING_PASSWORD');
  }
  if (await AccountModel.isAccountExist(userName)) {
    throw new CustomError(400, 'ACCOUNT_EXISTS');
  }

  const sha = sha256(password);
  const account: Account = {
    userName, 
    password: sha,
  };
  return AccountModel.addAccount(account);
};

export const changePassword = async (userName: string, password: string, newPassword: string) => {
  if (!userName) {
    throw new CustomError(400, 'MISSING_USERNAME');
  }
  if (!password) {
    throw new CustomError(400, 'MISSING_PASSWORD');
  }
  if (!newPassword) {
    throw new CustomError(400, 'MISSING_NEWPASSWORD');
  }

  const sha = sha256(newPassword);
  if (password !== newPassword && (await verifyAccount(userName, password))) {
    return AccountModel.changePassword(userName, sha);
  }
  throw new CustomError(400, 'CHANGE_PASSWORD_ERROR');
};
