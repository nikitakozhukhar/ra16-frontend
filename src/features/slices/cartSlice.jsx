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
      }
      localStorage.setItem('cartProducts', JSON.stringify(state.cart.products))
    },
    deleteProduct: ((state, { payload }) => {
      console.log('payload in deleteProduct: ', payload)
      console.log('state in deleteProduct: ',  state.cart)
      state.cart.products = state.cart.products.filter(product => product.id !== payload)
      
      localStorage.setItem('cartProducts', JSON.stringify(state.cart.products))
    }),
    clearCart: (state, { payload }) => {
      state.cart.products = [];
      localStorage.removeItem("cartProducts");
    }
    
  },
});

export const { addProductInCart, deleteProduct, clearCart } = cartSlice.actions;
export const getCartItems = (state) => state.cart.cart;
export const getProductCount = (state) => state.cart.productCount;
export const getCartState = (state) => state.cart.cart
export default cartSlice.reducer;