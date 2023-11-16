import { errorResponse, validObjectId, messages, compObjectId } from "../libs/libs.js"
import { Forms, Topics, Admin, Questions, QuestionTypes } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod, updateMethodList } from "../libs/methods.js"

export const forms = async (req, res) => {

    try {
        const findForms = await Forms.find({})
        if (!findForms.lenght > 0) return res.status(404).json({ msg: messages.notFound("Forms") })
        res.json(findForms)

    } catch (error) {
        errorResponse(res, error)
    }
}

export const getForm = async (req, res) => {

    const { id } = req.params

    try {

        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId("form") })
        const findForm = await Forms.findById(id)
        if (!findForm) return res.status(404).json({ msg: messages.notFound("Form") })

        res.json(findForm)

    } catch (error) {
        errorResponse(res, error)
    }
}

export const createForm = async (req, res) => {

    const { name, description, topic, end, status, questions } = req.body

    try {

        if (!validObjectId(topic)) return res.status(400).json({ msg: messages.invalidId("topic") })

        const findTopic = await Topics.findById(topic)
        if (!findTopic) return res.status(404).json({ msg: messages.notFound("Topic") })


        const newForm = new Forms({ name, description, topic, end, status, creator: req.user.id, questions })
        const savedForm = newForm.save()

        res.json(savedForm)
    } catch (error) {
        errorResponse(res, error)
    }
}



// *Questions
export const questions = async (req, res) => {

    await getMethod(res, Questions, "Questions")
}

export const getQuestion = async (req, res) => {

    const { id } = req.params
    await getOneMethod(id, res, Questions, "Question")
}

export const createQuestion = async (req, res) => {

    const { name, type, options } = req.body
    const data = { name, type, options, creator: req.user.id }
    const find = { name: name }

    await compObjectId(type, res, QuestionTypes, "Type")
    await createMethod(data, find, res, Questions, "Question")
}

export const updateQuestion = async (req, res) => {

    const { id } = req.params
    const { name, type, options } = req.body
    const data = { name, type, options, creator: req.user.id }
    const find = { name: name }

    await compObjectId(type, res, QuestionTypes, "Type")
    await updateMethod(data, id, find, res, Questions, "Question")
}

export const deleteQuestion = async (req, res) => {

    const { id } = req.params
    await deleteMethod(id, res, Questions, "Question")
}

// *Question Options
export const updateQuestionOption = async (req, res) => {
    
    const { id, idoption } = req.params
    const { option } = req.body

    const reference = { _id: id, 'options._id': idoption }
    const data = { 'options.$.option': option }
    const find = { 'options.option': option }
    const names = { model: "Question", list: "Option"}
    
    await updateMethodList(res, reference, data, find, Questions, names)
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