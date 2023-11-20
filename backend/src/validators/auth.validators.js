import z from 'zod'

export const registerValidator = z.object({
    names: z
        .string({
            required_error: "Names are required"
        })
        .min(4, {
            message: "Names must be at least 4 characters"
        }),
    lastnames: z
        .string({
            required_error: "Lastnames are required"
        })
        .min(6, {
            message: "Lastnames must be at least 6 characters"
        }),
    email: z
        .string({
            required_error: "Email is required"
        })
        .email({
            message: "Correo electrónico no válido"
        }),
    password: z
        .string({
            required_error: "Password is required"
        })
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres"
        })
})

export const loginValidator = z.object({
    email: z
    .string({
        required_error: "El correo electrónico es obligatorio"
    })
    .email({
        message: "Correo electrónico no válido"
    }),
    password: z
    .string({
        required_error: "La contraseña es obligatoria"
    })
    .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres"
    })
})

export const emailValidator = z.object({
    email:  z
    .string({
        required_error: "El correo electrónico es obligatori"
    })
    .email({
        message: "Correo electrónico no válido"
    })
})

export const passwordValidator = z.object({
    password: z
    .string({
        required_error: "La contraseña es obligatoria"
    })
    .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres"
    })
})