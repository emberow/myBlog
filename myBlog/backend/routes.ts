import { Router } from 'express';
import * as express from 'express';
import AccountRoutes from './src/routes/AccountRoute';

const router: Router = express.Router();
router.use('/', AccountRoutes);

export default router;