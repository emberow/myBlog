import { GetRequest, PostRequest, DeleteRequest, PatchRequest } from "../utils/request.js";
import { message } from "antd";
export const getFolder = async () => {
  try {
    return (await GetRequest({
      url: "/api/folder",
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    })).data.data;
  } catch {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  }
}

export const addFolder = async (folderName) => {
  try{
    return (await PostRequest({
      url: "/api/folder",
      data: {folderName},
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }));
  } catch {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  }
}

export const delFolder = async (folderId) => {
  try{
    return (await DeleteRequest({
      url: `/api/folder?id=${folderId}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }));
  } catch {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  }
}

export const addArticle = async (folderId, articleName) => {
  try{
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
  } catch {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  }
}

export const getArticle = async (articleId) => {
  try{
    return (await GetRequest({
      url: `/api/article/?id=${articleId}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    })).data.data;
  } catch {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  }
}

export const patchArticle = async (article) => {
  try{
    return (await PatchRequest({
      url: "/api/article",
      data: article,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    }));
  } catch {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  }
}

export const delArticle = async (articleId) => {
  try{
    return (await DeleteRequest({
      url: `/api/article/?id=${articleId}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      }
    })).data.data;
  } catch {
    localStorage.removeItem('accessToken');
    await message.error('authentication failed', 1);
    window.location.href = "/login";
  }
}