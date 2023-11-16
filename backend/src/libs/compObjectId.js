import mongoose from "mongoose"
import errorResponse from "./ErrorResponse.js";
import { messages } from "./libs.js";

export default async function compObjectId(id, res, model, name) {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    let result = {}

    try {
        const objectId = mongoose.isValidObjectId(id)
        if (!objectId) return result = { success: false, status: 400, msg: messages.invalidId(name) }
        const findModel = await model.findById(id)
        if (!findModel) return result = { success: false, status: 404, msg: messages.notFound(mayusName) }

        return true
    } catch (error) {
        errorResponse(res, error)
    }    
}