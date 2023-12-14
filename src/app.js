import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { FRONTEND_URL } from './config/config.js'
import { authRoutes, chargeDataRoutes, coursesRoutes, formsRoutes, responseRoutes, rolesRoutes, topicsRoutes, usersRoutes } from './routes/routes.js'

const app = express()

//* Dependencies
dotenv.config({ path: "./.env" })
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    credentials: true,
    origin: FRONTEND_URL,
}));
console.log(process.env.PORT)
//* Routes
app.use("/api", authRoutes)
app.use("/api", usersRoutes)
app.use("/api", coursesRoutes)
app.use("/api", rolesRoutes)
app.use("/api", topicsRoutes)
app.use("/api", formsRoutes)
app.use("/api", responseRoutes)
app.use("/api", chargeDataRoutes)

export default app