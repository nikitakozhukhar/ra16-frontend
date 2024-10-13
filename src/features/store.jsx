import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/productsSlice';
import searchReducer from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})