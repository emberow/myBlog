import { GetRequest } from "../utils/request.js";

export const getArticleList = async (page, search) => {
  let url = `/api/articleList?page=${page}&limit=6`;
  if (search) {
    url += `&search=${search}`;
  }
  return (await GetRequest({
    url: url,
  })).data.data;
}

export const getArticle = async (id) => {
  return (await GetRequest({
    url: `/api/publishedArticle?id=${id}`,
  })).data.data;
}