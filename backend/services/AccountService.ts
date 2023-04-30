import { getRepository, getConnection } from 'typeorm';
import { account } from '../entity/Account';



export const getAllAccount = async () => {
  const postRepository = getRepository(account);
  const accounts: account[] = await postRepository.find();
  console.log(accounts)
  return accounts;
};

export const addAccount = async (name:string, password:string) => {
  const accountRepository = getRepository(account);
  await accountRepository.save({name, password});
  return true;
};

export const deleteAccount = async (name:string, password:string) => {
  const accountRepository = getRepository(account);
  await accountRepository.delete({name, password});
  return true;
};