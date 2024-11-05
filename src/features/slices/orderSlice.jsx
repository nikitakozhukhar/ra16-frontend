import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverApi from "../../common/apis/serverApi";

export const sendOrderFormData = createAsyncThunk(
  "order/sendOrderFormData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await serverApi.post(`/order`, {
        owner: {
          phone: data.owner.phone,
          address: data.owner.address,
        },
        items: data.items,
      });
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
  owner: {
    phone: '',
    address: '',
  },
  items: [],
  status: 'idle',
  successMessage: '',
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addFormData: ((state, { payload }) => {
      const [key] = Object.keys(payload)
      state.owner[key] = payload[key]
    }),
    setProduct: (state, { payload }) => {
      state.items = payload;
    },
    clearOrderState: (state) => {
      state.owner = { phone: "", address: "" };
      state.items = [];
      state.status = "idle";
      state.successMessage = "Заказ успешно оформлен!";
    },
  },
  extraReducers: (builder) => {
    builder

    .addCase(sendOrderFormData.pending, (state) => {
      state.status = "loading";
      state.successMessage = "";
    })
    .addCase(sendOrderFormData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.successMessage = "Заказ успешно оформлен!";
    })
    .addCase(sendOrderFormData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    })
}});

export const { addFormData, setProduct, clearOrderState } = orderSlice.actions;
export const getOrderFormData = (state) => state.order;
export default orderSlice.reducer;