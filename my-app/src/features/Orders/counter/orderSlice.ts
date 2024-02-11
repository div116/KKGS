import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { placeOrder } from "./orderAPI"


export interface OrderSliceState {
  orders: any,
  currentOrder: any,
  status: "idle" | "loading" | "failed"
}

const initialState: OrderSliceState = {
  orders: [],
  currentOrder: null,
  status: "idle"
}

export const placeOrderAsync = createAsyncThunk("order/placeOrder", async (orderInfo: any) => {
  const response: any = await placeOrder(orderInfo)
  console.log("Response", response)
  return response
  
})

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
      console.log("Action payload", action.payload)
      state.currentOrder = action.payload
    })
  }

})

export default orderSlice.reducer

export const orders = (state: any) => state.order.orders

export const currentOrder = (state: any) => state.order.currentOrder

export const { clearCurrentOrder } = orderSlice.actions




