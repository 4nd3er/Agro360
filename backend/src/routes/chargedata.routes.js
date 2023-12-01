import Router from 'express'
import multer from 'multer'
import { validateTokenCookie } from '../middlewares/middlewares.js'
import { createCourses, createCronograms, createInstructors } from '../controllers/chargedata.controller.js';

const router = Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

router.route("/charge-data/courses")
    .all(validateTokenCookie)
    .post(upload.array('courses'), createCourses)

router.route("/charge-data/cronograms")
    .all(validateTokenCookie)
    .post(upload.array('cronograms'), createCronograms)

router.route("/charge-data/instructors")
    .all(validateTokenCookie)
    .post(upload.array('instructors'), createInstructors)

export default router