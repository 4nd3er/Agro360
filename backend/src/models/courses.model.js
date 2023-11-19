import mongoose from 'mongoose'

const coursesSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoursesNames',
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
    }
}, { timestamps: true })

export default mongoose.model("Courses", coursesSchema)

