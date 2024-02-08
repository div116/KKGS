import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { addToCart, getCartItemsByUser } from "./cartAPI"

export interface CartSliceState {
  cartItem: any
  addedCartItems: any
  status: "idle" | "loading" | "failed"
}

const initialState: CartSliceState = {
  cartItem: [],
  addedCartItems: [],
  status: "idle",
}

export const addToCartAsync = createAsyncThunk("cart/addToCart", async (product: any) => {
  const response: any = await addToCart(product)
  return response
})

export const getCartItemsByUserAsync = createAsyncThunk("cart/getCartItems", async (userId :any) => {
  const response: any = await getCartItemsByUser(userId)
  return response
})

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      
    })
  }),
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.cartItem = action.payload
      })
      .addCase(getCartItemsByUserAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getCartItemsByUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.addedCartItems = action.payload
      })
  }
})

export default cartSlice.reducer

export const cartItems = (state: any) => state.cart.cartItem

export const getaddedCartItems = (state: any) => state.cart.addedCartItems