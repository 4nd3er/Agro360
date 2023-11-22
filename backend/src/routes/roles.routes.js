import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { roleValidator } from '../validators/roles.validators.js'
import { roles, createRole, deleteRole, getRole, getRoleTopics, updateRole } from '../controllers/roles.controller.js'

const router = Router()

router.route("/roles")
    .all(validateTokenCookie)
    .get(roles)
    .post(validate(roleValidator), createRole)

router.route("/roles/:id")
    .all(validateTokenCookie)
    .get(getRole)
    .put(validate(roleValidator), updateRole)
    .delete(deleteRole)

router.get("/roles/:id/topics", validateTokenCookie, getRoleTopics)

export default router