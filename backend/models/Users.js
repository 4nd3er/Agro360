import mongoose from 'mongoose'
const users = ({
    names:{
        type: String,
        trim: true,
        required: true
    },
    lastnames:{
        type: String,
        trim: true,
        required: true
    },
    documentType:{
        type: String,
        trim: true,
        required: true
    },
    document:{
        type: String,
        trim: true,
        required: true
    },
    rol:{
        type: ObjectId,
        ref: 'roles',
    },
    email:{
        type: String,
        trim: true,
        required: true
    },
    curse:{
        type: ObjectId,
        ref: 'curses'
    }
})

const Users = mongoose.model("User",users)
export default Users; 