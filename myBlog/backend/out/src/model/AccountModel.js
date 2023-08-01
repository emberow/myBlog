"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.addAccount = exports.verifyAccount = void 0;
const database_1 = require("../config/database");
const Account_1 = require("../entity/Account");
const verifyAccount = async (userName, password) => {
    return (await database_1.default
        .getRepository(Account_1.Account)
        .createQueryBuilder("account")
        .where("account.userName = :userName", { userName })
        .andWhere("account.password = :password", { password })
        .getOne()) ? true : false;
};
exports.verifyAccount = verifyAccount;
const addAccount = async (account) => {
    return await database_1.default
        .getRepository(Account_1.Account)
        .save(account);
};
exports.addAccount = addAccount;
const changePassword = async (userName, password) => {
    return database_1.default
        .createQueryBuilder()
        .update(Account_1.Account)
        .set({ password })
        .where("userName = :userName", { userName })
        .execute();
};
exports.changePassword = changePassword;
//# sourceMappingURL=AccountModel.js.map