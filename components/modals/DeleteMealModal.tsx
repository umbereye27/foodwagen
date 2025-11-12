
type Props = { open: boolean; onClose: () => void; onConfirm: () => void; isDeleting?: boolean };

export default function DeleteMealModal({ open, onClose, onConfirm, isDeleting }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/40" onClick={onClose} />
      <div className="bg-white rounded-lg p-16 z-10 w-full max-w-md text-center">
        <h3 className="font-semibold mb-3 text-2xl text-[#FF9A0E] font-bold">Delete Meal</h3>
        <p className="mb-4 text-sm text-gray-500">Are you sure you want to delete this meal?</p>
        <div className="flex justify-center gap-3">
          
          <button className="food-btn px-18 py-3 rounded" onClick={onConfirm} disabled={isDeleting} data-test-id="food-delete-confirm">
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          <button className="food-btn px-18 py-3 rounded" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
