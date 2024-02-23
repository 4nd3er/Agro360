import axios from './axios';


const agro360Axios = axios.create({
     baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
 });

const API = "http://localhost:4000/api";

export const registerRequest = (user) => axios.post(`/register`,user);
export const loginRequest = (user) => axios.post(`/login`,user);
export const verifyTokenRequest = () => axios.get(`/verify`);

export default agro360Axios