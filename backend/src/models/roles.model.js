import mongoose from 'mongoose'
import { Topics } from './models.js';

const rolSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: false
    }
}, { timestamps: true })

export default mongoose.model("Roles", rolSchema)

