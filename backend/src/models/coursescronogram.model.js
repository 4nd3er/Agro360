import mongoose from 'mongoose';

const courseCronogramSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    },
    start: {
        type: Date,
        required: true,
        default: Date.now()
    },
    end: {
        type: Date,
        required: true,
        default: Date.now()
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, { timestamps: true })

export default mongoose.model("CoursesCronogram", courseCronogramSchema)