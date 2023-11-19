import Router from 'express'
import { validateTokenCookie, validate } from '../middlewares/middlewares.js'
import { createCurse, createCurseName, curses, cursesNames, deleteCurse, deleteCurseName, getCurse, getCurseName, updateCurse, updateCurseName } from '../controllers/curses.controller.js'
import { cursesNamesValidator, cursesValidator } from '../validators/curses.validators.js'

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
router.route("/curses")
    .all(validateTokenCookie)
    .get(curses)
    .post(validate(cursesValidator), createCurse)

router.route("/curses/:id")
    .all(validateTokenCookie)
    .get(getCurse)
    .put(validate(cursesValidator), updateCurse)
    .delete(deleteCurse)

export default router