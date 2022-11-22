import axios from "axios";
const BASE_URL = "http://localhost:3003/api/";

export const requestMethod = axios.create({
  baseURL: BASE_URL,
});
