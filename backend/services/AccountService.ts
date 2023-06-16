import * as AccountModel from '../model/AccountModel';
import { Account } from '../utils/interfaces/Account';

export const addAccount = async (userName: string, password: string) => {
  const account: Account = {
    userName, 
    password,
  };
  return AccountModel.addAccount(account);
};
