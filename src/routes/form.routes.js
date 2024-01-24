import { Router } from 'express';
import { validate, validateStatusForm, validateTokenCookie } from '../middlewares/middlewares.js'
import { formValidator, questionTypeValidator } from '../validators/form.validators.js';
import { createForm, createQuestionType, deleteForm, deleteQuestionType, forms, getForm, getFormReport, getFormsResponse, getInstructorsResults, getQuestionType, questionTypes, updateForm, updateQuestionType } from '../controllers/form.controller.js'

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
    .get(validateStatusForm, forms)
    .post(validate(formValidator), createForm)

router.route("/forms/responses")
    .all(validateTokenCookie)
    .get(getFormsResponse)

router.get("/forms/:id", validateStatusForm, getForm)

router.route("/forms/:id")
    .all(validateTokenCookie)
    .put(validate(formValidator), updateForm)
    .delete(deleteForm)

router.get("/forms/:id/report", validateTokenCookie, getFormReport)
router.get("/forms/:id/results", validateTokenCookie, getInstructorsResults)

export default router