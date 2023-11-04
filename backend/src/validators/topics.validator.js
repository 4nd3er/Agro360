import z from 'zod'

export const topicsValidator = z.object({
    name: z
    .string({
        required_error: "Name is required"
    })
    .min(6, {
        message: "Name must be at least 6 characters"
    }),
    role: z
    .string({
        required_error: "Role is required"
    })
    .min(24, {
        message: "Role must be at least 24 characters"
    })
})