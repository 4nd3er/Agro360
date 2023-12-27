import axios from "axios";
import { API_URL } from "../config.js";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (session) config.headers.Authorization = `Bearer ${session.token}`
  return config
}, (error) => {
  return Promise.reject(error)
})

export default instance;
