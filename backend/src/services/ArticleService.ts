import { CustomError } from '../middleware/errors';
import * as ArticleModel from "../model/ArticleModel";

export const getArticleFolder = async (userName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }

  return ArticleModel.getArticleFolder(userName);
};

export const addArticleFolder = async (userName: string, folderName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!folderName) {
    throw new CustomError(400, 'INVALID_FOLDERNAME');
  }
  const article = {
    name: folderName,
    userName: userName,
  }
  ArticleModel.addArticleFolder(article);
};

export const updateArticleFolder = async (userName: string, id: string, folderName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!userName) {
    throw new CustomError(400, 'INVALID_ID');
  }
  if (!folderName) {
    throw new CustomError(400, 'INVALID_FOLDERNAME');
  }
  ArticleModel.updateArticleFolder(userName, id, folderName);
};

export const deleteArticleFolder = async (id: string, userName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!id) {
    throw new CustomError(400, 'INVALID_Id');
  }
  ArticleModel.deleteArticleFolder(id, userName);
};

export const getArticle = async (userName: string, id: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!id) {
    throw new CustomError(400, 'INVALID_ID');
  }

  return ArticleModel.getArticle(Number(id), userName);
};

export const addArticle = async (userName: string, folderId: string, articleName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!folderId) {
    throw new CustomError(400, 'INVALID_FOLDERID');
  }
  if (!articleName) {
    throw new CustomError(400, 'INVALID_ARTICLENAME');
  }
  const article = {
    name: articleName,
    articleFolder: {
      id: folderId,
    }
  }
  return ArticleModel.addArticle(article);
};

export const updateArticle = async (userName: string, id: string, name: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!id) {
    throw new CustomError(400, 'INVALID_ID');
  }
  if (!name) {
    throw new CustomError(400, 'INVALID_NAME');
  }
  return ArticleModel.updateArticle(id, name, userName);
};

export const deleteArticle = async (userName: string, id: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!id) {
    throw new CustomError(400, 'INVALID_Id');
  }
  ArticleModel.deleteArticle(id, userName);
};