import z from 'zod'

export const roleValidator = z.object({
    name: z
    .string({
        required_error: "Names is required"
    })
    .min(4, {
        message: "Names must be at least 4 characters"
    }),
    description: z
    .string()
    .min(10, {
        message: "Description must be at least 10 characters"
    })
    .nullish()
})