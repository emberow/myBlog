import { GetRequest } from "../utils/request.js";

export const getArticleList = async (page) => {
  return (await GetRequest({
    url: `/api/articleList?page=${page}&limit=6`,
  })).data.data;
}

export const getArticle = async (id) => {
  return (await GetRequest({
    url: `/api/publishedArticle?id=${id}`,
  })).data.data;
}