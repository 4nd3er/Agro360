import errorResponse from "./ErrorResponse.js"
import validObjectId from "./ValidObjectId.js"
import { messages } from "./libs.js"

export const getMethod = async (res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        const findModel = await model.find({})
        if (!findModel.length > 0) res.status(404).json({ msg: messages.notFound(mayusName) })
        res.json(findModel)
    } catch (error) {
        errorResponse(res, error)
    }
}


export const getOneMethod = async (id, res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId(name) })
        const findModel = await model.findById(id)
        if (!findModel) return res.status(404).json({ msg: messages.notFound(mayusName) })

        res.json(findModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const getRelations = async (id, find, res, model, name, searchModel, searchName) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId(name) })

        const findModel = await model.findById(id)
        if (!findModel) return res.status(404).json({ msg: messages.notFound(mayusName) })

        const findSearchModel = await searchModel.find(find)
        if (!findSearchModel.length > 0) return res.status(404).json({ msg: messages.notFound(searchName) })

        res.json(findSearchModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createMethod = async (data, find, res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        const findModel = await model.findOne(find)
        if (findModel) return res.status(400).json({ msg: messages.alreadyExists(mayusName) })

        const newModel = new model(data)
        const saveModel = await newModel.save()
        res.json({
            response: `${mayusName} created successfully`,
            data: saveModel
        })
    } catch (error) {
        errorResponse(res, error)
    }

}

export const updateMethod = async (data, id, find, res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId(name) })

        const findExistsModel = await model.findOne(find)
        if (findExistsModel && findExistsModel._id.toString() !== id) return res.status(400).json({ msg: messages.alreadyExists(mayusName) })

        const findModel = await model.findByIdAndUpdate(id, data, {
            new: true
        })
        if (!findModel) return res.status(404).json({ msg: messages.notFound(mayusName) })

        res.json({
            response: `${mayusName} updated successfully`,
            data: findModel
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const updateMethodList = async (res, reference, data, find, model, names) => {
    
    const id = Object.values(reference)[0]
    const idList = Object.values(reference)[1]

    const name = Object.values(names)[0]
    const nameList = Object.values(names)[1]
    try {
        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId(name) })
        if (!validObjectId(idList)) return res.status(400).json({ msg: messages.invalidId(nameList) })
    
        const findExistsList = await model.findOne(find)
        if (findExistsList && findExistsList._id.toString() !== idList) return res.status(400).json({ msg: messages.alreadyExists(nameList) })
        
        const findModel = await model.findOneAndUpdate(reference, data, {
            new: true
        })
        if (!findModel) return res.status(404).json({ msg: messages.notFound(name) })

        res.json({
            response: `${nameList} updated successfully`,
            data: findModel
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const deleteMethod = async (id, res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        if (!validObjectId(id)) return res.status(400).json({ msg: messages.invalidId(name) })

        const findModel = await model.findByIdAndDelete(id)
        if (!findModel) return res.status(404).json({ msg: messages.notFound(mayusName) })

        res.json({
            response: `${mayusName} deleted successfully`,
            data: findModel
        })
    } catch (error) {
        errorResponse(res, error)
    }
}