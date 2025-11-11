"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  fetchFoods,
  createFoodThunk,
  updateFoodThunk,
  deleteFoodThunk,
} from "../store/foods-slice";
import FoodCard from "../components/FoodCard";
import AddEditMealModal from "../components/modals/AddEditMealModal";
import DeleteMealModal from "../components/modals/DeleteMealModal";
import { Food } from "../lib/types/food";
import { Loader } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: foods,
    loading,
    error,
  } = useSelector((s: RootState) => s.foods);

  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<Food | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  useEffect(() => {
    // initial load
    dispatch(fetchFoods({ limit, page: 1 }));
  }, [dispatch]);

  const handleSearch = () => {
    setCurrentPage(1);
    setHasMore(true);
    dispatch(fetchFoods({ search: search || undefined, limit, page: 1 }));
  };

  const handleAdd = async (values: any) => {
    await dispatch(
      createFoodThunk({
        name: values.food_name,
        rating: values.food_rating,
        image: values.food_image,
        restaurant: {
          name: values.restaurant_name,
          logo: values.restaurant_logo,
          status: values.restaurant_status,
        },
      })
    ).unwrap();
    setAddOpen(false);
  };

  const handleUpdate = async (values: any) => {
    if (!selected?.id) return;
    await dispatch(
      updateFoodThunk({
        id: selected.id,
        payload: {
          name: values.food_name,
          rating: values.food_rating,
          image: values.food_image,
          restaurant: {
            name: values.restaurant_name,
            logo: values.restaurant_logo,
            status: values.restaurant_status,
          },
        },
      })
    ).unwrap();
    setEditOpen(false);
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    await dispatch(deleteFoodThunk(selected.id)).unwrap();
    setDeleteOpen(false);
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      {/* <section className="mb-6">
        <h2 className="text-3xl font-bold">Are you starving?</h2>
        <div className="mt-4 flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food"
            id="food-search"
            className="food-input mr-2"
          />
          <button
            onClick={handleSearch}
            className="food-btn"
            data-test-id="food-search-btn"
          >
            Search
          </button>
          <button
            onClick={() => setAddOpen(true)}
            className="food-btn ml-3"
            data-test-id="food-add-btn"
          >
            Add Food
          </button>
        </div>
      </section> */}
      <div className="container ">
        <h2 className="text-xl lg:text-2xl font-bold text-center pb-7 text-gray-900">
          Featured Meals
        </h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader className="animate-spin" size={28} />{" "}
            <span className="text-gray-text-strong text-lg px-2 font-semibold">
              Loading ...
            </span>
          </div>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : foods.length === 0 ? (
          <div className="empty-state-message flex justify-center items-center min-h-[200px]">
            <Image
              src="/not-found.png"
              alt={"No items available"}
              height={100}
              width={100}
            />
            No items available
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {foods.map((f) => (
                <FoodCard
                  key={f.id}
                  food={{ ...f, price: f.price ?? 2.99 }}
                  onEdit={(food) => {
                    setSelected(food);
                    setEditOpen(true);
                  }}
                  onDelete={(id) => {
                    setSelected(foods.find((x) => x.id === id) ?? null);
                    setDeleteOpen(true);
                  }}
                />
              ))}
            </section>
            {hasMore && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                    dispatch(
                      fetchFoods({ limit, page: nextPage, append: true })
                    ).then((result) => {
                      if ((result.payload as any).data.length < limit) {
                        setHasMore(false);
                      }
                    });
                  }}
                  className="food-btn"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Read More"}
                </button>
              </div>
            )}
          </>
          // </div>

          // {loading ? (
          //   <p>Loading...</p>
          // ) : error ? (
          //   <p className="text-red-600">Error: {error}</p>
          // ) : foods.length === 0 ? (
          //   <div className="empty-state-message">No items available</div>
          // ) : (
          //   <>
          //     <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          //       {foods.map((f) => (
          //         <FoodCard
          //           key={f.id}
          //           food={{ ...f, price: f.price ?? 2.99 }}

          //           onEdit={(food) => {
          //             setSelected(food);
          //             setEditOpen(true);
          //           }}
          //           onDelete={(id) => {
          //             setSelected(foods.find((x) => x.id === id) ?? null);
          //             setDeleteOpen(true);
          //           }}
          //         />
          //       ))}
          //     </section>
          //     {hasMore && (
          //       <div className="mt-6 text-center">
          //         <button
          //           onClick={() => {
          //             const nextPage = currentPage + 1;
          //             setCurrentPage(nextPage);
          //             dispatch(
          //               fetchFoods({ limit, page: nextPage, append: true })
          //             ).then((result) => {
          //               if (result.payload.data.length < limit) {
          //                 setHasMore(false);
          //               }
          //             });
          //           }}
          //           className="food-btn"
          //           disabled={loading}
          //         >
          //           {loading ? "Loading..." : "Read More"}
          //         </button>
          //       </div>
          //     )}
          //   </>
        )}

        <AddEditMealModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onSubmit={handleAdd}
          isSubmitting={loading}
        />
        <AddEditMealModal
          open={editOpen}
          initialValues={selected ?? undefined}
          onClose={() => setEditOpen(false)}
          onSubmit={handleUpdate}
          isSubmitting={loading}
        />
        <DeleteMealModal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
          isDeleting={loading}
        />
      </div>
    </main>
  );
}
