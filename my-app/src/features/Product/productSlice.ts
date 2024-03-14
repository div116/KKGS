import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { addproduct, fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchAllProductsByFilter, fetchProductById, updateProduct } from "./productAPI"


export interface ProductSliceState {
  products: any,
  categories: any,
  brands: any,
  status: "idle" | "loading" | "failed",
  totalItems: number,
  selectedProductByID: any
}

const initialState: ProductSliceState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0,
  selectedProductByID: null
}

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts', async () => {
  const response: any = await fetchAllProducts()
  return response.data
})

export const fetchAllProductsByFilterAsync = createAsyncThunk('product/fetchAllProductsByFilter', async ({ filter, sort, pagination }: any) => {
  const response: any = await fetchAllProductsByFilter(filter, sort, pagination)
  return response
})

export const fetchAllCategoriesAsync = createAsyncThunk('product/fetchAllCategories', async () => {
  const response: any = await fetchAllCategories()
  return response.data
})

export const fetchAllBrandsAsync = createAsyncThunk('product/fetchAllBrands', async () => {
  const response: any = await fetchAllBrands()
  return response.data
})

export const fetchProductByIdAsync = createAsyncThunk('product/fetchProductById', async (id: any) => {
  const response: any = await fetchProductById(id)
  return response.data
})

export const addProductAsync = createAsyncThunk('product/addProduct', async (product: any) => {
  const response: any = await addproduct(product)
  return response.data
})

export const updateProductAsync = createAsyncThunk('product/updateProduct', async ({product, id}: any) => {
  const response: any = await updateProduct(product, id)
  return response.data
})

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: create => ({
    clearSelectedproduct : create.reducer(state => {
      state.selectedProductByID = null
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
        state.categories = action.payload
      })
      .addCase(fetchAllBrandsAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.brands = action.payload
      })
      .addCase(fetchProductByIdAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.selectedProductByID = action.payload
      })
      .addCase(addProductAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.products.push(action.payload)
      })
      .addCase(updateProductAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle"
        let index = state.products.findIndex((item: any) => item.id === action.payload.id)
        state.products[index] = action.payload
      })
  },
})


export const { clearSelectedproduct } = productSlice.actions

export const selectAllProducts = (state: any) => state.product.products

export const selectTotalItems = (state: any) => state.product.totalItems

export const selectAllCategories = (state: any) => state.product.categories

export const selectAllBrands = (state: any) => state.product.brands

export const selectedProduct = (state: any) => state.product.selectedProductByID


export default productSlice.reducer;

