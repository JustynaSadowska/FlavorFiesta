import { z } from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
  email: z.string().email(),
  firstName: requiredString("firstName"),
  lastName: requiredString("lastName"),
  password: requiredString("password"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
