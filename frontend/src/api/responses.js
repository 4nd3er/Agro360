import axios from "./axios.js";

//* Responses
export const ResponsesRequest = async () => axios.get("/responses")
export const getResponseRequest = async (id) => axios.get(`/responses/${id}`)
export const getResponsesInstructor = async (id) => axios.get(`/responses/${id}/instructor`)
export const getResponsesForm = async (id) => axios.get(`/responses/${id}`)
