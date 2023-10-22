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