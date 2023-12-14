import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { formValidator, questionTypeValidator } from '../validators/form.validators.js';
import { createForm, createQuestionType, deleteForm, deleteQuestionType, forms, getForm, getFormReport, getFormsResponse, getQuestionType, questionTypes, updateForm, updateQuestionType } from '../controllers/form.controller.js'

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

// *Forms
router.route("/forms")
    .all(validateTokenCookie)
    .get(forms)
    .post(validate(formValidator), createForm)

router.route("/forms/responses")
    .all(validateTokenCookie)
    .get(getFormsResponse)

router.get("/forms/:id", getForm)

router.route("/forms/:id")
    .all(validateTokenCookie)
    .put(validate(formValidator), updateForm)
    .delete(deleteForm)

router.get("/forms/:id/report", validateTokenCookie, getFormReport)

export default router