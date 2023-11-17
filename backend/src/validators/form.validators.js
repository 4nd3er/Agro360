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
        .string({
            required_error: "End is required"
        }),
    status: z
        .boolean()
        .nullish(),
    questions: z.array(
        z.object({
            name: z
                .string({
                    required_error: ""
                })
                .min(10, {
                    message: "Question must be at least 10 characters"
                }),
            type: z
                .string({
                    required_error: "Question Type is required"
                }),
            options: z.array(
                z.object({
                    option: z
                        .string({})
                        .min(8, {
                            message: "Question Option must be at least 8 characters"
                        })
                        .nullish()
                })
            )
        })
    )
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
        }),
    option: z
        .string()
        .min(6, {
            message: "Option must be at least 6 characters"
        })
        .nullish()
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