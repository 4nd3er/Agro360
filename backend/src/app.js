import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import { authRoutes, formsRoutes, indexRoutes, rolesRoutes, topicsRoutes } from './routes/routes.js'

const app = express()

dotenv.config({ path: './src/.env'});
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use("/api", authRoutes)
app.use("/api", indexRoutes)
app.use("/api", rolesRoutes)
app.use("/api", topicsRoutes)
app.use("/api", formsRoutes)

export default app