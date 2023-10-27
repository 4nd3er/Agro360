import mongoose from 'mongoose'
const results = {
    user:{
        type: ObjectId,
        ref: 'users',
    },
    form:{
        type: ObjectId,
        ref: 'forms',
    },
    answers:[
        {
            question:{
                type: ObjectId,
                ref: 'questions',
            },
            instructor:{
                type: ObjectId,
                ref: 'users',
            },
            content:{
                type: String,
                trim: true,
                required: true
            }
        }
    ]
}

const Results = mongoose.model('Results', results)
export default Results;