import mongoose from 'mongoose'

const curses = ({
    name:{
        type: ObjectId,
        ref: 'cursesNames',
    },
    type:{
        type: String,
        trim: true,
        required: true
    },
    number:{
        type: String,
        trim: true,
        required: true
    },
    time:{
        type: String,
        trim: true,
        required: true
    }
})

const Curses = mongoose.model("Curses", curses)
 
export default Curses;