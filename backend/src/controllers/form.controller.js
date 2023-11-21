import { compObjectId, compDuplicate } from "../libs/libs.js"
import { Forms, QuestionTypes, Responses, Topics } from "../models/models.js"
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from "../libs/methods.js"

// *Forms
export const forms = async (req, res) => {
    await getMethod(res, Forms, "Forms")
}

export const getForm = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Forms, "Form")
}

// Obtener los formularios que han tenido una respuesta
export const getFormsResponse = async (req, res) => {
    const formsResponse = []
    const forms = await Forms.find({})
    for (const [index, form] of forms.entries()) {
        const id = form._id
        const findResponse = await Responses.findOne({ form: id })
        if (findResponse) formsResponse.push(form)
    } 
    res.json(formsResponse)
}

export const createForm = async (req, res) => {
    const { name, description, topic, end, status, questions } = req.body
    const data = { name, description, topic, end, status, creator: req.admin.id, questions }
    const find = { name: name, topic: topic }

    // //*Comprobar el id del topic
    // const compTopic = await compObjectId(topic, Topics, "Topic")
    // if (!compTopic.success) return res.status(compTopic.status).json({ msg: compTopic.msg })

    // // *Validaciones a la lista de questions
    // // Comprobar duplicados
    // const questionNames = questions.map((question) => question.question)
    // if (compDuplicate(questionNames)) return res.status(400).json({ msg: "Existing duplicate questions" })

    // //Comprobar ObjectId del type de question
    // for (const [index, question] of questions.entries()) {
    //     const type = question.type
    //     const compQuestionType = await compObjectId(type, QuestionTypes, `Question type [${index}]`)
    //     if (!compQuestionType.success) {
    //         res.status(compQuestionType.status).json({ msg: compQuestionType.msg });
    //         return;
    //     }
    // }
    await createMethod(data, find, res, Forms, "Form")
}

export const updateForm = async (req, res) => {
    const { id } = req.params
    const { name, description, topic, end, status, questions } = req.body
    const data = { name, description, topic, end, status, creator: req.admin.id, questions }
    const find = { name }

    //*Comprobar el id del topic
    const compTopic = await compObjectId(topic, Topics, "Topic")
    if (!compTopic.success) return res.status(compTopic.status).json({ msg: compTopic.msg })

    // *Validaciones a la lista de questions
    // Comprobar duplicados
    const questionNames = questions.map((question) => question.question)
    if (compDuplicate(questionNames)) return res.status(400).json({ msg: "Existing duplicate questions" })

    //Comprobar ObjectId del type de question
    for (const [index, question] of questions.entries()) {
        const type = question.type
        const compQuestionType = await compObjectId(type, QuestionTypes, `Question type [${index}]`)
        if (!compQuestionType.success) {
            res.status(compQuestionType.status).json({ msg: compQuestionType.msg });
            return;
        }
    }
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
    const data = { name, creator: req.admin.id }
    const find = { name: name }
    await createMethod(data, find, res, QuestionTypes, "Question type")
}

export const updateQuestionType = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const data = { name, creator: req.admin.id }
    const find = { name: name }
    await updateMethod(data, id, find, res, QuestionTypes, "Question Type")
}

export const deleteQuestionType = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, QuestionTypes, "Question type")
}