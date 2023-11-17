import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { formValidator, questionValidator, questionTypeValidator } from '../validators/form.validators.js';
import { createForm, createQuestionType, deleteForm, deleteQuestionType, forms, getForm, getQuestionType, questionTypes, updateForm, updateQuestionType } from '../controllers/form.controller.js'

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
router.route("/forms/questions/:id")

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