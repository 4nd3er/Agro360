import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { formValidator, questionValidator, questionTypeValidator } from '../validators/form.validators.js';
import { createForm, createQuestionType, deleteQuestionType, forms, getQuestionType, questionTypes, updateQuestionType } from '../controllers/form.controller.js'

const router = Router()

router.route("/forms")
    .all(validateTokenCookie)
    .get(forms)
    .post(createForm)

router.route("/forms/questions")
    .all(validateTokenCookie)

router.route("/forms/questions/questiontypes")
    .all(validateTokenCookie)
    .get(questionTypes)
    .post(validate(questionTypeValidator), createQuestionType)

router.route("/forms/questions/questiontypes/:id")
    .all(validateTokenCookie)
    .get(getQuestionType)
    .put(validate(questionTypeValidator), updateQuestionType)
    .delete(deleteQuestionType)

export default router