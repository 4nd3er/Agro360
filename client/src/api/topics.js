import axios from './axios.js'

//* Topics
export const TopicsRequest = async () => axios.get("/topics")
export const getTopicRequest = async (id) => axios.get(`/topics/${id}`)
export const getTopicFormsRequest = async (id) => axios.get(`/topics/${id}/forms`)
export const createTopicRequest = async (data) => axios.post("/topics", data)
export const updateTopicRequest = async (id, data) => axios.put(`/topics/${id}`, data)
export const deleteTopicRequest = async (id) => axios.delete(`/topics/${id}`)