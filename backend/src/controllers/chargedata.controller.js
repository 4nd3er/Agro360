import { errorResponse } from '../libs/libs.js'
import { parseDate, capitalizeString, deleteAccents } from '../libs/functions.js'
import { getDataXlsx } from '../libs/methods.js'
import { Users, Courses, CoursesCronogram } from '../models/models.js'
import xlsx from 'xlsx'

export const createCourses = async (req, res) => {
    const files = req.files

    try {
        const dataFiles = getDataXlsx(res, files)

        for (const file of dataFiles) {
            for (const [index, object] of file.entries()) {
                const values = Object.values(object)

            }
        }

        res.json({
            response: "Archivos importados",
            data: ""
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createCronograms = async (req, res) => {
    const files = req.files

    try {
        const dataFiles = getDataXlsx(res, files)

        for (const file of dataFiles) {
            const instructorsArray = []
            let courseId = ""            
            for (const [index, object] of file.entries()) {
                const values = Object.values(object)

                const course = values[0].toString()
                const start = parseDate(values[1])
                const end = parseDate(values[2])
                const year = end.toString().split(" ")[3]
                const instructor = capitalizeString(deleteAccents(values[3]))

                const actualYear = new Date().getFullYear().toString()
                const stringInstructor = instructor.split(" ")
                let instructorNames = ""
                let instructorLastnames = ""
                if (stringInstructor.length === 4) {
                    instructorNames = `${stringInstructor[0]} ${stringInstructor[1]}`
                    instructorLastnames = `${stringInstructor[2]} ${stringInstructor[3]}`
                } else if (stringInstructor.length === 3) {
                    instructorNames = `${stringInstructor[0]}`
                    instructorLastnames = `${stringInstructor[1]} ${stringInstructor[2]}`
                } else if (stringInstructor.length === 2) {
                    instructorNames = `${stringInstructor[0]}`
                    instructorLastnames = `${stringInstructor[1]}`
                }

                if (instructor.length > 6 && year === actualYear && end < new Date()) {
                    const findCourse = await Courses.findOne({ number: course })
                    if (!findCourse) return res.status(404).json({ message: [messages.notFound(`Course ${index}`)] })
                    courseId = findCourse._id.toString()
                    const findInstructor = await Users.findOne({ names: instructorNames, lastnames: instructorLastnames })
                    if (!findInstructor) return res.status(404).json({ message: [messages.notFound(`Instructor ${instructor}`)] })
                    if (!instructorsArray.includes(findInstructor._id.toString())) instructorsArray.push(findInstructor._id.toString())
                }
                
            }
            const data = { course: courseId, instructors: instructorsArray }
            const findCronogram = await CoursesCronogram.findOne({ course: courseId })
            if (!findCronogram) {
                const newCronogram = new CoursesCronogram(data)
                newCronogram.save()
            } else {
                await CoursesCronogram.findOneAndUpdate({ course: courseId }, data)
            }
        }

        res.json({
            response: "Archivos importados correctamente",
            data: dataFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createInstructors = async (req, res) => {
    const files = req.files
}