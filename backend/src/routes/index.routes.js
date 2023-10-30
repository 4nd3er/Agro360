import { Router } from "express";
import { Home } from '../controllers/index.controller.js'

const router = Router()

router.get("/home", Home)

export default router