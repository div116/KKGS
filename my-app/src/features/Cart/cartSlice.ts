import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { addToCart, clearCart, getCartItemsByUser, removeFromCart, updateCart } from "./cartAPI"

export interface CartSliceState {
  cartItems: any
  status: "idle" | "loading" | "failed"
}

const initialState: CartSliceState = {
  cartItems: [],
  status: "idle",
}

export const addToCartAsync = createAsyncThunk("cart/addToCart", async (product: any) => {
  const response: any = await addToCart(product)
  return response
})

export const getCartItemsByUserAsync = createAsyncThunk("cart/getCartItemsByUser", async (userId :any) => {
  const response: any = await getCartItemsByUser(userId)
  return response
})

export const updateCartAsync = createAsyncThunk("cart/updateCart", async (update : any) => {
  const response: any = await updateCart(update)
  return response
})

export const removeFromCartAsync = createAsyncThunk("cart/removeFromCart", async (product: any) => {
  const response: any = await removeFromCart(product)
  return response
})

export const clearCartAsync = createAsyncThunk("cart/clearCart", async (userId: any) => {
  const response: any = await clearCart(userId)
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
        state.cartItems.push(action.payload) 
      })
      .addCase(getCartItemsByUserAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getCartItemsByUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.cartItems = action.payload
      })
      .addCase(updateCartAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle"
        let index = state.cartItems.findIndex((item: any) => item.id === action.payload.id)
        state.cartItems[index] = action.payload
      })
      .addCase(removeFromCartAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle"
        let index = state.cartItems.findIndex((item: any) => item.id === action.payload.id)
        state.cartItems.splice(index, 1)
      })
      .addCase(clearCartAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.cartItems = []
      })
     
  }
})

export default cartSlice.reducer

export const cartItems = (state: any) => state.cart.cartItems
