import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
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

adminSchema.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model("Admin", adminSchema)