import mongoose from 'mongoose'

const cursesSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CursesNames',
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    number: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    end: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true })

export default mongoose.model("Curses", cursesSchema)

