import compObjectId from '../libs/compObjectId.js'
import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from '../libs/methods.js'
import { Curses, CursesNames, Topics } from '../models/models.js'


// *Curses Names
export const cursesNames = async (req, res) => {
    await getMethod(res, CursesNames, "Curses names")
}

export const getCurseName = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, CursesNames, "Curse name")
}

export const createCurseName = async (req, res) => {
    const { name } = req.body
    const data = { name }
    const find = { name }
    await createMethod(data, find, res, CursesNames, "Curse name")
}

export const updateCurseName = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const data = { name }
    const find = { name }
    await updateMethod(data, id, find, res, CursesNames, "Curse name")
}

export const deleteCurseName = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, CursesNames, "Curse name")
}


//*Curses
export const curses = async (req, res) => {
    await getMethod(res, Curses, "Curses")
}

export const getCurse = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Curses, "Curse")
}

export const createCurse = async (req, res) => {
    const { name, type, number } = req.body
    const data = { name, type, number }
    const find = { number }

    const compName = await compObjectId(name, CursesNames, "Curse Name")
    if (!compName.success) return res.status(compName.status).json({ msg: compName.msg })

    await createMethod(data, find, res, Curses, "Curse")
}

export const updateCurse = async (req, res) => {
    const { id } = req.params
    const { name, type, number } = req.body
    const data = { name, type, number }
    const find = { number }

    const compName = await compObjectId(name, CursesNames, "Curse Name")
    if (!compName.success) return res.status(compName.status).json({ msg: compName.msg })

    await updateMethod(data, id, find, res, Curses, "Curse")
}

export const deleteCurse = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, Curses, "Curse")
}