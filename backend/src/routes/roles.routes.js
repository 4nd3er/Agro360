import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { roleValidator } from '../validators/roles.validators.js'
import { Rols, createRole, deleteRole, getRole, updateRole } from '../controllers/roles.controller.js'

const router = Router()

router.route("/roles")
    .get(validateTokenCookie, Rols)
    .post(validateTokenCookie, validate(roleValidator), createRole)

router.route("/roles/:id")
    .get(validateTokenCookie, getRole)
    .put(validateTokenCookie, validate(roleValidator), updateRole)
    .delete(validateTokenCookie, deleteRole)

export default router