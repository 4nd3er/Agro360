import axios from "./axios.js";

export const loginRequest = async (user) => axios.post(`/login`, user);
export const registerRequest = async (user) => axios.post(`/register`, user);
export const verifyTokenRequest = async (token) => axios.get(`/verify/${token}`);
export const forgetPasswordRequest = async email => axios.post('/forget-password', email)
export const resetPasswordRequest = async (password, token) => axios.post(`/reset-password/${token}`, password)