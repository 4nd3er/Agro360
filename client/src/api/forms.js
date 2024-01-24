import axios from './axios.js'

//* Question Types
export const QuestionTypesRequest = async () => axios.get("/forms/questions/questiontypes")
export const getQuestionTypeRequest = async (id) => axios.get(`/forms/questions/questiontypes/${id}`)
export const createQuestionTypeRequest = async (data) => axios.post("/forms/questions/questiontypes", data)
export const updateQuestionTypeRequest = async (id, data) => axios.put(`/forms/questions/questiontypes/${id}`, data)
export const deleteQuestionTypeRequest = async (id) => axios.delete(`/forms/questions/questiontypes/${id}`)

//* Forms
export const FormsRequest = async () => axios.get("/forms")
export const getFormRequest = async (id) => axios.get(`/forms/${id}`)
export const getFormsResponsesRequest = async () => axios.get("/forms/responses")
export const getFormInstructorsResultsRequest = async (id) => axios.get(`/forms/${id}/results`)
export const createFormRequest = async (data) => axios.post(`/forms`, data)
export const updateFormRequest = async (id, data) => axios.put(`/forms/${id}`, data)
export const deleteFormRequest = async (id) => axios.delete(`/forms/${id}`)
export const getFormReportRequest = async (id) => axios.get(`/forms/${id}/report`, {
    responseType: 'arraybuffer'
})