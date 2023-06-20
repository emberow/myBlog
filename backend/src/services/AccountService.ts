import * as AccountModel from '../model/AccountModel';
import { Account } from '../utils/interfaces/Account';

export const verifyAccount = async (userName: string, password: string) => {
  return AccountModel.verifyAccount(userName, password);
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
