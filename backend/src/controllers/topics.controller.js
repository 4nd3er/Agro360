import { Topics } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from "../libs/methods.js"


export const topics = async (req, res) => {

    getMethod(res, Topics, "Topics")
}

export const getTopic = async (req, res) => {

    const { id } = req.params
    getOneMethod(id, res, Topics, "Topic")
}

export const createTopic = async (req, res) => {

    const { name, role } = req.body
    const data = { name, role }
    const find = { name }
    createMethod(data, find, res, Topics, "Topic")
}

export const updateTopic = async (req, res) => {

    const { id } = req.params
    const { name, role } = req.body
    const data = { name, role }
    const find = { name }
    updateMethod(data, id, find, res, Topics, "Topic")
}

export const deleteTopic = async (req, res) => {

    const { id } = req.params
    deleteMethod(id, res, Topics, "Topic")
}