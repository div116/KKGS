import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchAllProductsByFilter } from "./productAPI"


export interface ProductSliceState {
  products: any,
  categories: any,
  brands: any,
  status: "idle" | "loading" | "failed",
  totalItems: number
}

const initialState: ProductSliceState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0

}

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts', async () => {
  const response : any = await fetchAllProducts()
  return response.data
})

export const fetchAllProductsByFilterAsync = createAsyncThunk('product/fetchAllProductsByFilter', async ({filter, sort, pagination} : any) => {
  const response : any = await fetchAllProductsByFilter(filter,sort, pagination)
  return response
})

export const fetchAllCategoriesAsync = createAsyncThunk('product/fetchAllCategories', async () => {
  const response : any = await fetchAllCategories()
  return response.data
})

export const fetchAllBrandsAsync = createAsyncThunk('product/fetchAllBrands', async () => {
  const response : any = await fetchAllBrands()
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
       state.products = action.payload.products
       state.totalItems = action.payload.totalItems
     })
     .addCase(fetchAllProductsByFilterAsync.rejected, (state, action) => {
       state.status = "failed"
     })
     .addCase(fetchAllCategoriesAsync.pending, (state, action) => {
       state.status = "loading"
     })
     .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
       state.status = "idle"
       state.categories  = action.payload
     })
     .addCase(fetchAllBrandsAsync.pending, (state, action) => {
       state.status = "loading"
     })
     .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
       state.status = "idle"
       state.brands = action.payload
     })
 },
})


export const {increment } = productSlice.actions

export const selectAllProducts = (state: any) => state.product.products

export const selectTotalItems = (state: any) => state.product.totalItems

export const selectAllCategories = (state: any) => state.product.categories

export const selectAllBrands = (state: any) => state.product.brands


export default productSlice.reducer;

