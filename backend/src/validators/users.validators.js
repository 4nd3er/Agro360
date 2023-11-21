import z from 'zod'

export const usersValidator = z.object({
    names: z
        .string({
            required_error: "Names is required"
        })
        .min(5, {
            message: "Names must be last at 6 characters"
        }),
    lastnames: z
        .string({
            required_error: "Lastanames is required"
        })
        .min(4, {
            message: "Lastnames must be last at 6 characters"
        }),
    documentType: z
        .string({
            required_error: "document type is required"
        })
        .min(2, {
            message: "Document type must be last at 2 characters"
        }),
    document: z
        .string({
            required_error: "Document is required"
        })
        .min(8, {
            message: "Document must be last at 8 characters"
        }),
    rol: z
        .string({
            required_error: "Rol is required"
        }),
    email: z
        .string({
            required_error: "Email is required"
        })
        .email({
            message: "Email is invalid"
        }),
    course: z
        .string()
        .nullish()
})