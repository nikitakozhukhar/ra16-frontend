import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/apis/serverApi";

export const fetchAsyncTopSales = createAsyncThunk(
  "products/fetchAsyncTopSales",
  async () => {
    const response = await serverApi.get(
      `top-sales`
    );
   
    return response.data;
  }
);

export const fetchAsyncCatalog = createAsyncThunk(
  "products/fetchAsyncCatalog",
  async () => {
    const response = await serverApi.get(
      `categories`
    );
   
    return response.data;
  }
);

// export const fetchAsyncShows = createAsyncThunk(
//   "cart/fetchAsyncShows",
//   async (term) => {
//     const response = await serverApi.get(
//       `?apiKey=${ApiKey}&s=${term}&type=series`
//     );
//     return response.data;
//   }
// );

// export const fetchAsyncSMovieOrShowsDetail = createAsyncThunk(
//   "cart/fetchAsyncSMovieOrShowsDetail",
//   async (id) => {
//     const response = await serverApi.get(
//       `?apiKey=${ApiKey}&i=${id}&Plot=full`
//     );
//     return response.data;
//   }
// );

const initialState = {
  cart: {},
  topSales: {},
  fetchCategories: {}
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {}
    },
    addToCart: (state, {payload}) => {
      state.cart = payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAsyncTopSales.pending, () => {
      console.log('Pending')
    })
    .addCase(fetchAsyncTopSales.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.topSales = payload
    })
    .addCase(fetchAsyncTopSales.rejected, () => {
      console.log('Rejected!');
    })

    .addCase(fetchAsyncCatalog.pending, () => {
      console.log('Pending')
    })
    .addCase(fetchAsyncCatalog.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.fetchCategories = payload
    })
    .addCase(fetchAsyncCatalog.rejected, () => {
      console.log('Rejected!');
    })
  }
});

export const { removeSelectedMovieOrShow, addToFavorites } = productsSlice.actions;
export const getTopSales = (state) => state.products.topSales;
export const getfetchedCategories = (state) => state.products.fetchCategories;
// export const getAllShows = (state) => state.cart.shows;
// export const getSelectedMovieOrShow = (state) => state.cart.selectedMovieOrShow;
export default productsSlice.reducer;