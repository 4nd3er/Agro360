import { errorResponse, messages } from '../libs/libs.js'
import { parseDate, capitalizeString, deleteAccents, getNamesLastnames, findImage } from '../libs/functions.js'
import { getDataXlsx } from '../libs/methods.js'
import { Users, Courses, CoursesCronogram, CoursesNames } from '../models/models.js'
import { validateSenaEmail } from '../libs/functions.js'
import { FRONTEND_URL, INSTRUCTOR_IMAGES_ROUTE } from '../config/config.js'
import _ from 'lodash'

export const createCourses = async (req, res) => {
    const files = req.files

    try {
        const convertedFiles = getDataXlsx(res, files)
        for (const file of convertedFiles) {
            const dataFile = file.data
            const fileName = file.name
            const courses = []
            for (const [index, object] of dataFile.entries()) {
                const values = Object.values(object)

                let courseName = values[0]
                let courseNameId;
                const typeCourse = values[1]
                const numberCourse = values[2]

                if (!courseName || !typeCourse || !numberCourse) return res.status(400).json({ message: [`${fileName}: La estructura del archivo es incorrecta, en fila ${index + 2}`] });
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
            await Courses.insertMany(courses)
        }

        res.json({
            response: "Fichas importadas satisfactoriamente",
            data: convertedFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createCronograms = async (req, res) => {
    const files = req.files
    try {
        const convertedFiles = getDataXlsx(res, files)
        const cronograms = []
        const instructors = []
        const instructorsNotFound = []
        const coursesNotFound = []

        for (const file of convertedFiles) {
            const fileName = file.name
            const dataFile = file.data

            for (const [index, object] of dataFile.entries()) {
                const values = Object.values(object)

                if (!values[0] || !values[1] || !values[2] || !values[3] || !values[4]) return res.status(400).json({ message: [`${fileName}: La estructura del archivo es incorrecta, en fila ${index + 2}`] });

                const course = values[0].toString()
                const end = parseDate(values[2])
                const instructor = capitalizeString(values[3])
                const instructorDocument = values[4]

                const cronogramYear = end.toString().split(" ")[3]
                const actualYear = new Date().getFullYear().toString()

                if (instructor.length >= 10 && instructor !== 'Sin Programar' && cronogramYear === actualYear && end < new Date()) {
                    let findInstructorId = _.find(instructors, ({ document }) => document == instructorDocument)
                    let [instructorNames, instructorLastnames] = getNamesLastnames(instructor)
                    instructorNames = deleteAccents(instructorNames)
                    instructorLastnames = deleteAccents(instructorLastnames)
                    //Finds
                    const findCourse = await Courses.findOne({ number: course })
                    if (!findCourse) {
                        if (!coursesNotFound.includes(course)) coursesNotFound.push(course)
                        continue;
                        //return res.status(404).json({ message: [`${fileName}: ficha ${course} no encontrada en fila ${index + 2}`] })
                    }
                    const findCronogram = cronograms.find(cronogram => cronogram.course === findCourse._id.toString())

                    if (!findInstructorId) {
                        const findInstructor = await Users.findOne({ document: instructorDocument })
                        if (!findInstructor) {
                            const instructorNotFound = `${instructorNames} ${instructorLastnames}: ${instructorDocument}`
                            if (!instructorsNotFound.includes(instructorNotFound)) instructorsNotFound.push(instructorNotFound)
                            continue;
                        }
                        findInstructorId = { id: findInstructor._id }
                        instructors.push({ id: findInstructorId.id, document: instructorDocument })
                    }
                    if (!findCronogram) {
                        cronograms.push({ course: findCourse._id.toString(), instructors: [findInstructorId.id] })
                        continue;
                    }
                    if (!findCronogram.instructors.includes(findInstructorId.id)) findCronogram.instructors.push(findInstructorId.id)
                }
            }
        }

        for (const cronogram of cronograms) {
            await CoursesCronogram.findOneAndDelete({ course: cronogram.course })
        }
        await CoursesCronogram.insertMany(cronograms)

        res.json({
            response: "Cronograma de fichas importado correctamente",
            instructorsNotFound: instructorsNotFound,
            coursesNotFound: coursesNotFound,
            data: convertedFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createInstructors = async (req, res) => {
    const files = req.files
    try {
        const convertedFiles = getDataXlsx(res, files)
        const instructors = []
        const notImage = []

        for (const file of convertedFiles) {
            const fileName = file.name
            const dataFile = file.data

            for (const [index, object] of dataFile.entries()) {
                const values = Object.values(object)

                const instructor = values[0]
                const documentType = values[1]
                const document = values[2]
                const rol = "655b1f6df9b6aad257662a58"
                const email = values[3]

                if (!instructor || !documentType || !document || !email) return res.status(400).json({ message: [`${fileName}: La estructura del archivo es incorrecta, en fila ${index + 2}`] });

                const findRepeatEmail = _.find(instructors, (arrayInstructor) => arrayInstructor.email == email.toString())
                if (findRepeatEmail) return res.status(400).json({ message: [`${fileName}: El correo ${email} se encuentra duplicado`] })

                let [instructorNames, instructorLastnames] = getNamesLastnames(instructor)
                instructorNames = deleteAccents(instructorNames)
                instructorLastnames = deleteAccents(instructorLastnames)
                const data = { names: instructorNames.toString(), lastnames: instructorLastnames.toString(), documentType: documentType.toString(), document: document.toString(), rol: rol, email: email.toString() }
                const imageUrl = `${FRONTEND_URL}/${INSTRUCTOR_IMAGES_ROUTE}/${document}.png`
                const findInstructorImage = await findImage(imageUrl)
                if (!findInstructorImage) notImage.push(`${data.names} ${data.lastnames}: ${data.document}`)
                const findInstructor = await Users.findOne({ document: data.document })
                if (findInstructor) {
                    await Users.findOneAndUpdate({ document: data.document }, data)
                    continue;
                }
                const findInstructorArray = _.find(instructors, ({ document }) => data.document == document)
                if (!findInstructorArray) instructors.push(data)
            }
        }
        await Users.insertMany(instructors)
        res.json({
            response: "Instructores importados satisfactoriamente",
            notImageInstructors: notImage,
            data: convertedFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createUsers = async (req, res) => {
    const files = req.files
    try {
        const convertedFiles = getDataXlsx(res, files)
        for (const file of convertedFiles) {
            const dataFiles = file.data
            const users = []
            for (const [index, user] of dataFiles.entries()) {
                const values = Object.values(user)
                console.log(values)
                const names = values[0]
                const lastnames = values[1]
                const docType = values[2]
                const doc = values[3]
                const email = values[4]
                const course = values[5]

                if (!validateSenaEmail(email.toString())) return res.status(400).json({ message: [`Email invalido - fila #${index + 2}`] })
                const findCourse = await Courses.findOne({ number: course })
                if (!findCourse) return res.status(400).json({ message: [messages.notFound(`Ficha - fila #${index + 2}`)] })
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
            await Users.insertMany(users)
        }
        res.json({
            response: "Usuarios importados satisfactoriamente",
            data: convertedFiles
        })
    } catch (error) {
        errorResponse(res, error)
    }
}