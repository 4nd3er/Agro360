import axios from "./axios.js";

//* Create Response
export const getCodeResponseRequest = async (id, email) => axios.get(`/forms/v/${id}?email=${email}`)
export const verificateCodeResponseRequest = async (id, user) => axios.post(`/forms/v/${id}`, user)
export const getFormtoResponseRequest = async (id, user) => axios.get(`/forms/r/${id}`, {
    headers: {
        "user": user
    }
})
export const createResponseRequest = async (id, data, user) => axios.post(`/forms/r/${id}`, data, {
    headers: {
        "user": user
    }
})

//* Responses
export const ResponsesRequest = async () => axios.get("/responses")
export const getResponseRequest = async (id) => axios.get(`/responses/${id}`)
export const getResponsesInstructorRequest = async (id) => axios.get(`/responses/${id}/instructor`)
export const getResponsesFormRequest = async (id) => axios.get(`/responses/${id}`)
