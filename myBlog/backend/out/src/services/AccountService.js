"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.addAccount = exports.verifyAccount = void 0;
const jwt_1 = require("../utils/jwt/jwt");
const AccountModel = require("../model/AccountModel");
const verifyAccount = async (userName, password) => {
    // if account and password correct, then sign jwt token.
    if (await AccountModel.verifyAccount(userName, password)) {
        return await (0, jwt_1.signJwt)({ userName, password });
    }
    else {
        return null;
    }
};
exports.verifyAccount = verifyAccount;
const addAccount = async (userName, password) => {
    const account = {
        userName,
        password,
    };
    return AccountModel.addAccount(account);
};
exports.addAccount = addAccount;
const changePassword = async (userName, password, newPassword) => {
    if (password !== newPassword && (await (0, exports.verifyAccount)(userName, password))) {
        return AccountModel.changePassword(userName, newPassword);
    }
    else {
        return null;
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=AccountService.js.map