import { createMethod, deleteMethod, getMethod, getOneMethod, updateMethod } from '../libs/methods.js'
import { CursesNames } from '../models/models.js'


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
