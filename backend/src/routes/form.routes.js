import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { formValidator, questionValidator, questionTypeValidator } from '../validators/form.validators.js';
import { createForm, createQuestion, createQuestionType, deleteForm, deleteQuestion, deleteQuestionType, forms, getForm, getQuestion, getQuestionType, questionTypes, questions, updateForm, updateQuestion, updateQuestionType } from '../controllers/form.controller.js'

const router = Router()

// *Question Types
router.route("/forms/questions/questiontypes")
    .all(validateTokenCookie)
    .get(questionTypes)
    .post(validate(questionTypeValidator), createQuestionType)

router.route("/forms/questions/questiontypes/:id")
    .all(validateTokenCookie)
    .get(getQuestionType)
    .put(validate(questionTypeValidator), updateQuestionType)
    .delete(deleteQuestionType)

// *Questions
router.route("/forms/questions")
    .all(validateTokenCookie)
    .get(questions)
    .post(validate(questionValidator), createQuestion)

router.route("/forms/questions/:id")
    .all(validateTokenCookie)
    .get(getQuestion)
    .put(validate(questionValidator), updateQuestion)
    .delete(deleteQuestion)

// *Forms
router.route("/forms")
    .all(validateTokenCookie)
    .get(forms)
    .post(validate(formValidator), createForm)

router.route("/forms/:id")
    .all(validateTokenCookie)
    .get(getForm)
    .put(validate(formValidator), updateForm)
    .delete(deleteForm)


export default router