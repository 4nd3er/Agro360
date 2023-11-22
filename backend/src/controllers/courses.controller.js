import xlsx from 'xlsx'
import { Courses, CoursesNames, CoursesCronogram, Topics, Users } from '../models/models.js'
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod, } from '../libs/methods.js'
import { errorResponse, messages, compObjectId } from '../libs/libs.js'
import { capitalizeString } from '../libs/functions.js'


// *Courses Names
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


//*Courses
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

    const compName = await compObjectId(name, CoursesNames, "Course Name")
    if (!compName.success) return res.status(compName.status).json({ message: [compName.msg] })

    await createMethod(data, find, res, Courses, "Course")
}

export const updateCourse = async (req, res) => {
    const { id } = req.params
    const { name, type, number } = req.body
    const data = { name, type, number }
    const find = { number }

    const compName = await compObjectId(name, CoursesNames, "Course Name")
    if (!compName.success) return res.status(compName.status).json({ message: [compName.msg] })

    await updateMethod(data, id, find, res, Courses, "Course")
}

export const deleteCourse = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, Courses, "Course")
}


//* Cronogram Courses
export const coursesCronogram = async (req, res) => {
    await getMethod(res, CoursesCronogram, "Course Cronogram")
}

export const getCourseCronogram = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, CoursesCronogram, "Course Cronogram")
}

export const createCourseCronogram = async (req, res) => {

    try {
        //const buffer = req.file.buffer;
        //Leer archivo xlsx
        //const file = xlsx.read(buffer, { type: 'buffer' })
        const file = xlsx.readFile("C:\\Users\\Giovanny Ladino\\Downloads\\prueba.xlsx")
        //Obtener hojas
        const sheet = file.SheetNames
        //Obtener la primer hoja y convertir los datos a json
        const fileData = xlsx.utils.sheet_to_json(file.Sheets[sheet[0]])
        //Funcion para convertir el codigo de fecha a fecha
        const parseDate = date => {
            const convertDate = xlsx.SSF.parse_date_code(date)
            return new Date(`${convertDate.y}-${convertDate.m}-${convertDate.d}`);
        }
        //Arreglo para los datos
        const coursesCronogram = []
        for (const [index, object] of fileData.entries()) {
            const values = Object.values(object)

            const course = values[0].toString()
            const start = parseDate(values[1])
            const end = parseDate(values[2])

            const instructor = capitalizeString(values[3])
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

            if (instructor.length > 6) {
                const findCourse = await Courses.findOne({ number: course })
                if (!findCourse) return res.status(404).json({ message: [messages.notFound(`Course ${index}`)] })
                const findInstructor = await Users.findOne({ names: instructorNames, lastnames: instructorLastnames })
                if (!findInstructor) return res.status(404).json({ message: [messages.notFound(`Instructor ${index}`)] })
                const data = { course: findCourse._id, start: start, end: end, instructor: findInstructor._id }
                console.log(data)

                const findCronogram = await CoursesCronogram.findOne(data)
                if (findCronogram) return res.status(400).json({ message: [messages.alreadyExists(`Cronogram ${index}`)] })

                coursesCronogram.push(data)
            }

            const newCronogram = new CoursesCronogram(coursesCronogram)
            const saveCronogram = await newCronogram.save()
        }
        res.json({ message: ["OK"] })
        /*res.json({
            response: "Course Cronogram importes successfully",
            data: coursesCronogram
        })*/
    } catch (error) {
        errorResponse(res, error)
    }
}

export const updateCourseCronogram = async (req, res) => {
    const { id } = req.params
    const { course, start, end, instructor } = req.body
    const data = { course, start, end, instructor }
    const find = data

    const compCourse = await compObjectId(course, Courses, "Course")
    if (!compCourse.success) return res.status(compCourse.status).json({ message: [compCourse.msg] })
    const compInstructor = await compObjectId(instructor, Courses, "Instructor")
    if (!compInstructor.success) return res.status(compInstructor.status).json({ message: [compInstructor.msg] })

    await updateMethod(data, id, find, res, CoursesCronogram, "Course Cronogram")
}

export const deleteCourseCronogram = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, CoursesCronogram, "Course Cronogram")
}
