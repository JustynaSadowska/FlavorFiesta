import z from "zod";

export const reviewsSchema = z.object({
    rating: z.number({ required_error: `Rating is required` }),
    comment:  z.string().max(400,{ message: `Max 400 characters` }).optional(),
})

export type ReviewSchema = z.infer<typeof reviewsSchema>;