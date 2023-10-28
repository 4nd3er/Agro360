import mongoose from 'mongoose'
const questionTypes = {
    name:{
        type: String,
        trim: true,
        required: true
    }
} 

const QuestionTypes = mongoose.model('QuestionTypes',questionTypes)
export default QuestionTypes;