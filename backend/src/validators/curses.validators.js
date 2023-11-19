import z from 'zod'

export const cursesNamesValidator = z.object({
    name: z
    .string({
        required_error: "Name is required"
    })
    .min(8, {
        message: "Name must be last at 8 characters"
    })
})