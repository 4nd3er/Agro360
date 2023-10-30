import z from 'zod'

export const formValidator = z.object({
    name: z
        .string({
            required_error: "Name is required"
        })
        .min(6, {
            message: "Name must be at least 6 characters"
        }),
    description: z
        .string({
            required_error: "Description is required"
        })
        .min(15, {
            message: "Description must be at least 15 characters"
        }),
    topic: z
        .string({
            required_error: "Topic is required"
        })
        .min(24, {
            message: "Topic must be at least 24 characters"
        }),
    end: z
        .date({
            required_error: "End is required"
        }),
    status: z
        .boolean()
        .nullish(),
    creator: z
        .string({
            required_error: "Creator is required"
        })
        .min(24, {
            message: "Creator must be at least 24 characters"
        })
})

export const questionValidator = z.object({
    name: z
        .string({
            required_error: "Name is required"
        })
        .min(10, {
            message: "Name must be at least 10 characters"
        }),
    type: z
        .string({
            required_error: "Type is required"
        })
        .min(24, {
            message: "Type must be at least 24 characters"
        })
})

export const questionTypeValidator = z.object({
    name: z
        .string({
            required_error: "Name  is required"
        })
        .min(6, {
            message: "Name must be at least 6 characters"
        })
})