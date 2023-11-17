import { compObjectId } from "../libs/libs.js"
import { Forms, QuestionTypes, Topics } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from "../libs/methods.js"

// *Forms
export const forms = async (req, res) => {

    await getMethod(res, Forms, "Forms")
}

export const getForm = async (req, res) => {

    const { id } = req.params
    await getOneMethod(id, res, Forms, "Form")
}

export const createForm = async (req, res) => {

    const { name, description, topic, end, status, questions } = req.body
    const data = { name, description, topic, end, status, creator: req.user.id, questions }
    const find = { name }

    const compTopic = await compObjectId(topic, Topics, "Topic")
    if (!compTopic.success) return res.status(compTopic.status).json({ msg: compTopic.msg })

    console.log(questions);

    res.json({ msg: "ok"})
    //await createMethod(data, find, res, Forms, "Form")
}

export const updateForm = async (req, res) => {

    const { id } = req.params
    const { name, description, topic, end, status, questions } = req.body
    const data = { name, description, topic, end, status, creator: req.user.id, questions }
    const find = { name }

    const compTopic = await compObjectId(topic, Topics, "Topic")
    if (!compTopic.success) return res.status(compTopic.status).json({ msg: compTopic.msg })
    await updateMethod(data, id, find, res, Forms, "Form")
}

export const deleteForm = async (req, res) => {

    const { id } = req.params
    await deleteMethod(id, res, Forms, "Form")
}

// *Question Types

export const questionTypes = async (req, res) => {

    await getMethod(res, QuestionTypes, "Question types")
}

export const getQuestionType = async (req, res) => {

    const { id } = req.params
    await getOneMethod(id, res, QuestionTypes, "Question type")
}

export const createQuestionType = async (req, res) => {

    const { name } = req.body
    const data = { name, creator: creator }
    const find = { name: name }
    await createMethod(data, find, res, QuestionTypes, "Question type")
}

export const updateQuestionType = async (req, res) => {

    const { id } = req.params
    const { name } = req.body
    const data = { name, creator: creator }
    const find = { name: name }
    await updateMethod(data, id, find, res, QuestionTypes, "Question Type")
}

export const deleteQuestionType = async (req, res) => {

    const { id } = req.params
    await deleteMethod(id, res, QuestionTypes, "Question type")
}