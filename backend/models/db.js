import mongoose from "mongoose"


    const db = {
        db: "agroforms",
        collections: ["users", "curses", "cursesNames", "topics", "forms", "results", "roles", "questionTypes"]
    }
    
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
    
    
    const curses = ({
        name:{
            type: ObjectId,
            ref: 'cursesNames',
        },
        type:{
            type: String,
            trim: true,
            required: true
        },
        number:{
            type: String,
            trim: true,
            required: true
        },
        time:{
            type: String,
            trim: true,
            required: true
        }
    })
    
    const cursesNames = {
        name:{
            type: String,
            trim: true,
            required: true
        }
    }
    
    const topics = {
        name:{
            type: String,
            trim: true,
            required: true
        }
    }
    
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
    
    const results = {
        user:{
            type: ObjectId,
            ref: 'users',
        },
        form:{
            type: ObjectId,
            ref: 'forms',
        },
        answers:[
            {
                question:{
                    type: ObjectId,
                    ref: 'questions',
                },
                instructor:{
                    type: ObjectId,
                    ref: 'users',
                },
                content:{
                    type: String,
                    trim: true,
                    required: true
                }
            }
        ]
    }
    
    const roles = {
        name:{
            type: String,
            trim: true,
            required: true
        }
    }
    
    const questionTypes = {
        name:{
            type: String,
            trim: true,
            required: true
        }
    } 

const User = mongoose.model("User", db, users, curses, cursesNames, topics, forms, results, roles, questionTypes)

export default User;