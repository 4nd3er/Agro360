import mongoose from "mongoose"
import { Roles, Topics } from "../models/models.js"

export const topics = async (req, res) => {

}

export const getTopic = async (req, res) => {

}

export const createTopic = async (req, res) => {

    const { name, role } = req.body

    try {

        const objectIdString = mongoose.Types.ObjectId.isValid(role)
        if (!objectIdString) return res.status(400).json({ msg: 'Invalid role id' })
        const objectId = new mongoose.Types.ObjectId(role)

        const findRol = await Roles.findById(objectId)
        if (!findRol) return res.status(400).json({ msg: 'Role not found' })

        const newTopic = new Topics({ name: name, role: objectId })
        const savedTopic = await newTopic.save()

        res.json({
            response: "Topic created successfully",
            data: savedTopic
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }

}

export const updateTopic = async (req, res) => {

}

export const deleteTopic = async (req, res) => {

}