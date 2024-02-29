import mongoose from 'mongoose'

const responsesSchema = new mongoose.Schema({
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
                type: String,
                trim: true,
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

responsesSchema.index({ "form": 1 })

export default mongoose.model("Responses", responsesSchema)

