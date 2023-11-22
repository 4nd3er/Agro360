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
        .coerce
        .date()
        .min(new Date(), {
            message: "The date is invalid"
        }),
    status: z
        .boolean()
        .default(false)
        .nullish(),
    questions: z.array(
        z.object({
            question: z
                .string({
                    required_error: "Question is required"
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
                        .min(2, {
                            message: "Question Option must be at least 2 characters"
                        })
                        .nullish()
                })
            )
        })
    )
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