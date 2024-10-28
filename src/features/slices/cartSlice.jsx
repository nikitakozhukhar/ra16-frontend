import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cart: {
  products: [],
 }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductInCart: (state, { payload }) => {
      const existingProduct = state.cart.products.find(
        (product) => product.id === payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += payload.quantity;
      } else {
        state.cart.products.push({ ...payload, quantity: payload.quantity });
      }
    },
    addProductCount: (state, {payload}) => {
      state.cart.productCount += payload
    },
  },
});

export const { addProductInCart, addProductCount } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cart;
export const getProductCount = (state) => state.cart.productCount;
export const getCartState = (state) => state.cart.cart
export default cartSlice.reducer;