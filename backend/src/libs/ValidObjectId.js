import mongoose from "mongoose";

export default function validObjectId(id){

    const objectId = mongoose.isValidObjectId(id)
    
    return objectId
}