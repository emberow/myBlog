import { Router } from 'express';
import * as express from 'express';
import AccountRoutes from './src/routes/AccountRoute';
import ArticleRoute from './src/routes/ArticleRoute';

const router: Router = express.Router();
router.use('/', AccountRoutes);
router.use('/', ArticleRoute);

export default router;