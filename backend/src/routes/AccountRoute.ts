import * as AccountController from '../controller/AccountController';
import { Router } from 'express';
import * as express from 'express';

const AccountRoutes: Router = express.Router();

AccountRoutes.route('/login')
    .post(AccountController.verifyAccount)

AccountRoutes.route('/account')
    .post(AccountController.addAccount)
    .put(AccountController.changePassword)
    // .delete(AccountController.delAccount);

export default AccountRoutes;