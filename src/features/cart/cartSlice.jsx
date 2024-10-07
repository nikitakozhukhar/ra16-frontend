import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/apis/serverApi";

export const fetchAsyncMovies = createAsyncThunk(
  "cart/fetchAsyncMovies",
  async (term) => {
    const response = await serverApi.get(
      `?apiKey=${ApiKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "cart/fetchAsyncShows",
  async (term) => {
    const response = await serverApi.get(
      `?apiKey=${ApiKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncSMovieOrShowsDetail = createAsyncThunk(
  "cart/fetchAsyncSMovieOrShowsDetail",
  async (id) => {
    const response = await serverApi.get(
      `?apiKey=${ApiKey}&i=${id}&Plot=full`
    );
    return response.data;
  }
);

const initialState = {
  cart: {},
  
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
    .addCase(fetchAsyncMovies.pending, () => {
      console.log('Pending')
    })
    .addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.movies = payload
    })
    .addCase(fetchAsyncMovies.rejected, () => {
      console.log('Rejected!');
    })
    .addCase(fetchAsyncShows.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.shows = payload
    })
    .addCase(fetchAsyncSMovieOrShowsDetail.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.selectedMovieOrShow = payload
    })
  }
});

export const { removeSelectedMovieOrShow, addToFavorites } = cartSlice.actions;
export const getAllMovies = (state) => state.cart.cart;
export const getAllShows = (state) => state.cart.shows;
export const getSelectedMovieOrShow = (state) => state.cart.selectedMovieOrShow;
export default cartSlice.reducer;