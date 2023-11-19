import Router from 'express';
import { validate, validateTokenParam } from '../middlewares/middlewares.js';
import { emailValidator } from '../validators/response.validator.js';
import { compCode, compForm, compFormCookie, createResponse, getCode, getForm } from '../controllers/response.controller.js'

const router = Router()

// *Response
router.route("/forms/v/:id")
    .all(compForm)
    .get(validate(emailValidator, "query"), getCode)
    .post(compCode)

router.route("/forms/r/:id")
    .all(compFormCookie)
    .get(getForm)
    .post(createResponse)


export default router