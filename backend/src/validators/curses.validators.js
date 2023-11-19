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

export const cursesValidator = z.object({
    name: z
        .string({
            required_error: "Name is required"
        })
        .min(10, {
            message: "Name must be last at 10 characters"
        }),
    type: z
        .string({
            required_error: "Type is required"
        }),
    number: z
        .string({
            required_error: "Number is required"
        })
        .min(7, {
            message: "Number must be last at 7 characters"
        })
})