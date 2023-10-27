import mongoose from 'mongoose'

const cursesNamesSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
}, { timestamps: true })

export default mongoose.model("CursesNames", cursesNamesSchema)

