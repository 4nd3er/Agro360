import z from 'zod'

export const coursesCronogramValidator = z.object({
    course: z
        .string({
            required_error: "Course is required"
        }),
    instructors: z.array(
        z.object({
            instructor: z
                .string({
                    required_error: "Instructor is required"
                })
        })
    )
})

export const coursesNamesValidator = z.object({
    name: z
        .string({
            required_error: "Name is required"
        })
        .min(8, {
            message: "Name must be last at 8 characters"
        })
})

export const coursesValidator = z.object({
    name: z
        .string({
            required_error: "Name is required"
        }),
    type: z
        .string({
            required_error: "Type is required"
        })
        .min(6, {
            message: "Type must be last at 6 characters"
        }),
    number: z
        .string({
            required_error: "Number is required"
        })
        .min(7, {
            message: "Number must be last at 7 characters"
        })
})