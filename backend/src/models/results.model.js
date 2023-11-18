import mongoose from 'mongoose'

const resultsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    form: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Forms',
        required: true
    },
    answers: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Questions',
                required: true
            },
            instructor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                required: true
            },
            answer: {
                type: String,
                trim: true,
                required: true
            }
        }
    ]
}, { timestamps: true })

export default mongoose.model("Results", resultsSchema)

