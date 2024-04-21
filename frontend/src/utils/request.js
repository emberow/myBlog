import axios from "axios";

let baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';


export const PostRequest = axios.create({
  baseURL,
  timeout: 20000, // 延迟时间
  method: "POST",
});

export const GetRequest = axios.create({
  baseURL,
  timeout: 20000, // 延迟时间
  method: "GET",
});

export const DeleteRequest = axios.create({
  baseURL,
  timeout: 20000, // 延迟时间
  method: "DELETE",
});

export const PatchRequest = axios.create({
  baseURL,
  timeout: 20000, // 延迟时间
  method: "PATCH",
});