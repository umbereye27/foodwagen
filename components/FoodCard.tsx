import{ useState, useRef, useEffect } from "react";
import { Food } from "../lib/types/food";

type Props = {
  food: Food & { price?: number | string };
  onEdit?: (f: Food) => void;
  onDelete?: (id?: string) => void;
};

export default function FoodCard({ food, onEdit, onDelete }: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpenMenu(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const priceLabel = food.price ? `$${food.price}` : null;
  const status = food.restaurant?.status ?? "Closed";

  return (
    <article
      className="food-card relative rounded-xl overflow-hidden bg-white"
      data-test-id={`food-card-${food.id}`}
      aria-labelledby={`food-title-${food.id}`}
    >
      <div className="relative">
        <img
          src={food.image ?? "/images/placeholder.svg"}
          alt={food.name}
          className="w-full h-54 object-cover rounded-lg"
        />

        {priceLabel && (
          <div
            className="absolute left-3 top-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md food-price-badge"
            aria-hidden="true"
          >
            <img src="/Icon.svg" alt="Price tag icon" className="w-3.5 h-3.5" />
            <span className="food-price">{priceLabel}</span>
          </div>
        )}

        <div className="absolute right-0 py-4  " ref={menuRef}>
          <button
            aria-label="Open item menu"
            onClick={() => setOpenMenu((v) => !v)}
            className="bg-white/80 hover:bg-white py-1 cursor-pointer rounded-bl-md rounded-tr-md flex items-center justify-center"
            data-test-id="food-ellipsis-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>

          {openMenu && (
            <div
              role="menu"
              aria-label="Item actions"
              className=" w-36 bg-white shadow-lg rounded-md border border-gray-100 py-1 right-0  absolute"
            >
              <button
                role="menuitem"
                className="w-full text-left px-2 py-1 hover:bg-gray-50 text-sm"
                onClick={() => {
                  setOpenMenu(false);
                  onEdit?.(food);
                }}
                data-test-id="food-edit-btn"
              >
                Edit
              </button>
              <button
                role="menuitem"
                className="w-full text-left px-2 py-2 hover:bg-gray-50 text-sm text-red-600"
                onClick={() => {
                  setOpenMenu(false);
                  onDelete?.(food.id);
                }}
                data-test-id="food-delete-btn"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="py-6">
        <div className="flex items-start gap-4">
          <div className="">
            <img
              src={food.restaurant?.logo ?? "/images/placeholder.svg"}
              alt={food.restaurant?.name ?? "Restaurant logo"}
              className="w-10 h-10 rounded-md object-cover shadow-sm restaurant-logo"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3
                id={`food-title-${food.id}`}
                className="food-name text-base font-semibold text-gray-900"
              >
                {food.name}
              </h3>
            </div>

            <div className="">
              <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .587l3.668 7.431L23.4 9.75l-5.6 5.455L19.336 24 12 20.012 4.664 24l1.536-8.795L.6 9.75l7.732-1.732L12 .587z" />
                </svg>
                <span className="food-rating">{food.rating ?? "-"}</span>
              </span>
            </div>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            status === "Open"
              ? "bg-green-100 text-green-800"
              : "bg-rose-100 text-rose-700"
          }`}
          aria-hidden="true"
        >
          {status}
        </span>
      </div>
    </article>
  );
}
