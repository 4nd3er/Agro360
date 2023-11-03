import mongoose from "mongoose"
import errorResponse from "./ErrorResponse.js";
import { messages } from "./libs.js";

export default async function compObjectId(id, res, model, name) {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        const objectId = mongoose.isValidObjectId(id)
        if (!objectId) return res.status(400).json({ msg: messages.invalidId(name) })
        const findModel = await model.findById(id)
        if (!findModel) return res.status(404).json({ msg: messages.notFound(mayusName) })
    } catch (error) {
        errorResponse(res, error)
    }
}