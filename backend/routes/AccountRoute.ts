import * as AccountController from '../controller/AccountController';
import { Router } from 'express';
import * as express from 'express';

const AccountRoutes: Router = express.Router();

AccountRoutes.route('/account')
    .post(AccountController.addAccount);

export default AccountRoutes;