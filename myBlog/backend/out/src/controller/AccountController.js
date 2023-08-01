"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.addAccount = exports.verifyAccount = void 0;
const AccountService = require("../services/AccountService");
const httpHandler_1 = require("../middleware/httpHandler");
const verifyAccount = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        if (!userName) {
            (0, httpHandler_1.httpHandler)(res, 400, null, 'INVALID_USERNAME');
        }
        if (!password) {
            (0, httpHandler_1.httpHandler)(res, 400, null, 'INVALID_PASSWORD');
        }
        const jwtToken = await AccountService.verifyAccount(userName, password);
        if (!jwtToken) {
            (0, httpHandler_1.httpHandler)(res, 401, null, 'LOGIN_ERROR');
        }
        else {
            (0, httpHandler_1.httpHandler)(res, 200, jwtToken, null);
        }
    }
    catch (err) {
        console.log(err);
        (0, httpHandler_1.httpHandler)(res, 500, null, 'Internal Server Error');
    }
};
exports.verifyAccount = verifyAccount;
const addAccount = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        if (!userName) {
            (0, httpHandler_1.httpHandler)(res, 400, null, 'INVALID_USERNAME');
        }
        if (!password) {
            (0, httpHandler_1.httpHandler)(res, 400, null, 'INVALID_PASSWORD');
        }
        const data = await AccountService.addAccount(userName, password);
        (0, httpHandler_1.httpHandler)(res, 200, data, null);
    }
    catch (err) {
        console.log(err);
        (0, httpHandler_1.httpHandler)(res, 500, null, 'Internal Server Error');
    }
};
exports.addAccount = addAccount;
const changePassword = async (req, res, next) => {
    try {
        const { userName, password, newPassword } = req.body;
        if (!userName) {
            (0, httpHandler_1.httpHandler)(res, 400, null, 'INVALID_USERNAME');
        }
        if (!password) {
            (0, httpHandler_1.httpHandler)(res, 400, null, 'INVALID_PASSWORD');
        }
        if (!newPassword) {
            (0, httpHandler_1.httpHandler)(res, 400, null, 'INVALID_NEWPASSWORD');
        }
        const data = await AccountService.changePassword(userName, password, newPassword);
        if (data) {
            (0, httpHandler_1.httpHandler)(res, 200, data, null);
        }
        else {
            (0, httpHandler_1.httpHandler)(res, 401, data, 'CHANGE_PASSWORD_ERROR');
        }
    }
    catch (err) {
        console.log(err);
        (0, httpHandler_1.httpHandler)(res, 500, null, 'Internal Server Error');
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=AccountController.js.map