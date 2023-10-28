import mongoose from 'mongoose'

const cursesNames = {
    name:{
        type: String,
        trim: true,
        required: true
    }
}

const CursesNames = mongoose.model('CursesNames', cursesNames)
export default CursesNames;