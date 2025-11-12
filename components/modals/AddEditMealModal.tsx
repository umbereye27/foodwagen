"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { foodSchema, FoodFormSchema } from "../../lib/validators";
import { Food } from "../../lib/types/food";
import { CustomInput } from "../custom-input";
import { FormField } from "../ui/form";

type Props = {
  open: boolean;
  initialValues?: Partial<Food>;
  onClose: () => void;
  onSubmit: (values: FoodFormSchema) => Promise<void> | void;
  isSubmitting?: boolean;
};

export default function AddEditMealModal({
  open,
  initialValues,
  onClose,
  onSubmit,
  isSubmitting = false,
}: Props) {
  const form = useForm<FoodFormSchema>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      food_name: initialValues?.name ?? "",
      food_rating: (initialValues?.rating ?? 3) as number,
      food_image: initialValues?.image ?? "",
      restaurant_name: initialValues?.restaurant?.name ?? "",
      restaurant_logo: initialValues?.restaurant?.logo ?? "",
      restaurant_status: (initialValues?.restaurant?.status as any) ?? "Open",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    reset({
      food_name: initialValues?.name ?? "",
      food_rating: (initialValues?.rating ?? 3) as number,
      food_image: initialValues?.image ?? "",
      restaurant_name: initialValues?.restaurant?.name ?? "",
      restaurant_logo: initialValues?.restaurant?.logo ?? "",
      restaurant_status: (initialValues?.restaurant?.status as any) ?? "Open",
    });
  }, [initialValues, reset, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto ">
      <div className="absolute inset-0 bg-white/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-10 mt-15 z-10 w-full max-w-xl">
        <h2 className=" mb-4 flex justify-center">
          {initialValues ? "Edit Meal" : "Add Meal"}
        </h2>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-3">
            <FormField
              control={control}
              name="food_name"
              render={({ field }) => (
                <div>
                  <CustomInput label="Food Name*" type="text" {...field} 
                  placeholder="Enter food name"/>
                  {errors.food_name && (
                    <p className="text-sm text-yellow-600 mt-1"></p>
                  )}
                </div>
              )}
            />

            <FormField
              control={control}
              name="food_rating"
              render={({ field }) => (
                <div>
                  <CustomInput
                  placeholder="Food Rating"
                    label="Rating"
                    type="number"
                    {...field}
                    onChange={(e: any) =>
                      field.onChange(Number(e?.target?.value ?? e))
                    }
                    min={1}
                    max={5}
                  />
                  {errors.food_rating && (
                    <p className="text-sm text-red-600 mt-1"></p>
                  )}
                </div>
              )}
            />

            <FormField
              control={control}
              name="food_image"
              render={({ field }) => (
                <div>
                  <CustomInput label="Image URL" type="text" {...field} placeholder= 'Foood Image (link)'/>
                  {errors.food_image && (
                    <p className="text-sm text-red-600 mt-1"></p>
                  )}
                </div>
              )}
            />

            <FormField
              control={control}
              name="restaurant_name"
              render={({ field }) => (
                <div>
                  <CustomInput label="Restaurant Name" type="text" {...field}  placeholder="Restaurant Name"/>
                  {errors.restaurant_name && (
                    <p className="text-sm text-red-600 mt-1"></p>
                  )}
                </div>
              )}
            />

            <FormField
              control={control}
              name="restaurant_logo"
              render={({ field }) => (
                <div>
                  <CustomInput
                    label="Restaurant Logo URL"
                    type="text"
                    {...field}
                    placeholder="Restaurant Logo(link)"
                  />
                  {errors.restaurant_logo && (
                    <p className="text-sm text-red-600 mt-1"></p>
                  )}
                </div>
              )}
            />

            <FormField
              control={control}
              name="restaurant_status"
              render={({ field }) => (
                <div>
                  <label className="block text-sm mb-1">
                    Restaurant Status
                  </label>
                  <select
                    {...field}
                    className="food-input mt-1 block w-full"
                    aria-describedby="restaurant-status-error"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                  {errors.restaurant_status && (
                    <p
                      id="restaurant-status-error"
                      className="text-sm text-red-600 mt-1"
                    >
                    </p>
                  )}
                </div>
              )}
            />

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="food-btn px-18 py-3 text-sm rounded"
                data-test-id="food-add-submit"
              >
                {isSubmitting
                  ? initialValues
                    ? "Updating Food..."
                    : "Adding Food..."
                  : initialValues
                  ? "Update"
                  : "Add"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="food-btn px-18 py-3 text-sm text-black border  border-orange-500 bg-transparent rounded"
              >
                Cancel
              </button>
              
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
