import axios from "axios";

export const Service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000, // 延迟时间
  method: "POST",
});

export const GetService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000, // 延迟时间
  method: "GET",
});