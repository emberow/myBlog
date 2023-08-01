"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountController = require("../controller/AccountController");
const express = require("express");
const AccountRoutes = express.Router();
AccountRoutes.route('/login')
    .post(AccountController.verifyAccount);
AccountRoutes.route('/account')
    .post(AccountController.addAccount)
    .put(AccountController.changePassword);
// .delete(AccountController.delAccount);
exports.default = AccountRoutes;
//# sourceMappingURL=AccountRoute.js.map