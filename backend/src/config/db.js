import mongoose from 'mongoose'

async function connectDB(){

    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const url = `${db.connection.host}:${db.connection.port}`
        console.log("MongoDB is running in: " + url);
        
    } catch(error){
        console.log("Connection with DB failed: " + error);
    }
}

export default connectDB