import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
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
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Admin", adminSchema)