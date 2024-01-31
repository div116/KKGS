import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { fetchAllProducts, fetchAllProductsByFilter } from "./productAPI"


export interface ProductSliceState {
  products: any
  status: "idle" | "loading" | "failed"
}

const initialState: ProductSliceState = {
  products: [],
  status: "idle",
}

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts', async () => {
  const response : any = await fetchAllProducts()
  return response.data
})

export const fetchAllProductsByFilterAsync = createAsyncThunk('product/fetchAllProductsByFilter', async ({filter, sort} : any) => {
  const response : any = await fetchAllProductsByFilter(filter,sort)
  return response.data
})


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      
    })
  }),
 extraReducers(builder) {
   builder
     .addCase(fetchAllProductsAsync.pending, (state, action) => {
       state.status = "loading"
     })
     .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
       state.status = "idle"
       state.products = action.payload
     })
     .addCase(fetchAllProductsAsync.rejected, (state, action) => {
       state.status = "failed"
     })
     .addCase(fetchAllProductsByFilterAsync.pending, (state, action) => {
       state.status = "loading"
     })
     .addCase(fetchAllProductsByFilterAsync.fulfilled, (state, action) => {
       state.status = "idle"
       state.products = action.payload
     })
     .addCase(fetchAllProductsByFilterAsync.rejected, (state, action) => {
       state.status = "failed"
     })
 },
})


export const {increment } = productSlice.actions

export const selectAllProducts = (state: any) => state.product.products

export default productSlice.reducer;

