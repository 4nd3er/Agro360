import Router from 'express'
import { validateTokenCookie, validate } from '../middlewares/middlewares.js'
import { usersValidator } from '../validators/users.validators.js'
import { users, getUser, createUser, updateUser } from '../controllers/users.controller.js'

const router = Router()

router.route("/users")
    .get(validateTokenCookie, users)
    .post(validate(usersValidator), createUser)

router.route("/users/:id")
    .get(validateTokenCookie, getUser)
    .put(validate(usersValidator), updateUser)

export default router