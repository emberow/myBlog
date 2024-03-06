import axios from "axios";

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_BACKEND_URL
} else if (process.env.NODE_ENV === "production") {
  baseURL = process.env.LOCAL_REACT_APP_BACKEND_URL
}

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