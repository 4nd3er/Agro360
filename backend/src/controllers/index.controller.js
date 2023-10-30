import { Roles } from '../models/models.js'


export const Home = async (req, res) => {

    const roles = await roles.find({})

    res.json(roles)
}