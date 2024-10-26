import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cart: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductInCart: (state, {payload}) => {
      state.cart = {payload}
    },
  },
});

export const { addProductInCart } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cart;
export default cartSlice.reducer;