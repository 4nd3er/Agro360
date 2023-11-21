import axios from './axios';


const agro360Axios = axios.create({
     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
     withCredentials: true,
 });

const API = "http://localhost:4000/api";

export const registerRequest = async (user) => axios.post(`/register`, user);
export const loginRequest = async (user) => axios.post(`/login`, user);
export const verifyTokenRequest = async () => axios.get(`/verify`);

export default agro360Axios
