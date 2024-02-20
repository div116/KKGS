import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { placeOrder, fetchAllOrders, updateOrder } from "./orderAPI"


export interface OrderSliceState {
  orders: any,
  currentOrder: any,
  totalOrders: number
  status: "idle" | "loading" | "failed"
}

const initialState: OrderSliceState = {
  orders: [],
  currentOrder: null,
  totalOrders: 0,
  status: "idle"
}

export const placeOrderAsync = createAsyncThunk("order/placeOrder", async (orderInfo: any) => {
  const response: any = await placeOrder(orderInfo)
  return response
})

export const updateOrderAsync = createAsyncThunk('order/updateOrder', async (order : any) => {
  const response: any = await updateOrder(order);
  return response;
}
);

export const fetchAllOrdersAsync = createAsyncThunk('order/fetchAllOrders', async ({ sort, pagination }: any) => {
  const response: any = await fetchAllOrders(sort, pagination);
  return response;
}
);

export const orderSlice = createSlice({
  name: "counter",
  initialState,
  reducers: create => ({
    clearCurrentOrder: create.reducer(state => {
      state.currentOrder = null
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.orders.push(action.payload)
        state.currentOrder = action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        state.orders[index] = action.payload;
      })

  }

})

export default orderSlice.reducer

export const orders = (state: any) => state.order.orders
export const currentOrder = (state: any) => state.order.currentOrder
export const { clearCurrentOrder } = orderSlice.actions

export const selectTotalOrders = (state) => state.order.totalOrders;