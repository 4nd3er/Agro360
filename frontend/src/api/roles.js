import axios from './axios.js'

//* Roles
export const RolesRequest = async () => axios.get("/roles")
export const getRoleRequest = async (id) => axios.get(`/roles/${id}`)
export const getRoleTopicsRequest = async (id) => axios.get(`/roles/${id}/topics`)
export const createRoleRequest = async (data) => axios.post("/roles", data)
export const updateRoleRequest = async (id, data) => axios.put(`/roles/${id}`, data)
export const deleteRoleRequest = async (id) => axios.delete(`/roles/${id}`)

