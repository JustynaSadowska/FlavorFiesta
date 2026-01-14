import { z } from "zod";
//import { id } from "zod/v4/locales";

const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });
export const recipeSchema = z.object({
  title: requiredString("Title").max(20, { message: `Max 20 characters` }),
  description: z
    .string()
    .max(330, { message: `Max 330 characters` })
    .optional(),
  servings: z
    .number({ required_error: `Servings are required` })
    .int({ message: "Servings must be an integer" })
    .min(1, { message: "Servings must be at least 1" }),

  preparationTime: z
    .number({ required_error: `Preparation time is required` })
    .int({ message: "Preparation time must be an integer" })
    .min(1, { message: "Preparation time must be at least 1 minute" }),

  difficulty: z
    .number({ message: "Difficulty is required" })
    .int({ message: "Difficulty is required" }),

  steps: z
    .array(
      z.object({
        description: requiredString("Step description"),
      })
    )
    .min(1, { message: "At least one step is required" }),

  ingredients: z
    .array(
      z.object({
        name: requiredString("Ingredient name"),
        quantity: z
          .number({ required_error: "Quantity must be a number" })
          .positive({ message: "Quantity must be greater than 0" })
          .min(0, { message: "Quantity is required" }),
        unit: z.object({
          id: requiredString("Unit ID"),
          displayName: requiredString("Unit name"),
        }),
      })
    )
    .min(1, { message: "At least one ingredient is required" }),

  tags: z.array(z.any()).min(1, { message: "At least one tag is required" }),
  isVisible: z.boolean(),
  allergens: z.array(z.any()).optional(),
});
export type RecipeSchema = z.infer<typeof recipeSchema>;
