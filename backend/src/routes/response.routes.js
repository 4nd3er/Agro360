import Router from 'express';
import { validate, validateTokenParam } from '../middlewares/middlewares.js';
import { emailValidator } from '../validators/response.validator.js';
import { compForm, getCode } from '../controllers/response.controller.js'

const router = Router()

// *Response
router.route("/response/:id")
    .all(compForm)
    .post(validate(emailValidator), getCode)

router.route("/response/:id/verifycode")
    .all(compForm)

export default router