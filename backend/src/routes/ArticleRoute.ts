import * as express from 'express';
import { Router } from 'express';
import * as MyArticleController from '../controller/ArticleController';

const MyArticleRoute: Router = express.Router();

MyArticleRoute.route('/folder')
    .get(MyArticleController.getArticleFolder)
    .post(MyArticleController.addArticleFolder)
    .put(MyArticleController.updateArticleFolder)
    .delete(MyArticleController.deleteArticleFolder)

export default MyArticleRoute;