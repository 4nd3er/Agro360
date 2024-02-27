import mongoose from "mongoose";

const instructorTeamsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }
}, { timestamps: true })

export default mongoose.model("InstructorTeams", instructorTeamsSchema)