import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 4000
export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://giovannylg:root@cluster0.2reoumr.mongodb.net/agro360db?retryWrites=true&w=majority"
export const SECRET_TOKEN = process.env.SECRET_TOKEN || "ultrasecretkey"
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"
export const INSTRUCTOR_IMAGES_ROUTE = process.env.INSTRUCTOR_IMAGES_ROUTE || "src/assets/instructores"

