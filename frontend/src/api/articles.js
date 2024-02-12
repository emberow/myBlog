import { GetRequest } from "../utils/request.js";

export const getArticleList = async () => {
  return (await GetRequest({
    url: "/api/articleList?page=1&limit=6",
  })).data.data;
}
