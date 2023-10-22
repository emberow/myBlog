import { Request, Response, NextFunction } from 'express';
import * as ArticleService from '../services/ArticleService';
import { verifyAccount }  from '../utils/jwt/jwt';

export const getArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const folderInfo = await ArticleService.getArticleFolder(userName);
    res.status(200).json({ data: folderInfo });
  } catch (err) {
    next(err);
  }
};

export const addArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const {folderName} = req.body;
    await ArticleService.addArticleFolder(userName, folderName);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export const updateArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const {folderName, id} = req.body;
    await ArticleService.updateArticleFolder(userName, id, folderName);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export const deleteArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const id = req.query.id as string;
    await ArticleService.deleteArticleFolder(id, userName);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};