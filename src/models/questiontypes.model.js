import mongoose from 'mongoose'

const questionTypesSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true })

export default mongoose.model("QuestionTypes", questionTypesSchema)

