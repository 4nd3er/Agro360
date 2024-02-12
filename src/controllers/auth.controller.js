import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Admin } from '../models/models.js'
import { createToken, errorResponse, sendEmailResetPassword } from '../libs/libs.js'
import { SECRET_TOKEN } from '../config/config.js'

//*Login
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        //Validación Usuario no existe en base de datos
        const findUser = await Admin.findOne({ email })
        if (!findUser) return res.status(400).json({ message: ["El usuario no existe"] })

        //Validacion Contraseña incorrecta
        const isPassword = await bcrypt.compare(password, findUser.password)
        if (!isPassword) return res.status(400).json({ message: ["Contraseña incorrecta"] })

        //Creacion del token y guardado en cookie
        const token = await createToken({ id: findUser.id })
        res.json({
            response: "Inicio exitoso",
            data: {
                id: findUser._id,
                user: `${findUser.names} ${findUser.lastnames}`,
                email: findUser.email,
                token: token
            }
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Register
export const register = async (req, res) => {
    const { names, lastnames, email, password } = req.body
    try {
        //Validadion Usuario ya existe en base de datos
        const findUser = await Admin.findOne({ email })
        if (findUser) return res.status(400).json({ message: ['El correo ya esta en uso'] })

        //Registro y guardado de usuario
        const newUser = new Admin({ names, lastnames, email, password })
        const userSaved = await newUser.save()

        res.json({
            response: "Administrador creado exitosamente",
            data: {
                id: userSaved._id,
                user: `${userSaved.names} ${userSaved.lastnames}`,
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
        if (!finduser) return res.status(400).json({ message: ['Usuario no encontrado'] })

        //Creacion de token
        const token = await createToken({ id: finduser.email })

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
        if (!User) return res.status(400).json({ message: ['Usuario no encontrado'] })

        //Actualizar contraseña
        User.password = password
        await User.save()

        res.json({
            response: "Contraseña cambiada satisfactoriamente",
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

//* Profile
export const profile = async (req, res) => {
    const { token } = req.cookies
    try {
        //Buscar Admin
        const findUser = await Admin.findById(req.user.id).select("-password -__v")
        if (!findUser) return res.status(404).json({ message: ["Usuario no encontrado"] })

        res.json({
            session_token: token,
            user: findUser
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

//* Verify Token
export const verifyToken = async (req, res) => {
    const { token } = req.params

    try {//Comprobar existencia de token
        if (!token) return res.status(401).json({ message: ["No autorizado"] });

        //Verifica token
        jwt.verify(token, SECRET_TOKEN, async (err, user) => {
            if (err) return res.status(401).json({ message: ["No autorizado"] });

            //Buscar Admin
            const findUser = await Admin.findById(user.id)
            if (!findUser) return res.status(401).json({ message: ["No autorizado"] })

            return res.json({
                response: "Usuario verificado correctamente",
                data: {
                    id: findUser._id,
                    user: `${findUser.names} ${findUser.lastnames}`,
                    email: findUser.email,
                    token: token
                }
            });
        })
    } catch (error) {
        errorResponse(res, error)
    }
}

