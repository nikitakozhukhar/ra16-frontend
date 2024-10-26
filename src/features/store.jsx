import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/productsSlice';
import searchReducer from './slices/searchSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    search: searchReducer,
    cart: cartReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})