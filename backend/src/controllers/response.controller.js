import { capitalizeWord, createMethod, getMethod, getOneMethod } from "../libs/methods.js"
import { Forms, Responses, Users } from "../models/models.js"
import { compObjectId, createToken, errorResponse, generateCode, messages, sendEmailFormCode } from '../libs/libs.js'
import bcrypt from 'bcrypt'

//* Comprobar existencia del formulario
export const compForm = async (req, res, next) => {
    const { id } = req.params
    const findForm = await compObjectId(id, Forms, "Form")
    if (!findForm.success) return res.status(findForm.status).json({ msg: findForm.msg })
    next();
}

//* Comprobar la cookie y que el codigo este correcto para el acceso
export const compFormCookie = async (req, res, next) => {
    const { form } = req.params
    const user = req.cookies.user
    if (!user) return res.status(401).json({ msg: "Code not found, you are not authorized" })
    const { id, email, sessionCode, userCode } = user

    try {
        //Si no se ha definido un codigo
        if (!sessionCode) return res.status(401).json({ msg: "Code not defined, get your code" })
        if (!userCode) return res.status(401).json({ msg: "You have not entered any code" })
        if (!await bcrypt.compare(userCode, sessionCode)) return res.status(401).json({ msg: "The code is incorrect" })

        const findForm = await compObjectId(form, Forms, "Form")
        if (!findForm.success) return res.status(findForm.status).json({ msg: findForm.msg })
        next()
    } catch (error) {
        errorResponse(res, error)
    }
}

// *Dar y Comprobar codigo para acceso
export const getCode = async (req, res) => {
    const { email } = req.query
    const { id } = req.params

    try {
        const user = await Users.findOne({ email })
        if (!user) return res.status(404).json({ msg: "User not found" })
        const findResponse = await Forms.findOne({ id: id, user: user._id })
        if (findResponse) return res.status(401).json({ msg: "You have already responded to this form" })
        //Generar codigo aleatorio
        const code = generateCode(6);
        const hashCode = await bcrypt.hash(code, 5)
        //Crear cookie
        const data = { id: user._id.toString(), email: email, sessionCode: hashCode, userCode: "" }
        res.cookie("user", data, { maxAge: 1800000, httpOnly: true })

        sendEmailFormCode(res, email, code)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const compCode = async (req, res) => {
    const user = req.cookies.user
    const { id, email, sessionCode, userCode } = user
    const { code } = req.body

    try {
        //Validar que la cookie exista y el codigo sea correcto
        if (!user) return res.status(401).json({ msg: "Your code has expired" })
        if (!await bcrypt.compare(code, sessionCode)) return res.status(401).json({ msg: "The code is incorrect" })

        //Redefinir cookie
        user.userCode = code
        res.cookie("user", user, { maxAge: 1800000, httpOnly: true })

        const findUser = await Users.findById(id)
        res.json({
            response: "Code comprobate successfully",
            data: {
                code: code,
                user: `${findUser.names} ${findUser.lastnames}`,
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

// *Recibir formulario
export const getFormtoResponse = async (req, res) => {
    const { form } = req.params
    const user = { id: "", email: "" }

    console.log(user)
    res.json({ msg: "OK" })
    //await getOneMethod(form, res, Forms, "Form")
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
            const response = answer.answer
            answer.answer = capitalizeWord(response)

            const findQuestion = await Forms.findOne({ _id: form, "questions.question": question })
            if (!findQuestion) return res.status(400).json({ msg: messages.notFound(`Question ${index} for this form`) })
            const findInstructor = await compObjectId(instructor, Users, "Instructor")
            if (!findInstructor.success) return res.status(findInstructor.success) - json({ msg: findInstructor.msg })
        }
        await createMethod(data, null, res, Responses, "Response")

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

//Traer la response de un formulario segun su id
export const getResponseForm = async (req, res) => {
    const { form } = req.params

    const findResponse = await Responses.findOne({ form: form })
    if (!findResponse) return res.status(404).json({ msg: messages.notFound("Form Response") })
    res.json(findResponse)
}

//Traer las repuestas de una response segun el instructor
export const getResponseInstructor = async (req, res) => {
    const { id, instructor } = req.params

    const findForm = await Responses.findOne({ _id: id, "answers.instructor": instructor })
    if (!findForm) return res.status(404).json({ msg: messages.notFound("Answers Instructor") })
    const answers = findForm.answers

    const answersInstructor = []
    for (const answer of answers) {
        const instructorId = answer.instructor.toString()
        if (instructorId === instructor) answersInstructor.push(answer)
    }

    res.json(answersInstructor)
}