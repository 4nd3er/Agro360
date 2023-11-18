import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { authRoutes, formsRoutes, responseRoutes, rolesRoutes, topicsRoutes } from './routes/routes.js'

const app = express()

dotenv.config({ path: './src/.env' });
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173"
}));

app.use((req, res, next) => {
    req.user = { id: ""}
    req.user.id = "6558108f93b71558f6e4631a"
    next();
})
app.use("/api", authRoutes)
app.use("/api", rolesRoutes)
app.use("/api", topicsRoutes)
app.use("/api", formsRoutes)
app.use("/api", responseRoutes)

export default app