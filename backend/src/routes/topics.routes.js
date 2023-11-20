import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { topicsValidator } from '../validators/topics.validator.js'
import { createTopic, deleteTopic, getTopic, getTopicForms, topics, updateTopic } from '../controllers/topics.controller.js'

const router = Router()

router.route("/topics")
    .all(validateTokenCookie)
    .get(topics)
    .post(validate(topicsValidator), createTopic)

router.route("/topics/:id")
    .all(validateTokenCookie)
    .get(getTopic)
    .put(validate(topicsValidator), updateTopic)
    .delete(deleteTopic)

router.get("/topics/:id/forms", getTopicForms)

export default router