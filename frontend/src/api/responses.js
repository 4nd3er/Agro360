import axios from "./axios.js";

//* Create Response
export const getCodeResponseRequest = async (id, email) => axios.get(`/forms/v/${id}?email=${email}`)
export const verificateCodeResponseRequest = async (id, code) => axios.post(`/forms/v/${id}`, code)
export const getFormtoResponseRequest = async (id) => axios.get(`/forms/r/${id}`)
export const createResponseRequest = async (id, data) => axios.post(`/forms/r/${id}`, data)


//* Responses
export const ResponsesRequest = async () => axios.get("/responses")
export const getResponseRequest = async (id) => axios.get(`/responses/${id}`)
export const getResponsesInstructorRequest = async (id) => axios.get(`/responses/${id}/instructor`)
export const getResponsesFormRequest = async (id) => axios.get(`/responses/${id}`)
