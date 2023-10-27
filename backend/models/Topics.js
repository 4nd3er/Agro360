import mongoose from 'mongoose'
const topics = {
    name:{
        type: String,
        trim: true,
        required: true
    }
}

const Topics = mongoose.model('Topics', topics)
export default Topics;