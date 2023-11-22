import { createMethod, deleteMethod, getMethod, getOneMethod, getRelations, updateMethod } from '../libs/methods.js';
import { Roles, Topics } from '../models/models.js'


export const roles = async (req, res) => {
    await getMethod(res, Roles, "Roles")
}

export const getRole = async (req, res) => {
    const { id } = req.params
    await getOneMethod(id, res, Roles, "Role")
};

export const getRoleTopics = async (req, res) => {
    const { id } = req.params
    const find = { role: id }
    await getRelations(id, find, res, Roles, "Role", Topics, "Topics")
};

export const createRole = async (req, res) => {
    const { name, description } = req.body
    const data = { name, description, creator: req.user.id }
    const find = { name }
    await createMethod(data, find, res, Roles, "Role", "capitalize")
}

export const updateRole = async (req, res) => {
    const { id } = req.params
    const { name, description } = req.body
    const data = { name, description, creator: req.user.id }
    const find = { name }
    await updateMethod(data, id, find, res, Roles, "Role", "capitalize")
};

export const deleteRole = async (req, res) => {
    const { id } = req.params
    await deleteMethod(id, res, Roles, "Role")
}

