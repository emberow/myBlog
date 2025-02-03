import { Request, Response, NextFunction } from 'express';
import * as ArticleService from '../services/ArticleService';
import { verifyAccount } from '../utils/jwt/jwt';
import * as Joi from 'joi';

const addArticleFolderSchema = Joi.object({
  folderName: Joi.string().required()
}).unknown(true);

const updateArticleFolderSchema = Joi.object({
  folderName: Joi.string().required(),
  id: Joi.number().required()
}).unknown(true);

const deleteArticleFolderSchema = Joi.object({
  id: Joi.number().required()
}).unknown(true);

const getArticleSchema = Joi.object({
  id: Joi.number().required()
}).unknown(true);

export const getArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    const { userName } = await verifyAccount(token);
    const folderInfo = await ArticleService.getArticleFolder(userName);
    res.status(200).json({ data: folderInfo });
  } catch (err) {
    next(err);
  }
};

export const addArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = addArticleFolderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = req.headers.authorization;
    const { userName } = await verifyAccount(token);
    const { folderName } = req.body;
    await ArticleService.addArticleFolder(userName, folderName);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export const updateArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = updateArticleFolderSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = req.headers.authorization;
    const { userName } = await verifyAccount(token);
    const { folderName, id } = req.body;
    await ArticleService.updateArticleFolder(userName, id, folderName);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export const deleteArticleFolder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = deleteArticleFolderSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = req.headers.authorization;
    const { userName } = await verifyAccount(token);
    const id: number = req.query.id as any;
    await ArticleService.deleteArticleFolder(id, userName);
    res.status(200).json({ data: "OK" });
  } catch (err) {
    next(err);
  }
};

export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = getArticleSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const token = req.headers.authorization;
    const { userName } = await verifyAccount(token);
    const id: number = req.query.id as any;
    const articleInfo = await ArticleService.getArticle(userName, id);
    res.status(200).json({ data: articleInfo });
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
    const search: string  = req.query.search as any;
    const result = await ArticleService.getArticleList(limit, page, search);
    const maximumPages = await ArticleService.getArticleCount(search);
    res.status(200).json({ data: { ...result, maximumPages } });
  } catch (err) {
    next(err);
  }
};

export const getPublishedArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: number = req.query.id as any;
    const articleInfo = await ArticleService.getPublishedArticle(id);
    res.status(200).json({ data: articleInfo });
  } catch (err) {
    next(err);
  }
};