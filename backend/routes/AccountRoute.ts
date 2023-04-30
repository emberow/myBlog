import { IRouteItem } from '../utils/type/route';
import * as AccountController from '../controller/AccountController';

export const AccountRoutes: IRouteItem[] = [
    {
        path: '',
        method: 'get',
        middlewares: [
            AccountController.getAccount,
        ],
    }
]