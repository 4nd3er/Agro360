import { messages, errorResponse, validObjectId } from './libs.js'
import { nameMayusName, capitalizeObject } from './functions.js'
import xlsx from 'xlsx'

//* Obtener todos los documentos de una coleccion
export const getMethod = async (res, model, name) => {
    const [lowerName, mayusName] = nameMayusName(name)
    try {
        const findModel = await model.find({})
        //if (!findModel.length > 0) return res.status(404).json({ message: [messages.notFound(mayusName)] })
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
        res.json(findSearchModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

//*Obtener y validar datos de un archivo xlsx
export const getDataXlsx = (res, files) => {
    try {
        const filesData = []
        if (!files) return res.status(400).json({ message: ["Los archivos son requeridos"] })
        let invalidFormat = false
        for (const file of files) {
            const compArchive = file.originalname
            const format = compArchive.split(".")
            if (format[format.length - 1] !== 'xlsx' && format[format.length - 1] !== 'xls') invalidFormat = true

            const archive = xlsx.read(file.buffer, { type: 'buffer' })
            const sheet = archive.SheetNames[0]
            const data = xlsx.utils.sheet_to_json(archive.Sheets[sheet])
            filesData.push(data)
        }
        if (invalidFormat) return res.status(400).json({ message: ["Los archivos deben tener el formato XLSX o XLS"] })

        return filesData
    } catch (error) {
        errorResponse(res, error)
    }
}