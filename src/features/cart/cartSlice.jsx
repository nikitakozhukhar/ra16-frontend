import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/apis/serverApi";

export const fetchAsyncTopSales = createAsyncThunk(
  "cart/fetchAsyncTopSales",
  async () => {
    const response = await serverApi.get(
      `top-sales`
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
  topSales: {}
};

const cartSlice = createSlice({
  name: "cart",
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
  }
});

export const { removeSelectedMovieOrShow, addToFavorites } = cartSlice.actions;
export const getTopSales = (state) => state.cart.topSales;
// export const getAllShows = (state) => state.cart.shows;
// export const getSelectedMovieOrShow = (state) => state.cart.selectedMovieOrShow;
export default cartSlice.reducer;