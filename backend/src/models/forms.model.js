import mongoose from 'mongoose'

const formsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topics',
        required: true
    },
    end: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Questions'
        }
    ]
}, { timestamps: true })

export default mongoose.model("Forms", formsSchema)

