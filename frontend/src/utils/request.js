import axios from "axios";

export const PostRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 20000, // 延迟时间
  method: "POST",
});

export const GetRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 20000, // 延迟时间
  method: "GET",
});

export const DeleteRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 20000, // 延迟时间
  method: "DELETE",
});

export const PatchRequest = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 20000, // 延迟时间
  method: "PATCH",
});