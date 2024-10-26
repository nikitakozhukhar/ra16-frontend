import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cart: {
  products: []
 }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductInCart: (state, {payload}) => {
      state.cart.products = [...state.cart.products, payload]
    },
  },
});

export const { addProductInCart } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cart;
export default cartSlice.reducer;