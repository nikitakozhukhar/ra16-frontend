import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/apis/serverApi";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const sendOrderFormData = createAsyncThunk(
  "products/fetchAsyncTopSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await serverApi.get(`${BASE_URL}order`);
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
 telephone: '',
 address: '',
 agreement: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addTelephone: ((state, { payload }) => {
      
    })
  },
  extraReducers: (builder) => {
    builder

    //получение данных для компонента TopSales
    .addCase(sendOrderFormData.pending, (state) => {
     
    })
    .addCase(sendOrderFormData.fulfilled, (state, { payload }) => {
     
    })
    .addCase(sendOrderFormData.rejected, (state, { error }) => {
      
    })
}});

export const { addProductInCart, deleteProduct } = orderSlice.actions;
export const getOrderFormData = (state) => state.order.order;
export default orderSlice.reducer;