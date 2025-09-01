import z from "zod";
const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });
export const shoppingListsSchema = z.object({
  title: requiredString("Title").max(20, { message: `Max 20 characters` }),
  shoppingListItems: z
    .array(
      z.object({
        name: requiredString("Item name"),
        quantity: z
          .number({ required_error: "Quantity must be a number" })
          .positive({ message: "Quantity must be greater than 0" })
          .min(1, { message: "Quantity is required" }),
        unit: z.object({
          id: requiredString("Unit ID"),
          displayName: requiredString("Unit name"),
        }),
      })
    )
    .min(1, { message: "At least one item is required" }),
});

export type ShoppingListsSchema = z.infer<typeof shoppingListsSchema>;
