import PostgresDataSource from "../config/database";
import { Account } from "../entity/Account";
import { Account as Iaccount } from '../utils/interfaces/Account';

export const verifyAccount = async (userName: string, password: string) => {
    return (await PostgresDataSource
        .getRepository(Account)
        .createQueryBuilder("account")
        .where("account.userName = :userName", { userName })
        .andWhere("account.password = :password", { password })
        .getOne()) ? true : false;
}

export const addAccount = async (account: Iaccount) => {
    return await PostgresDataSource
        .getRepository(Account)
        .save(account);
}

export const changePassword = async (userName: string, password: string) => {
    return PostgresDataSource
    .createQueryBuilder()
    .update(Account)
    .set({ password })
    .where("userName = :userName", { userName })
    .execute();
}
