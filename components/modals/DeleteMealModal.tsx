// src/components/modals/DeleteMealModal.tsx
import React from 'react';

type Props = { open: boolean; onClose: () => void; onConfirm: () => void; isDeleting?: boolean };

export default function DeleteMealModal({ open, onClose, onConfirm, isDeleting }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="bg-white rounded-lg p-6 z-10 w-full max-w-sm text-center">
        <h3 className="font-semibold mb-3">Delete Meal</h3>
        <p className="mb-4">Are you sure you want to delete this meal?</p>
        <div className="flex justify-center gap-3">
          <button className="food-btn px-3 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="food-btn px-3 py-1 rounded" onClick={onConfirm} disabled={isDeleting} data-test-id="food-delete-confirm">
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
