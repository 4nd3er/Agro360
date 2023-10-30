import { Roles } from '../models/models.js'


export const Rols = async (req, res) => {

    try {

        const roles = await Roles.find({})
        if (!roles) return res.status(404).json({ msg: 'No roles found' })
        res.json(roles)

    } catch (error) {
        res.send(500).json({ error: error.message })
    }

}

export const getRole = async (req, res) => {

    const { id } = req.params

    try {

        const findRole = await Roles.findById(id).lean()
        if (!findRole) return res.send(404).json({ msg: 'Role not found' })

        res.json(findRole)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};

export const createRole = async (req, res) => {

    const { name, description } = req.body

    const findRole = await Roles.findOne({ name })
    if (findRole) return res.status(400).json({ msg: "Role already exists" })

    try {

        const newRole = new Roles({ name, description })
        const savedRole = await newRole.save()

        res.json({
            response: "Role created successfully",
            data: {
                id: savedRole.id,
                name: savedRole.name,
                description: savedRole.description
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteRole = async (req, res) => {

    const { id } = req.params

    try {

        const deleteRole = await Roles.findByIdAndDelete(id)
        if (!deleteRole) return res.status(404).json({ msg: 'Role not found' })

        res.json({
            response: "Role deleted successfully",
            data: {
                id: deleteRole.id,
                name: deleteRole.name,
                description: deleteRole.description
            }
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateRole = async (req, res) => {

    const { id } = req.params
    const { name, description } = req.body

    try {

        const findRole = await Roles.findByIdAndUpdate(id, { name: name, description: description }, {
            new: true
        })
        if (!findRole) return res.status(404).json({ msg: 'Role not found' })

        res.json({
            response: "Roles updated successfully",
            data: {
                id: findRole.id,
                name: findRole.name,
                description: findRole.description
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};