import Router from 'express'
import { validateTokenCookie, validate } from '../middlewares/middlewares.js'
import { createCourse, createCourseName, courses, coursesNames, deleteCourse, deleteCourseName, getCourse, getCourseName, updateCourse, updateCourseName } from '../controllers/courses.controller.js'
import { coursesNamesValidator, coursesValidator } from '../validators/courses.validators.js'

const router = Router()

// *Courses names
router.route("/courses/coursenames")
    .all(validateTokenCookie)
    .get(coursesNames)
    .post(validate(coursesNamesValidator), createCourseName)

router.get("/courses/coursenames/:id", getCourseName)
router.route("/courses/coursenames/:id")
    .all(validateTokenCookie)
    .put(validate(coursesNamesValidator), updateCourseName)
    .delete(deleteCourseName)


// *Courses
router.get("/courses", courses)
router.route("/courses")
    .all(validateTokenCookie)
    .post(validate(coursesValidator), createCourse)

router.route("/courses/:id")
    .all(validateTokenCookie)
    .get(getCourse)
    .put(validate(coursesValidator), updateCourse)
    .delete(deleteCourse)

export default router