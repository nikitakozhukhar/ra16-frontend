import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cart: {
  products: [],
  count: null
 }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductInCart: (state, {payload}) => {
      state.cart.products = [...state.cart.products, payload]
    },
    addCountProduct: (state, {payload}) => {
      state.cart.count = payload
    },
  },
});

export const { addProductInCart, addCountProduct } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cart;
export const getCountProduct = (state) => state.cart.count;
export default cartSlice.reducer;