import { GetRequest } from "../utils/request.js";

export const getArticleList = async (page) => {
  return (await GetRequest({
    url: `/api/articleList?page=${page}&limit=6`,
  })).data.data;
}
