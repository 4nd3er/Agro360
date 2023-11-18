import { getOneMethod } from "../libs/methods.js"
import { Forms, Users } from "../models/models.js"
import { compObjectId, createToken, generateCode, sendEmailFormCode } from '../libs/libs.js'

export const compForm = async (req, res, next) => {
    const { id } = req.params
    const findForm = await compObjectId(id, Forms, "Form")
    if (!findForm.success) return res.status(findForm.status).json({ msg: findForm.msg })
    next();
}

export const getCode = async (req, res) => {
    const { email } = req.body
    const data = { email }

    const user = Users.findOne({ email })
    if (!user) return res.status(404).json({ msg: "User not found" })

    const code = generateCode(6);
    req.user = { id: user._id, email: email, code: code }
    sendEmailFormCode(res, email, data, code)
}

export const compCode = async (req, res) => {

    const { code } = req.body
    if (req.user.code !== code) return res.status(401).json({ msg: "The code is incorrect" })
    const user = Users.findById(req.user.id)


    res.json({
        response: "Code comprobate successfully",
        data: {
            code: req.user.code,
            user: `${user.names} ${user.lastnames}`,            
        }
    })
}