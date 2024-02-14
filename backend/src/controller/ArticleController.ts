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
    const id: number = req.query.id as any;
    await ArticleService.deleteArticleFolder(id, userName);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const id: number = req.query.id as any;
    const folderInfo = await ArticleService.getArticle(userName, id);
    res.status(200).json({ data: folderInfo });
  } catch (err) {
    next(err);
  }
};

export const addArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const {folderId, articleName} = req.body;
    const article = await ArticleService.addArticle(userName, folderId, articleName);
    res.status(200).json({ data: article });
  } catch (err) {
    next(err);
  }
};

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const {name, id, content, isPublish} = req.body;
    const article = await ArticleService.updateArticle(userName, id, name, content, isPublish);
    res.status(200).json({ data: article });
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const {userName} = await verifyAccount(token);
    const id: number  = req.query.id as any;
    await ArticleService.deleteArticle(userName, id);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export const getArticleList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page: number  = req.query.page as any;
    const limit: number  = req.query.limit as any;
    const result = await ArticleService.getArticleList(limit, page);
    const maximumPages = await ArticleService.getArticleCount();
    res.status(200).json({ data: { ...result, maximumPages } });
  } catch (err) {
    next(err);
  }
};