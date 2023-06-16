import PostgresDataSource from "../config/database";
import { Account } from "../entity/Account";
import { Account as Iaccount } from '../utils/interfaces/Account';

export const addAccount = async (account: Iaccount) => {
    return await PostgresDataSource
        .getRepository(Account)
        .save(account);
}