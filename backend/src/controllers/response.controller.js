import { createMethod, getOneMethod } from "../libs/methods.js"
import { Forms, Users } from "../models/models.js"
import { compObjectId, createToken, errorResponse, generateCode, sendEmailFormCode } from '../libs/libs.js'
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
    const { id } = req.params
    const user = req.cookies.user
    const { idUser, email, sessionCode, userCode } = user

    try {
        //Si no se ha definido un codigo
        if (!sessionCode) return res.status(401).json({ msg: "Code not defined, get your code" })
        if (!userCode) return res.status(401).json({ msg: "You have not entered any code" })
        if (!await bcrypt.compare(userCode, sessionCode)) return res.status(401).json({ msg: "The code is incorrect" })

        const findForm = await compObjectId(id, Forms, "Form")
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
        res.cookie("user", data, { maxAge: 900000, httpOnly: true })

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
        res.cookie("user", user, { maxAge: 900000, httpOnly: true })

        const findUser = await Users.findById(id)
        res.json({
            response: "Code comprobate successfully",
            data: {
                code: code,
                user: `${findUser.names} ${findUser.lastnames}`,
                userCode: code
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

// *Recibir formulario
export const getForm = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Forms, "Form")
}

export const createResponse = async (req, res) => {
    const { id } = req.params
    const user = req.cookies.user
    const { answers } = req.body
    const data = { user: user.id, form: id, answers}

    //await createMethod(data, null, res, model, "Response")
}