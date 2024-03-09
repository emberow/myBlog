import { Article } from 'src/entity/Article';
import { ArticleFolder } from '../entity/ArticleFolder';
import { CustomError } from '../middleware/errors';
import * as ArticleModel from "../model/ArticleModel";
import * as ArticleFolderModel from "../model/ArticleFolderModel";

export const getArticleFolder = async (userName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  const articleFolders: ArticleFolder[] = await ArticleFolderModel.getArticleFolder(userName)
  for (const articleFolder of articleFolders) {
    articleFolder.articles = await ArticleModel.getArticleByFolderId(articleFolder.id, userName);
  }
  return articleFolders;
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
    updateTime: new Date(),
  }
  await ArticleFolderModel.addArticleFolder(article);
};

export const updateArticleFolder = async (userName: string, id: number, folderName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (!userName) {
    throw new CustomError(400, 'INVALID_ID');
  }
  if (!folderName) {
    throw new CustomError(400, 'INVALID_FOLDERNAME');
  }
  await ArticleFolderModel.updateArticleFolder(userName, id, folderName);
};

export const deleteArticleFolder = async (id: number, userName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (id == null) {
    throw new CustomError(400, 'INVALID_Id');
  }
  let articles: Article[] = await ArticleModel.getArticleByFolderId(id, userName);
  let articleIds: number[] = articles?.map(item => item.id);
  if (articleIds.length != 0) {
    await ArticleModel.deleteArticles(articleIds);
  }
  await ArticleFolderModel.deleteArticleFolder(id, userName);
};

export const getArticle = async (userName: string, id: number) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (id == null) {
    throw new CustomError(400, 'INVALID_ID');
  }

  return ArticleModel.getArticle(Number(id), userName);
};

export const addArticle = async (userName: string, folderId: number, articleName: string) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (folderId == null) {
    throw new CustomError(400, 'INVALID_FOLDERID');
  }
  if (!articleName) {
    throw new CustomError(400, 'INVALID_ARTICLENAME');
  }
  const article = {
    name: articleName,
    is_publish: false,
    articleFolder: {
      id: folderId,
    }
  }
  return ArticleModel.addArticle(article);
};

export const updateArticle = async (userName: string, id: number, name: string, content: string, isPublish: Boolean) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (id == null) {
    throw new CustomError(400, 'INVALID_ID');
  }
 
  let article = {updateTime: new Date()};

  if (name != null) {
    article['name'] = name;
  }

  if (content != null) {
    article['content'] = content;
  }

  if (isPublish != null) {
    article['isPublish'] = isPublish;
  }

  return ArticleModel.updateArticle(id, article);
};

export const deleteArticle = async (userName: string, id: number) => {
  if (!userName) {
    throw new CustomError(400, 'INVALID_USERNAME');
  }
  if (id == null) {
    throw new CustomError(400, 'INVALID_Id');
  }
  await ArticleModel.deleteArticles([id]);
};

export const getArticleList = async (limit: number, page: number, search: string) => {
  const offset = limit * (page - 1)
  return ArticleModel.getArticleList(limit, offset, search);
};

export const getArticleCount = async (search: string) => {
  return ArticleModel.getArticleCount(search);
};

export const getPublishedArticle = async (id: number) => {
  if (id == null) {
    throw new CustomError(400, 'INVALID_ID');
  }

  return ArticleModel.getPublishedArticle(Number(id));
};