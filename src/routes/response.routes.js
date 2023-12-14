import Router from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js';
import { emailValidator, responseValidator } from '../validators/response.validator.js';
import { compCode, compForm, compFormCookie, createResponse, getCode, getFormtoResponse, getResponse, getResponseForm, getResponseInstructor, responses } from '../controllers/response.controller.js'

const router = Router()

// *Response
router.route("/forms/v/:form")
    .all(compForm)
    .get(validate(emailValidator, "query"), getCode)
    .post(compCode)

router.route("/forms/r/:form")
    .all(compFormCookie)
    .get(getFormtoResponse)
    .post(validate(responseValidator), createResponse)


// *Show Responses
router.route("/responses")
    .all(validateTokenCookie)
    .get(responses)

router.route("/responses/:form")
    .all(validateTokenCookie)
    .get(getResponseForm)

router.route("/responses/:id")
    .all(validateTokenCookie)
    .get(getResponse)

router.route("/responses/:id/:instructor")
    .all(validateTokenCookie)
    .get(getResponseInstructor)


export default router