import { signJwt } from '../utils/jwt/jwt';
import * as AccountModel from '../model/AccountModel';
import { Account } from '../utils/interfaces/Account';

export const verifyAccount = async (userName: string, password: string) => {
  // if account and password correct, then sign jwt token.
  if (await AccountModel.verifyAccount(userName, password)) {
    return await signJwt({userName, password});
  } else {
    return null;
  }
};

export const addAccount = async (userName: string, password: string) => {
  const account: Account = {
    userName, 
    password,
  };
  return AccountModel.addAccount(account);
};

export const changePassword = async (userName: string, password: string, newPassword: string) => {
  if (password !== newPassword && (await verifyAccount(userName, password))) {
    return AccountModel.changePassword(userName, newPassword);
  } else {
    return null;
  }
};
