import { messages, errorResponse, validObjectId } from './libs.js'
import { nameMayusName, capitalizeObject } from './functions.js'

//* Obtener todos los documentos de una coleccion
export const getMethod = async (res, model, name) => {
    const [lowerName, mayusName] = nameMayusName(name)
    try {
        const findModel = await model.find({})
        if (!findModel.length > 0) return res.status(404).json({ message: [messages.notFound(mayusName)] })
        res.json(findModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Obtener un documento segun el :id
export const getOneMethod = async (id, res, model, name) => {
    const [lowerName, mayusName] = nameMayusName(name)
    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(lowerName)] })
        const findModel = await model.findById(id)
        if (!findModel) return res.status(404).json({ message: [messages.notFound(mayusName)] })
        res.json(findModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Crear un documento
export const createMethod = async (data, find, res, model, name, capitalize) => {
    const [lowerName, mayusName] = nameMayusName(name)
    capitalizeObject(data, find, capitalize)
    try {
        const findModel = await model.findOne(find)
        if (findModel) return res.status(400).json({ message: [messages.alreadyExists(mayusName)] })
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

//* Actualizar un documento
export const updateMethod = async (data, id, find, res, model, name, capitalize) => {
    const [lowerName, mayusName] = nameMayusName(name)
    capitalizeObject(data, find, capitalize)
    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(lowerName)] })
        const findExistsModel = await model.findOne(find)
        if (findExistsModel && findExistsModel._id.toString() !== id) return res.status(400).json({ message: [messages.alreadyExists(mayusName)] })
        const findModel = await model.findByIdAndUpdate(id, data, {
            new: true
        })
        if (!findModel) return res.status(404).json({ message: [messages.notFound(mayusName)] })
        res.json({
            response: `${mayusName} updated successfully`,
            data: findModel
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Eliminar un documento
export const deleteMethod = async (id, res, model, name) => {
    const [lowerName, mayusName] = nameMayusName(name)
    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(lowerName)] })
        const findModel = await model.findByIdAndDelete(id)
        if (!findModel) return res.status(404).json({ message: [messages.notFound(mayusName)] })
        res.json({
            response: `${mayusName} deleted successfully`,
            data: findModel
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Obtener relaciones de un modelo
export const getRelations = async (id, find, res, model, name, searchModel, searchName) => {
    const [lowerName, mayusName] = nameMayusName(name)
    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(lowerName)] })
        const findModel = await model.findById(id)
        if (!findModel) return res.status(404).json({ message: [messages.notFound(mayusName)] })
        const findSearchModel = await searchModel.find(find)
        if (!findSearchModel.length > 0) return res.status(404).json({ message: [messages.notFound(searchName)] })
        res.json(findSearchModel)
    } catch (error) {
        errorResponse(res, error)
    }
}