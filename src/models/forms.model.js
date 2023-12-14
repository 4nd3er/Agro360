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
        required: false,
        default: new Date()
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
            question: {
                type: String,
                trim: true,
                required: true
            },
            type: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'QuestionTypes',
                required: true
            },
            options: [
                {
                    option: {
                        type: String,
                        trim: true,
                        required: false
                    }
                }
            ]
        }
    ]
}, { timestamps: true })

export default mongoose.model("Forms", formsSchema)

