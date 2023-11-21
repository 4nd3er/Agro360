import z from 'zod'

export const registerValidator = z.object({
    names: z
        .string({
            required_error: "Se requieren nombres"
        })
        .min(4, {
            message: "Los nombres deben tener al menos 4 caracteres."
        }),
    lastnames: z
        .string({
            required_error: "Se requieren apellidos."
        })
        .min(6, {
            message: "Los apellidos deben tener al menos 6 caracteres."
        }),
    email: z
        .string({
            required_error: "Se requiere el correo electrónico"
        })
        .email({
            message: "Correo electrónico no válido"
        }),
    password: z
        .string({
            required_error: "Se requiere la contraseña."
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
        required_error: "El correo electrónico es obligatorio"
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