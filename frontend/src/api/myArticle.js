import { GetRequest, PostRequest, DeleteRequest } from "../utils/request.js";

export const getFolder = async () => {
  return (await GetRequest({
    url: "/api/folder",
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    }
  })).data.data;
}

export const addFolder = async (folderName) => {
  return (await PostRequest({
    url: "/api/folder",
    data: {folderName},
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    }
  }));
}

export const delFolder = async (folderId) => {
  return (await DeleteRequest({
    url: `/api/folder?id=${folderId}`,
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    }
  }));
}

export const addArticle = async (folderId, articleName) => {
  return (await PostRequest({
    url: "/api/article",
    data: {
      folderId,
      articleName
    },
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    }
  }));
}