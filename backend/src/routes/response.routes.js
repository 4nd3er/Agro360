import Router from 'express';
import { validate, validateTokenParam } from '../middlewares/middlewares.js';
import { emailValidator } from '../validators/response.validator.js';
import { compCode, compForm, getCode } from '../controllers/response.controller.js'

const router = Router()

// *Response
router.route("/response/:id")
    .all(compForm)
    .get(validate(emailValidator, "query"), getCode)
    .post(compCode)

router.route("/response/:id/verifycode")
    .all(compForm)

export default router