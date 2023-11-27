import axios from './axios.js'

export const UsersRequest = async () => axios.get("/users")
export const getUserRequest = async (id) => axios.get(`/users/${id}`)