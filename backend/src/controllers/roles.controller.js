import { createMethod, deleteMethod, getMethod, getOneMethod, getRelations, updateMethod } from '../libs/methods.js';
import { Roles, Topics } from '../models/models.js'


export const Rols = async (req, res) => {

    getMethod(res, Roles, "Roles")
}

export const getRole = async (req, res) => {

    const { id } = req.params
    getOneMethod(id, res, Roles, "Role")
};

export const getRoleTopics = async (req, res) => {

    const { id } = req.params
    const find = { role: id }
    getRelations(id, find, res, Roles, "Role", Topics, "Topics")
};

export const createRole = async (req, res) => {

    const { name, description } = req.body
    const data = { name, description, creator: req.user.id }
    const find = { name }
    createMethod(data, find, res, Roles, "Role")
}

export const updateRole = async (req, res) => {

    const { id } = req.params
    const { name, description } = req.body
    const data = { name, description, creator: req.user.id }
    const find = { name }
    updateMethod(data, id, find, res, Roles, "Role")
};

export const deleteRole = async (req, res) => {

    const { id } = req.params
    deleteMethod(id, res, Roles, "Role")
}

