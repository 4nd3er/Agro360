import { errorResponse, validObjectId, messages } from "../libs/libs.js"
import mongoose from "mongoose"
import { Forms, Topics, Admin, Questions, QuestionTypes } from "../models/models.js"

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



export const questions = async (req, res) => {

    try {
        const findQuestions = await Questions.find({})
        if (!findQuestions.length > 0) return res.status(404).json({ msg: messages.notFound("Questions") })

        res.json(findQuestions)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createQuestion = async (req, res) => {

    const { name, type, option } = req.body

    try {

    } catch (error) {
        errorResponse(res, error)
    }

}

export const questionTypes = async (req, res) => {

    try {
        const findQuestionTypes = await QuestionTypes.find({})
        if (!findQuestionTypes.length > 0) res.status(404).json({ msg: messages.notFound("Question Types") })
        res.json(findQuestionTypes)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const getQuestionType = async (req, res) => {

    const { id } = req.params

    try {
        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId("question type") })
        const findQuestionType = await QuestionTypes.findById(id)

        res.json(findQuestionType)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createQuestionType = async (req, res) => {

    const { name } = req.body

    try {
        const newQuestionType = new QuestionTypes({ name })
        const saveQuestionType = await newQuestionType.save()
        res.json({
            response: "Question Type created successfully",
            data: saveQuestionType
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const updateQuestionType = async (req, res) => {

    const { id } = req.params
    const { name } = req.body

    try {

        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId("question type") })

        const findQuestionType = await QuestionTypes.findByIdAndUpdate(id, { name }, {
            new: true
        })
        if (!findQuestionType) return res.status(404).json({ msg: messages.notFound("Question type") })

        res.json({
            response: "Question type updated successfully",
            data: findQuestionType
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const deleteQuestionType = async (req, res) => {

    const { id } = req.params

    try {
        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId("question type") })

        const findQuestionType = await QuestionTypes.findByIdAndDelete(id)
        if (!findQuestionType) return res.status(404).json({ msg: messages.notFound("Question type") })

        res.json({
            response: "Question type deleted successfully",
            data: findQuestionType
        })
    } catch (error) {
        errorResponse(res, error)
    }
}