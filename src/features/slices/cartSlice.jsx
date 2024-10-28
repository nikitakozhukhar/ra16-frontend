import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cart: {
  products: JSON.parse(localStorage.getItem('cartProducts')) || [],
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
        localStorage.setItem('cartProducts', JSON.stringify(state.cart.products))
      }
    },
  },
});

export const { addProductInCart } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cart;
export const getProductCount = (state) => state.cart.productCount;
export const getCartState = (state) => state.cart.cart
export default cartSlice.reducer;