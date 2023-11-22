import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Admin } from '../models/models.js'
import { createToken, errorResponse, sendEmailResetPassword } from '../libs/libs.js'

//*Login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        //Validacion Usuario no existe en base de datos
        const findUser = await Admin.findOne({ email })
        if (!findUser) return res.status(400).json({ message: ["El usuario no existe"] })

        //Validacion Contraseña incorrecta
        const isPassword = await bcrypt.compare(password, findUser.password)
        if (!isPassword) return res.status(400).json({ message: ["Contraseña incorrecta"] })

        //Creacion del token y guardado en cookie
        const token = await createToken({ id: findUser.id, expires: "30d" })
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

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

//* Register
export const register = async (req, res) => {
    //Permitir registro
    const enabledRegister = true
    if (!enabledRegister) return res.status(401).json({ message: ['You are not allowed to register'] })

    const { names, lastnames, email, password } = req.body
    try {
        //Validadion Usuario ya existe en base de datos
        const findUser = await Admin.findOne({ email })
        if (findUser) return res.status(400).json({ message: ['El correo ya esta en eso'] })

        //Registro y guardado de usuario
        const newUser = new Admin({ names, lastnames, email, password })
        const userSaved = await newUser.save()

        //Creacion de token y guardado en cookie
        const token = await createToken({
            id: userSaved._id, expires: "30d"
        });
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.json({
            response: "Usuario creado exitosamente",
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

//* Forget-Password
export const forgetPassword = async (req, res) => {
    const { email } = req.body
    try {
        //Buscar usuario por email
        const finduser = await Admin.findOne({ email })
        if (!finduser) return res.status(400).json({ message: ['User not found'] })

        //Creacion de token
        const token = await createToken({ id: finduser.email, expires: "15m" })

        //Envio de correo con enlace
        sendEmailResetPassword(res, { userEmail: finduser.email, token: token })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Reset-Password
export const resetPassword = async (req, res) => {
    const { password } = req.body
    try {
        //BUscar usuario
        const User = await Admin.findOne({ email: req.user.id })
        if (!User) return res.status(400).json({ message: ['User not found'] })

        //Actualizar contraseña
        User.password = password
        await User.save()

        res.json({
            response: "Password changed successfully",
            data: {
                names: User.names,
                lastnames: User.lastnames,
                email: User.email
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Logout
export const logout = (req, res) => {
    //Eliminar cookie
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}


//* Profile
export const profile = async (req, res) => {
    const { token } = req.cookies

    //Buscar Admin
    const findUser = await Admin.findById(req.user.id).select("-password -__v")
    if (!findUser) return res.status(404).json({ message: ["User not found"] })

    res.json({
        session_token: token,
        user: findUser
    })
}

//* Verify Token
export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    //Comprobar existencia de token
    if (!token) return res.status(401).json({ message: ["No autorizado"] });

    //Verifica token
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
        if (err) return res.status(401).json({ message: ["No autorizado"] });

        //Buscar Admin
        const findUser = await Admin.findById(user.id)
        if (!findUser) return res.status(401).json({ message: ["No autorizado"] })

        return res.json({
            id: findUser._id,
            names: findUser.names,
            email: findUser.email
        });
    })
}

