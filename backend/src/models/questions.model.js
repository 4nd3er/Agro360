import mongoose from 'mongoose'

const questionsSchema = new mongoose.Schema({
    name: {
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
            name: {
                type: String,
                trim: true,
                required: true
            }
        }
    ]
}, { timestamps: true })

export default mongoose.model("Questions", questionsSchema)

