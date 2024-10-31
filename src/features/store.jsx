import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/productsSlice';
import searchReducer from './slices/searchSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    search: searchReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})