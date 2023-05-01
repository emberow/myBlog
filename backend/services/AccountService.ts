import { CommonError } from '../middleware/errorHandler';
import * as AccountModel from '../model/AccountModel';

export const addAccount = async (userName: string, password: string) => {
  if (!userName) {
    throw new CommonError("INVALID_USERNAME");
  }
  if (!password) {
    throw new CommonError("INVALID_PASSWORD");
  }
  
  return AccountModel.addAccount();
};
