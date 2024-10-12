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

export const fetchAsyncCategories = createAsyncThunk(
  "products/fetchAsyncCategories",
  async () => {
    const response = await serverApi.get(
      `categories`
    );
   
    return response.data;
  }
);

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetchAsyncProducts",
  async () => {
    const response = await serverApi.get(
      `items`
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
  fetchCategories: {},
  products: {},
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

    //получение данных для компонента TopSales
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

  //получение данных для компонента Categories 
    .addCase(fetchAsyncCategories.pending, () => {
      console.log('Pending')
    })
    .addCase(fetchAsyncCategories.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.fetchCategories = payload
    })
    .addCase(fetchAsyncCategories.rejected, () => {
      console.log('Rejected!');
    })

    //получение данных для компонента Categories 
    .addCase(fetchAsyncProducts.pending, () => {
      console.log('Pending')
    })
    .addCase(fetchAsyncProducts.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.products = payload
    })
    .addCase(fetchAsyncProducts.rejected, () => {
      console.log('Rejected!');
    })
  }
});

export const { removeSelectedMovieOrShow, addToFavorites } = productsSlice.actions;
export const getTopSales = (state) => state.products.topSales;
export const getfetchedCategories = (state) => state.products.fetchCategories;
export const getfetchedProducts = (state) => state.products.products;
// export const getAllShows = (state) => state.cart.shows;
// export const getSelectedMovieOrShow = (state) => state.cart.selectedMovieOrShow;
export default productsSlice.reducer;