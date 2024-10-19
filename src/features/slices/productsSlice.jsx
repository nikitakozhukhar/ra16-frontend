import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/apis/serverApi";

export const fetchAsyncTopSales = createAsyncThunk(
  "products/fetchAsyncTopSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await serverApi.get(`top-sales`);
      return response.data;
    } catch(err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
   
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
  async (term) => {
    const response = await serverApi.get(
      !term ? `items` : `items?q=${term}`
    );
    return response.data;
  }
);

export const fetchAsyncProductDetails = createAsyncThunk(
  "products/fetchAsyncProductDetails",
  async (id) => {
    const response = await serverApi.get(
      `items/${id}`
    );
    console.log('response.data details', response.data)
    return response.data;
  }
);

const initialState = {
  cart: {},
  topSales: {
    items: [],
    loading: false,
    error: null,
  },
  fetchCategories: {
    items: [],
    loading: false,
    error: null,
  },
  products: {
    items: [],
    loading: false,
    error: null,
  },
  selectedProduct: {
    item: {},
    loading: false,
    error: null,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeSelectedProduct: (state) => {
      state.selectedProduct = {item: {}, loading: false, error: null }
    },
  },
  extraReducers: (builder) => {
    builder

    //получение данных для компонента TopSales
    .addCase(fetchAsyncTopSales.pending, (state) => {
      state.topSales.loading = true;
      state.topSales.error = null;
    })
    .addCase(fetchAsyncTopSales.fulfilled, (state, { payload }) => {
      console.log('Fetch successefully!');
      state.topSales.loading = false;
      state.topSales.items = payload;
    })
    .addCase(fetchAsyncTopSales.rejected, (state, { error }) => {
      console.log('Rejected!');
      state.topSales.loading = false;
      state.topSales.error = error.message;
    })

  //получение данных для компонента Categories 
    .addCase(fetchAsyncCategories.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.fetchCategories =  [{ id: 11, title: 'Все' }, ...payload];
    })
    .addCase(fetchAsyncCategories.rejected, () => {
      console.log('Rejected!');
    })

    //получение данных для компонента Categories 
    .addCase(fetchAsyncProducts.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      state.products = payload
    })
    .addCase(fetchAsyncProducts.rejected, () => {
      console.log('Rejected!');
    })

    //получение данных для компонента ItemCardDetails 
    .addCase(fetchAsyncProductDetails.fulfilled, (state, {payload}) => {
      console.log('Fetch successefully!');
      console.log('selectedProduct', payload);
      state.selectedProduct = payload
    })
    .addCase(fetchAsyncProductDetails.rejected, () => {
      console.log('Rejected!');
    })
  }
});

export const { removeSelectedProduct } = productsSlice.actions;
export const getTopSales = (state) => state.products.topSales;
export const getfetchedCategories = (state) => state.products.fetchCategories;
export const getfetchedProducts = (state) => state.products.products;
export const getfetchedProductDetails = (state) => state.products.selectedProduct;
export default productsSlice.reducer;