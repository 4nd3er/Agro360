import Router from 'express'
import { validateTokenCookie, validate } from '../middlewares/middlewares.js'
import { createCurseName, cursesNames, deleteCurseName, getCurseName, updateCurseName } from '../controllers/curses.controller.js'
import { cursesNamesValidator } from '../validators/curses.validators.js'

const router = Router()


// *Curses names
router.route("/curses/cursenames")
    .all(validateTokenCookie)
    .get(cursesNames)
    .post(validate(cursesNamesValidator), createCurseName)

router.route("/curses/cursenames/:id")
    .all(validateTokenCookie)
    .get(getCurseName)
    .put(validate(cursesNamesValidator), updateCurseName)
    .delete(deleteCurseName)

// *Curses

export default router