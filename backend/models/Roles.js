import mongoose from 'mongoose'
const roles = {
    name:{
        type: String,
        trim: true,
        required: true
    }
}

const Roles = mongoose.model('Roles',roles)
export default Roles;