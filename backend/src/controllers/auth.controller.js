import { Admin } from '../models/models.js'
import bcrypt from 'bcrypt'
import { createToken, errorResponse, sendEmailResetPassword } from '../libs/libs.js'
import  JsonWebTokenError from 'jsonwebtoken'


export const login = async (req, res) => {

    const { email, password } = req.body
    try {

        //Validacion Usuario no existe en base de datos
        const findUser = await Admin.findOne({ email })
        if (!findUser) return res.status(400).json({ msg: "El usuario no existe" })

        //Validacion Contraseña incorrecta
        const isPassword = await bcrypt.compare(password, findUser.password)
        if (!isPassword) return res.status(400).json({ msg: "Contraseña incorrecta" })

        const token = await createToken({ id: findUser.id, expires: "30d" })
        res.cookie("token", token)

        res.json({
            response: "Inicio exitoso",
            data: {
                id: findUser._id,
                names: findUser.names,
                lastnames: findUser.lastnames,
                token: token
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

export const register = async (req, res) => {

    const enabledRegister = true
    if (!enabledRegister) return res.status(401).json({ msg: 'You are not allowed to register' })

    const { names, lastnames, email, password } = req.body
    try {
        //Validadion Usuario ya existe en base de datos
        const findUser = await Admin.findOne({ email })
        if (findUser) return res.status(400).json(['El correo ya esta en eso'])

        const newUser = new Admin({
            names,
            lastnames,
            email,
            password
        })
        //Validacion Registro de usuario 
        const userSaved = await newUser.save()

        res.json({
            msg: "Usuario creado exitosamente",
            data: {
                id: userSaved._id,
                names: userSaved.names,
                lastnames: userSaved.lastnames,
                email: userSaved.email
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}
  
export const forgetPassword = async (req, res) => {

    const { email } = req.body
    try {
        const finduser = await Admin.findOne({ email })
        if (!finduser) return res.status(400).json({ msg: 'User not found' })

        const token = await createToken({ id: finduser.email, expires: "15m" })
        sendEmailResetPassword(res, { userEmail: finduser.email, token: token })

    } catch (error) {
        errorResponse(res, error)
    }
}
//Reestablecer contraseña 
export const resetPassword = async (req, res) => {

    const { password } = req.body
    try {
        const User = await Admin.findOne({ email: req.user.id })
        if (!User) return res.status(400).json({ msg: 'User not found' })
    //Actualizar contraseña
        User.password = password
        await User.save()
       //respuesta exitosa 
        res.json({
            response: "Password changed successfully",
            data: {
                names: User.names,
                lastnames: User.lastnames,
                email: User.email
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const logout = (req, res) => {

    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {

    const findUser = await Admin.findById(req.user.id).select("-password -__v")
    if (!findUser) return res.status(404).json({ msg: "User not found" })

    const { token } = req.cookies

    res.json({
        session_token: token,
        user: findUser
    })
};

//COOKIE

export const verifyToken = async(req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({ msg: "No autorizado"});

    JsonWebTokenError.verify(token, createToken, async (err, user) =>{
        if (err) return res.status(401).json({msg: "No autoritazo"});

        const findUser = await Admin.findById(user.id)
        if(!findUser) return res.status(401).json({msg:
        "No autorizado"})

        return res.json({
            id: findUser._id,
            names: findUser.names,
            email: findUser.email 
        });
    })
}

