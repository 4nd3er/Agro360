import { Forms, QuestionTypes, Responses, Topics } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from "../libs/methods.js"
import { compObjectId, errorResponse } from "../libs/libs.js"
import { capitalizeString, capitalizeWord, compDuplicate } from '../libs/functions.js'

export const forms = async (req, res) => {
    await getMethod(res, Forms, "Forms")
}

export const getForm = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Forms, "Form")
}

// Obtener los formularios que han tenido una respuesta
export const getFormsResponse = async (req, res) => {
    try {
        const formsResponse = []
        const forms = await Forms.find({})
        for (const [index, form] of forms.entries()) {
            const id = form._id
            const findResponse = await Responses.findOne({ form: id })
            if (findResponse) formsResponse.push(form)
        }
        res.json(formsResponse)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createForm = async (req, res) => {
    const { name, description, topic, end, status, questions } = req.body
    let data = { name, description, topic, end, status, creator: req.user.id, questions }
    const find = { name: name, topic: topic }

    try {
        //*Comprobar el id del topic
        const compTopic = await compObjectId(topic, Topics, "Topic")
        if (!compTopic.success) return res.status(compTopic.status).json({ message: [compTopic.msg] })

        //*Comprobar preguntas duplicadas
        const questionNames = questions.map((question) => question.question)
        if (compDuplicate(questionNames)) return res.status(400).json({ message: ["Exists duplicate questions"] })

        // *Validar tipo de pregunta
        for (const [index, { type }] of questions.entries()) {
            const compQuestionType = await compObjectId(type, QuestionTypes, `Question type [${index}]`)
            if (!compQuestionType.success) {
                res.status(compQuestionType.status).json({ message: [compQuestionType.msg] });
                return;
            }
        }

        //* Capitalizar Questions y Options
        const newQuestions = questions.map(({ question, type, options }) => ({
            question: capitalizeString(question),
            type,
            options: options.map(({ option }) => ({ option: capitalizeString(option) }))
        }))
        data.questions = newQuestions

        await createMethod(data, find, res, Forms, "Form")
    } catch (error) {
        errorResponse(res, error)
    }
}

export const updateForm = async (req, res) => {
    const { id } = req.params
    const { name, description, topic, end, status, questions } = req.body
    const data = { name, description, topic, end, status, creator: req.user.id, questions }
    const find = { name: name, topic: topic }

    try {
        //*Comprobar el id del topic
        const compTopic = await compObjectId(topic, Topics, "Topic")
        if (!compTopic.success) return res.status(compTopic.status).json({ message: [compTopic.msg] })

        //*Comprobar preguntas duplicadas
        const questionNames = questions.map((question) => question.question)
        if (compDuplicate(questionNames)) return res.status(400).json({ message: ["Exists duplicate questions"] })

        // *Validar tipo de pregunta
        for (const [index, { type }] of questions.entries()) {
            const compQuestionType = await compObjectId(type, QuestionTypes, `Question type [${index}]`)
            if (!compQuestionType.success) {
                res.status(compQuestionType.status).json({ message: [compQuestionType.msg] });
                return;
            }
        }

        //* Capitalizar Questions y Options
        const newQuestions = questions.map(({ question, type, options }) => ({
            question: capitalizeString(question),
            type,
            options: options.map(({ option }) => ({ option: capitalizeString(option) }))
        }))
        data.questions = newQuestions

        await updateMethod(data, id, find, res, Forms, "Form")
    } catch (error) {
        errorResponse(res, error)
    }
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
    const data = { name, creator: req.user.id }
    const find = { name: name }
    await createMethod(data, find, res, QuestionTypes, "Question type")
}

export const updateQuestionType = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const data = { name, creator: req.user.id }
    const find = { name: name }
    await updateMethod(data, id, find, res, QuestionTypes, "Question Type")
}

export const deleteQuestionType = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, QuestionTypes, "Question type")
}