import Router from 'express'
import { validateTokenCookie, validate } from '../middlewares/middlewares.js'
import { usersValidator } from '../validators/users.validators.js'
import { users, getUser, createUser, updateUser } from '../controllers/users.controller.js'

const router = Router()

router.route("/users")
    .all(validateTokenCookie)
    .get(users)
    .post(validate(usersValidator), createUser)

router.route("/users/:id")
    .all(validateTokenCookie)
    .get(getUser)
    .put(validate(usersValidator), updateUser)

export default router