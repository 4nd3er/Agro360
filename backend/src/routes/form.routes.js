import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { formValidator, questionValidator, questionTypeValidator } from '../validators/form.validators.js';
import { createForm, createQuestion, createQuestionType, deleteQuestion, deleteQuestionType, forms, getQuestion, getQuestionType, questionTypes, questions, updateQuestion, updateQuestionOption, updateQuestionType } from '../controllers/form.controller.js'

const router = Router()

router.route("/forms")
    .all(validateTokenCookie)
    .get(forms)
    .post(createForm)


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

// *Question Options
router.route("/forms/questions/:id/options/:idoption")
    .all(validateTokenCookie)
    .put(updateQuestionOption)

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

export default router