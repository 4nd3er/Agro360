import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    names: {
        type: String,
        trim: true,
        required: true
    },
    lastnames: {
        type: String,
        trim: true,
        required: true
    },
    documentType: {
        type: String,
        trim: true,
        required: true
    },
    document: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
        required: false
    }
}, { timestamps: true })

export default mongoose.model("Users", usersSchema)

