// src/utils/validators.ts
import { z } from "zod";

export const restaurantStatusEnum = z.enum(["Open", "Closed"]);

export const foodSchema = z.object({
  food_name: z.string().min(1, { message: "Food Name is required" }),
  food_rating: z
    .number({ error: "Food Rating must be a number" })
    .min(1, { message: "Rating must be >= 1" })
    .max(5, { message: "Rating must be <= 5" }),
  food_image: z.string().url({ message: "Food Image URL is required" }),
  restaurant_name: z
    .string()
    .min(1, { message: "Restaurant Name is required" }),
  restaurant_logo: z
    .string()
    .url({ message: "Restaurant Logo URL is required" }),
  restaurant_status: restaurantStatusEnum,
});

export type FoodFormSchema = z.infer<typeof foodSchema>;
