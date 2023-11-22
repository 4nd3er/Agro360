import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { nameMayusName } from './functions.js'
import { SECRET_TOKEN } from '../config/config.js'
import * as messages from './messages.js'
////
export { sendEmailResetPassword, sendEmailFormCode } from './nodemailer.js'
export * as messages from './messages.js'

//* Respuesta para try/catch
export function errorResponse(res, error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
}

//* Comprobar un ObjectId segun un modelo
export async function compObjectId(id, model, name) {
    const [lowerName, mayusName] = nameMayusName(name)
    let result = {
        success: true, status: 200, msg: ""
    }
    try {
        const objectId = mongoose.isValidObjectId(id)
        if (!objectId) return result = { success: false, status: 400, msg: messages.invalidId(lowerName) }
        const findModel = await model.findById(id)
        if (!findModel) return result = { success: false, status: 404, msg: messages.notFound(mayusName) }
        return result
    } catch (error) {
        console.error(error)
    }
}

//*Validar un ObjectId
export function validObjectId(id) {
    const objectId = mongoose.isValidObjectId(id)
    return objectId
}

//*Crear Token
export function createToken(data) {
    const { id } = data
    const create = new Promise((resolve, reject) => {
        jwt.sign(
            { id: id },
            SECRET_TOKEN,
            {
                expiresIn: "30d"
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        )
    })
    return create
}