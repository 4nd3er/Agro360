import { errorResponse, validObjectId, messages } from "../libs/libs.js"
import mongoose from "mongoose"
import { Roles, Topics } from "../models/models.js"


export const topics = async (req, res) => {

    try {
        const topics = await Topics.find({})
        if (!topics) return res.status(404).json({ msg: messages.notFound("Topics") })

        res.json(topics)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const getTopic = async (req, res) => {

    const { id } = req.params

    try {

        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId("topic or role") })
        const topic = await Topics.find({
            $or: [
                { _id: id },
                { role: id },
            ],
        })
        if (!topic) res.status(404).json({ msg: messages.notFound("Topic or role") })

        res.json(topic)
    } catch (error) {
        errorResponse(res, error)
    }

}

export const createTopic = async (req, res) => {

    const { name, role } = req.body

    try {

        if (!validObjectId(role)) return res.status(400).json({ msg: messages.invalidId("role") })
        const objectId = new mongoose.Types.ObjectId(role)

        const findRol = await Roles.findById(objectId)
        if (!findRol) return res.status(404).json({ msg: messages.notFound("Role") })

        const newTopic = new Topics({ name: name, role: findRol.id })
        const savedTopic = await newTopic.save()

        res.json({
            response: "Topic created successfully",
            data: savedTopic
        })

    } catch (error) {
        errorResponse(res, error)
    }

}

export const updateTopic = async (req, res) => {

    const { id } = req.params
    const { name, role } = req.body

    try {

        if (!validObjectId(role)) return res.status(400).json({ msg: messages.invalidId("role") })

        const findRole = await Roles.findById(role)
        if (!findRole) return res.status(404).json({ msg: messages.notFound("Role") })

        const findTopic = await Topics.findByIdAndUpdate(id, { name: name, role: role }, {
            new: true
        })
        if (!findTopic) return res.status(404).json({ msg: messages.notFound("Topic") })

        res.json({
            response: "Topic updated successfully",
            data: findTopic
        })
    } catch (error) {
        errorResponse(res, error)
    }

}

export const deleteTopic = async (req, res) => {

    const { id } = req.params

    try {

        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId("topic") })

        const findTopic = await Topics.findByIdAndDelete(id)
        if (!findTopic) return res.status(404).json({ msg: messages.notFound("Topic") })

        res.json({
            response: "Topic deleted successfully",
            data: findTopic
        })

    } catch (error) {
        errorResponse(res, error)
    }

}