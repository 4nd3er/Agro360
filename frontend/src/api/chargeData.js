import axios from './axios'

export const createCoursesRequest = async (data) => axios.post("/charge-data/courses", data)
export const createCronogramsRequest = async (data) => axios.post("/charge-data/cronograms", data)
export const createInstructorsRequest = async (data) => axios.post("/charge-data/instructors", data)
export const createUsersRequest = async (data) => axios.post("/charge-data/users", data)