import errorResponse from "./ErrorResponse.js"
import validObjectId from "./ValidObjectId.js"
import { messages } from "./libs.js"

// *Funcion para capitalizar el valor del primer campo de un objeto
function capitalizeCamp(data) {
    const objects = Object.entries(data)
    const [key, value] = objects[0]
    data[key] = value.charAt(0).toUpperCase() + value.toLowerCase().slice(1)
}

//*Funcion para capitalizar una cadena
export function capitalizeString(string) {
    const transformed = []
    for (const word of string.toString().split(" ")) {
        const capWord = word.charAt(0).toUpperCase() + word.toLowerCase().slice(1)
        transformed.push(capWord)
    }
    return transformed.join(" ")
}

//*Funcion para capitalizar la primera letra
export function capitalizeWord(word) {
    const string = word.split(" ")[0]
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1)
}

export const getMethod = async (res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        const findModel = await model.find({})
        if (!findModel.length > 0) return res.status(404).json({ message: [messages.notFound(mayusName)] })
        res.json(findModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const getOneMethod = async (id, res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(name)] })
        const findModel = await model.findById(id)
        if (!findModel) return res.status(404).json({ message: [messages.notFound(mayusName)] })

        res.json(findModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

export const createMethod = async (data, find, res, model, name, capitalize) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    if (capitalize == "capitalize") {
        for (const [key, value] of Object.entries(data)) {
            if (key === "names" || key === "name") {
                data[key] = capitalizeString(value)
                find[key] ? find[key] = data[key] : null;
            }
        }
    }
    else if (capitalize == "capitalize 2") {
        for (const [key, value] of Object.entries(data)) {
            if (key === "names" || key === "lastnames") {
                data[key] = capitalizeString(value)
                find[key] ? find[key] = data[key] : null;
            }
        }
    }

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

export const updateMethod = async (data, id, find, res, model, name, capitalize) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    if (capitalize == "capitalize") {
        for (const [key, value] of Object.entries(data)) {
            if (key === "names" || key === "name") {
                data[key] = capitalizeString(value)
                find[key] ? find[key] = data[key] : null;
            }
        }
    }
    else if (capitalize == "capitalize 2") {
        for (const [key, value] of Object.entries(data)) {
            if (key === "names" || key === "lastnames") {
                data[key] = capitalizeString(value)
                find[key] ? find[key] = data[key] : null;
            }
        }
    }

    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(name)] })

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

export const deleteMethod = async (id, res, model, name) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(name)] })

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

export const getRelations = async (id, find, res, model, name, searchModel, searchName) => {

    const mayusName = name.charAt(0).toUpperCase() + name.slice(1)
    name = name.toLowerCase()

    try {
        if (!validObjectId(id)) return res.status(400).json({ message: [messages.invalidId(name)] })

        const findModel = await model.findById(id)
        if (!findModel) return res.status(404).json({ message: [messages.notFound(mayusName)] })

        const findSearchModel = await searchModel.find(find)
        if (!findSearchModel.length > 0) return res.status(404).json({ message: [messages.notFound(searchName)] })

        res.json(findSearchModel)
    } catch (error) {
        errorResponse(res, error)
    }
}

// *Validation Methods
export const verifyObjectId = async (res) => {

    try {

    } catch (error) {
        errorResponse(res, error)
    }
}