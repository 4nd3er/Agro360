import z from 'zod';

export const emailValidator = z.object({
    email: z
        .string({
            required_error: "Email is required"
        })
        .email({
            message: "Invlid email"
        })
})

export const responseValidator = z.object({
    answers: z.array(
        z.object({
            question: z
                .string({
                    required_error: "Question is required"
                })
                .min(5, {
                    message: "Question must be last at 10 characters"
                }),
            instructor: z
                .string({
                    required_error: "Instructor is required"
                }),
            answer: z
                .string({
                    required_error: "Answer is required"
                })
                .min(1, {
                    message: "Answer must be last at 2 characters"
                })
        })
    )
})