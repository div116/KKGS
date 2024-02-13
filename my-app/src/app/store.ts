import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/Product/productSlice"
import authReducer from "../features/Auth/authSlice"
import cartReducer from "../features/Cart/cartSlice"
import orderReducer from "../features/Orders/Orders/orderSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer
  }
})