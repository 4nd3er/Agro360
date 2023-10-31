import mongoose from 'mongoose'

const questionsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
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
}, { timestamps: true })

export default mongoose.model("Questions", questionsSchema)

