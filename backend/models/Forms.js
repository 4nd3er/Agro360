import mongoose from 'mongoose'
const forms = {
    name:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        trim: true,
        required: true
    },
    end:{
        type: Date,
        trim: true,
        required: true
    },
    status:{
        type: Boolean,
        trim: true,
        required: true
    },
    topic:{
        type: ObjectId,
        ref: 'topics',
    },
    questions:[
        {
            name:{
                type: String,
                trim: true,
                required: true
            },
            type:{
                type: ObjectId,
                ref: 'questionTypes',
            },
            options:[
                {
                    name:{
                        type: String,
                        trim: true,
                        required: false
                    }
                }
            ]

        }
    ]
}

const Forms = mongoose.model('Forms', forms)
export default Forms;