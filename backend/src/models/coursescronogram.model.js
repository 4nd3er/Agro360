import mongoose from 'mongoose';

const courseCronogramSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    },
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }]
}, { timestamps: true })

export default mongoose.model("CoursesCronogram", courseCronogramSchema)