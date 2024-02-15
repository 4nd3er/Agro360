import mongoose from 'mongoose'
import { MONGO_URI } from './config.js'

async function connectDB() {
    try {
        const db = await mongoose.connect(MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log("MongoDB is running in: " + url);
    } catch (error) {
        console.log("Connection with DB failed - " + error);
    }
}

export default connectDB