import { Forms, Roles, Topics } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, getRelations, updateMethod } from "../libs/methods.js"
import { errorResponse, compObjectId } from "../libs/libs.js"

export const topics = async (req, res) => {
    getMethod(res, Topics, "Topics")
}

export const getTopic = async (req, res) => {
    const { id } = req.params
    getOneMethod(id, res, Topics, "Topic")
}

export const getTopicForms = async (req, res) => {
    const { id } = req.params
    const find = { topic: id }
    await getRelations(id, find, res, Topics, "Topic", Forms, "Form")
}

export const createTopic = async (req, res) => {
    const { name, role } = req.body
    const data = { name, role, creator: req.user.id }
    const find = { name }
    try {
        const compRol = await compObjectId(role, Roles, "Role")
        if (!compRol.success) return res.status(compRol.status).json({ message: [compRol.msg] })
        await createMethod(data, find, res, Topics, "Topic", "capitalize")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const updateTopic = async (req, res) => {
    const { id } = req.params
    const { name, role } = req.body
    const data = { name, role, creator: req.user.id }
    const find = { name }
    try {
        const compRol = await compObjectId(role, Roles, "Role")
        if (!compRol.success) return res.status(compRol.status).json({ message: [compRol.msg] })
        await updateMethod(data, id, find, res, Topics, "Topic", "capitalize")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const deleteTopic = async (req, res) => {
    const { id } = req.params
    deleteMethod(id, res, Topics, "Topic")
}