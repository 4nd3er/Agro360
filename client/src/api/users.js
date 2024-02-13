import axios from './axios.js'

//* Users
export const UsersRequest = async () => axios.get("/users")
export const getUserRequest = async (id) => axios.get(`/users/${id}`)
export const createUserRequest = async (data) => axios.post("/users", data)

//* Courses
export const CoursesRequest = async () => axios.get("/courses")
export const getCourseRequest = async (id) => axios.get(`/courses/${id}`)

//* Courses Names
export const getCourseNamesRequest = async () => axios.get("/courses/coursenames")
export const getCourseNameRequest = async (id) => axios.get(`/courses/coursenames/${id}`)