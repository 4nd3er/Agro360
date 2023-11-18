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

