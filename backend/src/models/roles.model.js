import mongoose from 'mongoose'

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
    }
}, { timestamps: true })

export default mongoose.model("Roles", rolSchema)

