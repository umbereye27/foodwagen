// src/components/modals/AddEditMealModal.tsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { foodSchema, FoodFormSchema } from '../../lib/validators';
import { Food } from '../../lib/types/food';

type Props = {
  open: boolean;
  initialValues?: Partial<Food>;
  onClose: () => void;
  onSubmit: (values: FoodFormSchema) => Promise<void> | void;
  isSubmitting?: boolean;
};

export default function AddEditMealModal({ open, initialValues, onClose, onSubmit, isSubmitting }: Props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FoodFormSchema>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      food_name: initialValues?.name ?? '',
      food_rating: (initialValues?.rating ?? 3) as number,
      food_image: initialValues?.image ?? '',
      restaurant_name: initialValues?.restaurant?.name ?? '',
      restaurant_logo: initialValues?.restaurant?.logo ?? '',
      restaurant_status: (initialValues?.restaurant?.status as any) ?? 'Open'
    }
  });

  useEffect(() => {
    reset({
      food_name: initialValues?.name ?? '',
      food_rating: (initialValues?.rating ?? 3) as number,
      food_image: initialValues?.image ?? '',
      restaurant_name: initialValues?.restaurant?.name ?? '',
      restaurant_logo: initialValues?.restaurant?.logo ?? '',
      restaurant_status: (initialValues?.restaurant?.status as any) ?? 'Open  '
    });
  }, [initialValues, reset, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{initialValues ? 'Edit Meal' : 'Add Meal'}</h2>
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <label className="block">
            <span className="text-sm">Food name</span>
            <input {...register('food_name')} className="food-input mt-1 block w-full" placeholder="Enter food name" aria-describedby="food-name-error" />
            {errors.food_name && <p id="food-name-error" className="text-sm text-red-600">{errors.food_name.message}</p>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Rating</span>
            <input type="number" {...register('food_rating', { valueAsNumber: true })} className="food-input mt-1 block w-full" placeholder="Food rating (1-5)" aria-describedby="food-rating-error" />
            {errors.food_rating && <p id="food-rating-error" className="text-sm text-red-600">{errors.food_rating.message as any}</p>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Image URL</span>
            <input {...register('food_image')} className="food-input mt-1 block w-full" placeholder="Enter food image url" aria-describedby="food-image-error" />
            {errors.food_image && <p id="food-image-error" className="text-sm text-red-600">{errors.food_image.message}</p>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Restaurant name</span>
            <input {...register('restaurant_name')} className="food-input mt-1 block w-full" placeholder="Enter restaurant name" aria-describedby="restaurant-name-error" />
            {errors.restaurant_name && <p id="restaurant-name-error" className="text-sm text-red-600">{errors.restaurant_name.message}</p>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Restaurant logo URL</span>
            <input {...register('restaurant_logo')} className="food-input mt-1 block w-full" placeholder="Enter restaurant logo url" aria-describedby="restaurant-logo-error" />
            {errors.restaurant_logo && <p id="restaurant-logo-error" className="text-sm text-red-600">{errors.restaurant_logo.message}</p>}
          </label>

          <label className="block mt-3">
            <span className="text-sm">Restaurant Status</span>
            <select {...register('restaurant_status')} className="food-input mt-1 block w-full" aria-describedby="restaurant-status-error">
              <option>Open</option>
              <option>Closed</option>
            </select>
            {errors.restaurant_status && <p id="restaurant-status-error" className="text-sm text-red-600">{errors.restaurant_status.message as any}</p>}
          </label>

          <div className="mt-4 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="food-btn px-3 py-1 rounded">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="food-btn px-4 py-1 rounded" data-test-id="food-add-submit">
              {isSubmitting ? (initialValues ? 'Updating Food...' : 'Adding Food...') : (initialValues ? 'Update' : 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
