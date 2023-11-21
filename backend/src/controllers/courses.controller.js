import xlsx from 'xlsx'
import compObjectId from '../libs/compObjectId.js'
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod, capitalizeString } from '../libs/methods.js'
import { Courses, CoursesNames, CoursesCronogram, Topics, Users } from '../models/models.js'
import { errorResponse, messages } from '../libs/libs.js'


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
    await createMethod(data, find, res, CoursesNames, "Course name")
}

export const updateCourseName = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const data = { name }
    const find = { name }
    await updateMethod(data, id, find, res, CoursesNames, "Course name")
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
    if (!compName.success) return res.status(compName.status).json({ msg: compName.msg })

    await createMethod(data, find, res, Courses, "Course")
}

export const updateCourse = async (req, res) => {
    const { id } = req.params
    const { name, type, number } = req.body
    const data = { name, type, number }
    const find = { number }

    const compName = await compObjectId(name, CoursesNames, "Course Name")
    if (!compName.success) return res.status(compName.status).json({ msg: compName.msg })

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

export const getCourseCronogram = async(req, res) => {
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
            const nameInstructor = instructor.split(" ")[0]

            if (instructor.length > 6) {            
                const findCourse = await Courses.findOne({ number: course })
                if (!findCourse) return res.status(404).json({ msg: messages.notFound(`Course ${index}`) })
                const findInstructor = await Users.findOne({ names: nameInstructor })
                if (!findInstructor) return res.status(404).json({ msg: messages.notFound(`Instructor ${index}`) })                
                const data = { course: findCourse._id, start: start, end: end, instructor: findInstructor._id }
                console.log(data)
                /*
                const findCronogram = await CoursesCronogram.findOne(data)
                if (findCronogram) return res.status(400).json({ msg: messages.alreadyExists(`Cronogram ${index}`) })
    
                const newCronogram = new CoursesCronogram(data)
                const saveCronogram = await newCronogram.save()
                */

                coursesCronogram.push({ ...data })
            }
        }
        res.json({ msg: "OK" })
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
    if (!compCourse.success) return res.status(compCourse.status).json({ msg: compCourse.msg })
    const compInstructor = await compObjectId(instructor, Courses, "Instructor")
    if (!compInstructor.success) return res.status(compInstructor.status).json({ msg: compInstructor.msg })

    await updateMethod(data, id, find, res, CoursesCronogram, "Course Cronogram")
}

export const deleteCourseCronogram = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, CoursesCronogram, "Course Cronogram")
}
