import { Router } from 'express';
import { validate, validateTokenCookie } from '../middlewares/middlewares.js'
import { topicsValidator } from '../validators/topics.validator.js'
import { createTopic, deleteTopic, getTopic, topics, updateTopic } from '../controllers/topics.controller.js'

const router = Router()

router.route("/topics")
    .get(validateTokenCookie, topics)
    .post(validateTokenCookie, validate(topicsValidator), createTopic)

router.route("/topics/:id")
    .get(validateTokenCookie, getTopic)
    .put(validateTokenCookie, validate(topicsValidator), updateTopic)
    .delete(validateTokenCookie, deleteTopic)

export default router