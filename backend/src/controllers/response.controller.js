import bcrypt from 'bcrypt'
import { Courses, CoursesCronogram, Forms, Responses, Users } from "../models/models.js"
import { createMethod, getMethod, getOneMethod } from "../libs/methods.js"
import { compObjectId, errorResponse, messages, sendEmailFormCode } from '../libs/libs.js'
import { generateCode, capitalizeWord } from '../libs/functions.js'

//* Comprobar existencia del formulario
export const compForm = async (req, res, next) => {
    const { form } = req.params
    try {
        const findForm = await compObjectId(form, Forms, "Form")
        if (!findForm.success) return res.status(findForm.status).json({ message: [findForm.msg] })
        next();
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Comprobar la cookie y que el codigo este correcto para el acceso
export const compFormCookie = async (req, res, next) => {
    const { form } = req.params
    const user = req.cookies.user
    if (!user) return res.status(403).json({ message: ["Code not found, you are not authorized"] })
    const { id, email, sessionCode, userCode } = user

    try {
        //Si no se ha definido un codigo
        if (!sessionCode) return res.status(403).json({ message: ["Code not defined, get your code"] })
        if (!userCode) return res.status(403).json({ message: ["You have not entered any code"] })
        if (!await bcrypt.compare(userCode, sessionCode)) return res.status(400).json({ message: ["The code is incorrect"] })
        const findForm = await compObjectId(form, Forms, "Form")
        if (!findForm.success) return res.status(findForm.status).json({ message: [findForm.msg] })
        next()
    } catch (error) {
        errorResponse(res, error)
    }
}

// *Dar y Comprobar codigo para acceso
export const getCode = async (req, res) => {
    const { form } = req.params
    const { email } = req.query

    try {
        const user = await Users.findOne({ email })
        if (!user) return res.status(404).json({ message: ["User not found"] })
        //Buscar ficha
        if (!user.course) return res.status(400).json({ message: ["You do not have a course, you cannot respond to this form."] })
        const findCronogram = await CoursesCronogram.findOne({ course: user.course })
        if (!findCronogram) return res.status(400).json({ message: ["You cannot respond to this form"] })
        //Comprobar si existe una respuesta
        const findResponse = await Responses.findOne({ form: form, user: user._id })
        if (findResponse) return res.status(400).json({ message: ["You have already responded to this form"] })
        //Generar codigo aleatorio
        const code = generateCode(6);
        const hashCode = await bcrypt.hash(code, 6)
        //Crear cookie
        const data = { id: user._id.toString(), email: email, sessionCode: hashCode, userCode: "" }
        res.cookie("user", data, {
            maxAge: 3600000,
            secure: true,
            sameSite: "none",
        })
        //Enviar correo
        sendEmailFormCode(res, email, code)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const compCode = async (req, res) => {
    const user = req.cookies.user
    if (!user) return res.status(403).json({ message: ["Your code has expired"] })
    const { id, email, sessionCode, userCode } = user
    const { code } = req.body

    try {
        //Validar que el codigo sea correcto        
        if (!await bcrypt.compare(code, sessionCode)) return res.status(400).json({ message: ["The code is incorrect"] })

        //Redefinir cookie
        user.userCode = code
        res.cookie("user", user, {
            maxAge: 3600000,
            secure: true,
            sameSite: "none",
        })
        const findUser = await Users.findById(id)
        res.json({
            response: "Code comprobate successfully",
            data: {
                code: code,
                user: `${findUser.names} ${findUser.lastnames}`
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

// *Recibir formulario segun los instructores del cronograma de mi ficha
export const getFormtoResponse = async (req, res) => {
    const { form } = req.params
    const user = req.cookies.user
    const { id } = user

    try {
        const findForm = await Forms.findById(form)
        const findUser = await Users.findById(id)
        const findCourse = await Courses.findById(findUser.course)
        const findCronogram = await CoursesCronogram.findOne({ course: findCourse._id })
        const idInstructors = findCronogram.instructors

        //Array de instructores
        const responseInstructors = []
        for (const instructor of idInstructors) {
            const findInstructor = await Users.findById(instructor)
            responseInstructors.push(findInstructor)
        }
        res.json({
            instructors: responseInstructors,
            form: findForm
        })
    } catch (error) {
        errorResponse(res, error)
    }
}


export const createResponse = async (req, res) => {
    const { form } = req.params
    const user = req.cookies.user
    const { answers } = req.body
    const data = { user: user.id, form: form, answers }

    try {
        for (const [index, answer] of answers.entries()) {
            const question = answer.question
            const instructor = answer.instructor

            const findQuestion = await Forms.findOne({ _id: form, "questions.question": question })
            if (!findQuestion) return res.status(400).json({ message: [messages.notFound(`Question ${index} for this form`)] })
            const findInstructor = await compObjectId(instructor, Users, "Instructor")
            if (!findInstructor.success) return res.status(findInstructor.success) - json({ message: [findInstructor.msg] })
        }

        //Eliminar cookie
        res.cookie("user", "", {
            expires: new Date(0)
        })

        await createMethod(data, data, res, Responses, "Response")
    } catch (error) {
        errorResponse(res, error)
    }
}


// *Show Responses
export const responses = async (req, res) => {
    await getMethod(res, Responses, "Responses")
}

export const getResponse = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Responses, "Response")
}

//Traer las response de un formulario segun su id
export const getResponseForm = async (req, res) => {
    const { form } = req.params

    try {
        const findResponse = await Responses.find({ form: form })
        if (!findResponse.length > 0) return res.status(404).json({ message: [messages.notFound("Form Response")] })
        res.json(findResponse)
    } catch (error) {
        errorResponse(res, error)
    }
}

//Traer las repuestas de una response segun el instructor
export const getResponseInstructor = async (req, res) => {
    const { id, instructor } = req.params

    try {
        const findResponse = await Responses.findOne({ _id: id, "answers.instructor": instructor })
        if (!findResponse) return res.status(404).json({ message: [messages.notFound("Answers Instructor")] })
        const answers = findResponse.answers

        const answersInstructor = []
        for (const answer of answers) {
            const instructorId = answer.instructor.toString()
            if (instructorId === instructor) answersInstructor.push(answer)
        }

        res.json(answersInstructor)
    } catch (error) {
        errorResponse(res, error)
    }
}
