import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Food } from "../lib/types/food";

const API_BASE = "https://6852821e0594059b23cdd834.mockapi.io";

export const fetchFoods = createAsyncThunk<
  { data: Food[]; append: boolean },
  { search?: string; page?: number; limit?: number; append?: boolean }
>(
  "foods/fetchFoods",
  async (
    { search, page = 1, limit = 8, append = false },
    { rejectWithValue }
  ) => {
    try {
      let url = `${API_BASE}/Food?page=${page}&limit=${limit}`;
      if (search) {
        url += `&name=${encodeURIComponent(search)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
      const data = await res.json();
      const transformedData = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        rating: item.rating,
        image: item.image || item.avatar,
        price: item.price || item.Price,
        restaurant: item.restaurant || {
          name: item.restaurantName,
          logo: item.logo,
          status: item.status || (item.open ? "Open" : "Closed"),
        },
      }));
      return { data: transformedData as Food[], append };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createFoodThunk = createAsyncThunk<Food, Partial<Food>>(
  "foods/createFood",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/Food`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Create error: ${res.status}`);
      const data = await res.json();
      return data as Food;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateFoodThunk = createAsyncThunk<
  Food,
  { id: string; payload: Partial<Food> }
>("foods/updateFood", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_BASE}/Food/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Update error: ${res.status}`);
    const data = await res.json();
    return data as Food;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const deleteFoodThunk = createAsyncThunk<string, string>(
  "foods/deleteFood",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/Food/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete error: ${res.status}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice
type FoodsState = {
  items: Food[];
  loading: boolean;
  error?: string | null;
};

const initialState: FoodsState = {
  items: [],
  loading: false,
  error: null,
};

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFoods.fulfilled,
        (state, action: PayloadAction<{ data: Food[]; append: boolean }>) => {
          state.loading = false;
          if (action.payload.append) {
            state.items = [...state.items, ...action.payload.data];
          } else {
            state.items = action.payload.data;
          }
        }
      )
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // createFoodThunk
      .addCase(createFoodThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createFoodThunk.fulfilled,
        (state, action: PayloadAction<Food>) => {
          state.loading = false;
          state.items.unshift(action.payload);
        }
      )
      .addCase(createFoodThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // updateFoodThunk
      .addCase(updateFoodThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateFoodThunk.fulfilled,
        (state, action: PayloadAction<Food>) => {
          state.loading = false;
          const idx = state.items.findIndex((i) => i.id === action.payload.id);
          if (idx >= 0) state.items[idx] = action.payload;
        }
      )
      .addCase(updateFoodThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // deleteFoodThunk
      .addCase(deleteFoodThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteFoodThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      )
      .addCase(deleteFoodThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default foodsSlice.reducer;
