"use client";
import { useState } from "react";
import { fetchFoods } from "../store/foods-slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { Bike, Package, Search } from "lucide-react";

const limit = 8;
type DeliveryMode = "delivery" | "pickup";
export function HomePage() {
  const [selectedMode, setSelectedMode] = useState<DeliveryMode>("delivery");

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    items: foods,
    loading,
    error,
  } = useSelector((s: RootState) => s.foods);

  const handleSearch = () => {
    setCurrentPage(1);
    setHasMore(true);
    dispatch(fetchFoods({ search: search || undefined, limit, page: 1 }));
  };

  return (
    <section className="relative bg-gradient-to-br from-orange-400 to-yellow-500 overflow-hidden  ">
      <div className="absolute inset-0 opacity-10">
       
      </div>

      <div className="relative container mx-auto items-center px-4 py-16 lg:py-10 max-w-6xl ">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className=" z-10">
            <div className="space-y-1">
              <h1 className="text-2xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                Are you starving?
              </h1>
              <p className="text-sm lg:text-md text-white pb-6 font-extalight">
                Within a few clicks, find meals that are accessible near you
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-xl py-4 px-10 space-y-6">
              <div className="flex gap-4 p-1 text-sm bg-gray-100 rounded-lg pb-2">
                <button
                  onClick={() => setSelectedMode("delivery")}
                  className={`flex items-center justify-center  gap-2 flex-1 px-2 py-1 rounded-lg font-medium transition-all ${
                    selectedMode === "delivery"
                      ? "bg-white text-orange-500 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Bike className="w-5 h-5" />
                  <span>Delivery</span>
                </button>
                <button
                  onClick={() => setSelectedMode("pickup")}
                  className={`flex items-center justify-center gap-2 flex-1 px-2 py-1 rounded-lg font-medium transition-all ${
                    selectedMode === "pickup"
                      ? "bg-white text-orange-500 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span>Pickup</span>
                </button>
              </div>
              <hr />
              <div className="flex gap-3 ">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-300">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="What do you like to eat today?"
                    id="food-search"
                    className="w-full pl-10 pr-2 py-4 bg-gray-50 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  data-test-id="food-search-btn"
                  className="px-8 py-3 text-sm bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white  rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span>Find Meal</span>
                </button>
              </div>
            </div>
          </div>
          <div className="relative mt-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-full transform hover:scale-105 transition-transform duration-300 w-60 sm:w-50 md:w-66 lg:w-88 mx-auto">
            <div className="w-full aspect-square rounded-full overflow-hidden bg-gray-900">
              <img
                src="/home-image.png"
                alt="Delicious Ramen Noodles"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
