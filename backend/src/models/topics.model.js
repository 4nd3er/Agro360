import mongoose from 'mongoose'

const topicsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles",
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Topics", topicsSchema)

