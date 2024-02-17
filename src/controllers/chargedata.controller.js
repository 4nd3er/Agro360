import { errorResponse, messages } from '../libs/libs.js'
import { parseDate, capitalizeString, deleteAccents, getNamesLastnames } from '../libs/functions.js'
import { getDataXlsx } from '../libs/methods.js'
import { Users, Courses, CoursesCronogram, CoursesNames } from '../models/models.js'
import { validateSenaEmail } from '../libs/functions.js'

export const createCourses = async (req, res) => {
    const files = req.files

    try {
        const dataFiles = getDataXlsx(res, files)

        for (const file of dataFiles) {
            const courses = []
            for (const [index, object] of file.entries()) {
                const values = Object.values(object)

                let courseName = values[0]
                let courseNameId;
                const typeCourse = values[1]
                const numberCourse = values[2]

                if (!courseName || !typeCourse || !numberCourse) return res.status(400).json({ message: ["Existen campo vacios o la estructura es incorrecta"] })
                courseName = courseName.toString().toUpperCase()

                const findCourseName = await CoursesNames.findOne({ name: courseName })
                if (findCourseName) {
                    courseNameId = findCourseName._id
                } else {
                    const newCourseName = new CoursesNames({ name: courseName })
                    const saveCourseName = await newCourseName.save()
                    courseNameId = saveCourseName._id
                }

                const data = { name: courseNameId.toString(), type: typeCourse.toString(), number: numberCourse.toString() }
                const findCourse = await Courses.findOne({ number: data.number })
                if (findCourse) {
                    const updateCourse = await Courses.findOneAndUpdate({ number: data.number }, data)
                } else {
                    courses.push(data)
                }
            }
            await Courses.create(courses)
        }

        res.json({
            response: "Fichas importadas satisfactoriamente",
            data: dataFiles
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
            const cronograms = []
            for (const [index, object] of file.entries()) {
                const values = Object.values(object)

                const course = values[0].toString()
                const start = parseDate(values[1])
                const end = parseDate(values[2])
                const instructor = capitalizeString(values[3])

                const cronogramYear = end.toString().split(" ")[3]
                const actualYear = new Date().getFullYear().toString()

                if (instructor.length >= 10 && instructor !== 'Sin Programar' && cronogramYear === actualYear && end < new Date()) {
                    const [instructorNames, instructorLastnames] = getNamesLastnames(instructor)
                    const findCourse = await Courses.findOne({ number: course })
                    if (!findCourse) return res.status(404).json({ message: [messages.notFound(`Ficha ${index} index ${index + 2}`)] })
                    const findInstructor = await Users.findOne({ names: instructorNames, lastnames: instructorLastnames })
                    if (!findInstructor) return res.status(404).json({ message: [messages.notFound(`Instructor ${instructor} index ${index + 2}`)] })

                    const findCronogram = cronograms.find(cronogram => cronogram.course === findCourse._id.toString())
                    if (!findCronogram) {
                        cronograms.push({ course: findCourse._id.toString(), instructors: [findInstructor._id.toString()] })
                        continue;
                    }
                    if (!findCronogram.instructors.includes(findInstructor._id.toString())) findCronogram.instructors.push(findInstructor._id.toString())
                }
            }

            for (const cronogram of cronograms) {
                const findCronogram = await CoursesCronogram.findOne({ course: cronogram.course })
                if (findCronogram) {
                    await CoursesCronogram.findOneAndUpdate({ course: cronogram.course }, cronogram)
                    continue;
                }
                const newCronogram = new CoursesCronogram(cronogram)
                const saveCronogram = await newCronogram.save()
            }
        }

        res.json({
            response: "Cronograma de ficha importado correctamente",
            data: dataFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createInstructors = async (req, res) => {
    const files = req.files
    try {
        const dataFiles = getDataXlsx(res, files)

        for (const file of dataFiles) {
            const instructors = []
            for (const [index, object] of file.entries()) {
                const values = Object.values(object)

                const instructor = values[0]
                const documentType = values[1]
                const document = values[2]
                const rol = "655b1f6df9b6aad257662a58"
                const email = values[3]

                if (!instructor || !documentType || !document || !email) return res.status(400).json({ message: ["Existen campo vacios o la estructura es incorrecta"] })
                const [instructorNames, instructorLastnames] = getNamesLastnames(instructor)

                const data = { names: instructorNames.toString(), lastnames: instructorLastnames.toString(), documentType: documentType.toString(), document: document.toString(), rol: rol, email: email.toString() }
                const findInstructor = await Users.findOne({ document: data.document })
                if (findInstructor) {
                    const updateInstructor = await Users.findOneAndUpdate({ document: data.document }, data)
                } else {
                    instructors.push(data)
                }
            }
            await Users.create(instructors)
        }
        res.json({
            response: "Instructores importados satisfactoriamente",
            data: dataFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createUsers = async (req, res) => {
    const files = req.files
    try {
        const dataFiles = getDataXlsx(res, files)
        for (const file of dataFiles) {
            const users = []
            for (const [index, user] of file.entries()) {
                const values = Object.values(user)
                console.log(values)
                const names = values[0]
                const lastnames = values[1]
                const docType = values[2]
                const doc = values[3]
                const email = values[4]
                const course = values[5]

                if (!validateSenaEmail(email.toString())) return res.status(400).json({ message: [`Email invalido - fila #${index + 1}`] })
                const findCourse = await Courses.findOne({ number: course })
                if (!findCourse) return res.status(400).json({ message: [messages.notFound(`Ficha - fila #${index + 1}`)] })
                const findUser = await Users.findOne({ document: doc.toString() })
                const data = {
                    names: capitalizeString(names),
                    lastnames: capitalizeString(lastnames),
                    documentType: docType.toString(),
                    document: doc.toString(),
                    rol: "6558e534c44fb9ddd8295320",
                    email: email.toString(),
                    course: findCourse._id
                }
                if (findUser) await Users.findOneAndUpdate({ document: data.document }, data)
                else users.push(data)
            }
            await Users.create(users)
        }
        res.json({
            response: "Usuarios importados satisfactoriamente",
            data: dataFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}