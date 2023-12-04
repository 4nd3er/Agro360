import xlsx from 'xlsx'
import { Courses, CoursesNames, CoursesCronogram, Topics, Users } from '../models/models.js'
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod, } from '../libs/methods.js'
import { errorResponse, messages, compObjectId } from '../libs/libs.js'
import { capitalizeString, deleteAccents } from '../libs/functions.js'

//* Courses Names
export const coursesNames = async (req, res) => {
    await getMethod(res, CoursesNames, "Courses names")
}

export const getCourseName = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, CoursesNames, "Course name")
}

export const createCourseName = async (req, res) => {
    const { name } = req.body
    const data = { name }
    const find = { name }
    await createMethod(data, find, res, CoursesNames, "Course name", "capitalize")
}

export const updateCourseName = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const data = { name }
    const find = { name }
    await updateMethod(data, id, find, res, CoursesNames, "Course name", "capitalize")
}

export const deleteCourseName = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, CoursesNames, "Course name")
}

//* Courses
export const courses = async (req, res) => {
    await getMethod(res, Courses, "Courses")
}

export const getCourse = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Courses, "Course")
}

export const createCourse = async (req, res) => {
    const { name, type, number } = req.body
    const data = { name, type, number }
    const find = { number }
    try {
        const compName = await compObjectId(name, CoursesNames, "Course Name")
        if (!compName.success) return res.status(compName.status).json({ message: [compName.msg] })
        await createMethod(data, find, res, Courses, "Course")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const updateCourse = async (req, res) => {
    const { id } = req.params
    const { name, type, number } = req.body
    const data = { name, type, number }
    const find = { number }
    try {
        const compName = await compObjectId(name, CoursesNames, "Course Name")
        if (!compName.success) return res.status(compName.status).json({ message: [compName.msg] })
        await updateMethod(data, id, find, res, Courses, "Course")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const deleteCourse = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, Courses, "Course")
}
