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
  async (_, { rejectWithValue }) => {
    
      try {
        const response = await serverApi.get(`categories`);
        return response.data;
      } catch(err) {
        if (!err.response) {
          throw err
        }
        return rejectWithValue(err.response.data)
      }
    }
);

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetchAsyncProducts",
  async (term, { rejectWithValue }) => {
    try {
      const response = await serverApi.get(!term ? `items` : `items?q=${term}`);
      return response.data;
    } catch(err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
  }
);

export const fetchAsyncProductDetails = createAsyncThunk(
  "products/fetchAsyncProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await serverApi.get(`items/${id}`);
      return response.data;
    } catch(err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
  }
);

export const fetchAsyncProductsByCategory = createAsyncThunk(
  "products/fetchAsyncProductsByCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await serverApi.get(
        id === 11 ? `items` : `items?categoryId=${id}`
      );
      return response.data;
    } catch(err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
  }
);

export const fetchAsyncMoreProducts = createAsyncThunk(
  "products/fetchAsyncMoreProducts",
  async ({id, offset}, { rejectWithValue }) => {
    try {
      const response = await serverApi.get(
        id === 11 ? 
        `items?offset=6` : 
        `items?categoryId=${id}&offset=${offset}`
      );
      
      return response.data;
    } catch(err) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }
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
    button: true,

  },
  selectedProduct: {
    item: {},
    loading: false,
    error: null,
  },
  selectedCategory: {
    category: {},
    items: [],
    loading: false,
    error: null,
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeSelectedProduct: (state) => {
      state.selectedProduct = {item: {}, loading: false, error: null }
    },
    setSelectByCategory: (state, { payload }) => {
      state.selectedCategory.category = payload
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
      state.topSales.loading = false;
      state.topSales.items = payload;
    })
    .addCase(fetchAsyncTopSales.rejected, (state, { error }) => {
      state.topSales.loading = false;
      state.topSales.error = 'Во время запроса "Хитов продаж" произошла ошибка';
    })

    //получение данных для компонента Categories 
    .addCase(fetchAsyncCategories.pending, (state) => {
      state.fetchCategories.loading = true;
      state.fetchCategories.error = null;
    })
    .addCase(fetchAsyncCategories.fulfilled, (state, { payload }) => {
      state.fetchCategories.loading = false;
      state.fetchCategories.items =  [{ id: 11, title: 'Все' }, ...payload];
    })
    .addCase(fetchAsyncCategories.rejected, (state, { error }) => {
      state.fetchCategories.loading = false;
      state.fetchCategories.error = 'Во время запроса категорий произошла ошибка';
    })

    //получение данных для компонента Products 
    .addCase(fetchAsyncProducts.pending, (state) => {
      state.products.loading = true;
      state.products.error = null;
    })
    .addCase(fetchAsyncProducts.fulfilled, (state, {payload}) => {
      state.products.loading = false;
      state.products.items = payload
    })
    .addCase(fetchAsyncProducts.rejected, (state) => {
      state.fetchCategories.loading = false;
      state.fetchCategories.error = 'Во время запроса товаров произошла ошибка';
    })

    //получение данных для компонента ItemCardDetails 
    .addCase(fetchAsyncProductDetails.pending, (state) => {
      state.selectedProduct.loading = true;
      state.selectedProduct.error = null;
    })
    .addCase(fetchAsyncProductDetails.fulfilled, (state, {payload}) => {
      state.selectedProduct.loading = false;
      state.selectedProduct.item = payload;
    })
    .addCase(fetchAsyncProductDetails.rejected, (state) => {
      state.fetchCategories.loading = false;
      state.fetchCategories.error = 'Во время запроса карточки товара произошла ошибка';
    })

    //получение данных для отображения фильтра по категориям 
    .addCase(fetchAsyncProductsByCategory.pending, (state) => {
      state.products.loading = true;
      state.products.error = null;
    })
    .addCase(fetchAsyncProductsByCategory.fulfilled, (state, {payload}) => {
      state.selectedCategory.loading = false;
      state.products.button = true;
      state.products.items = payload;
    })
    .addCase(fetchAsyncProductsByCategory.rejected, (state) => {
      state.selectedCategory.loading = false;
      state.selectedCategory.error = 'Во время запроса карточек товара произошла ошибка';
    })

     //получение дополнительных товаров по выбранной категории 
     .addCase(fetchAsyncMoreProducts.pending, (state) => {
      state.products.loading = true;
      state.products.error = null;
    })
    .addCase(fetchAsyncMoreProducts.fulfilled, (state, {payload}) => {
      state.products.loading = false;
      state.products.items = [...state.products.items, ...payload];

      if (payload.length < 6) {
        state.products.button = false
      }
     
    })
    .addCase(fetchAsyncMoreProducts.rejected, (state) => {
      state.selectedCategory.loading = false;
      state.selectedCategory.error = 'Во время запроса карточек товара произошла ошибка';
    })
  }
});

export const { removeSelectedProduct, setSelectByCategory } = productsSlice.actions;
export const getTopSales = (state) => state.products.topSales;
export const getfetchedCategories = (state) => state.products.fetchCategories;
export const getfetchedProducts = (state) => state.products.products;
export const getfetchedProductDetails = (state) => state.products.selectedProduct;
export const getfetchedProductsByCategory = (state) => state.products.selectedCategory;
export default productsSlice.reducer;