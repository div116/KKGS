import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getLoggedInUserinfo, getuserOrdersInfo } from "./userAPI"

export interface UserSliceState {
  userInfo: any,
  orderInfo: any,
  status: "idle" | "loading" | "failed"
}

const initialState: UserSliceState = {
  userInfo: null,
  orderInfo: null,
  status: "idle",
}

export const loggedInUserInfoAsync = createAsyncThunk("user/loggedInUserInfo", async (userId: any) => {
  const response = await getLoggedInUserinfo(userId);
  return response
})

export const userOrdersInfoAsync = createAsyncThunk("user/userOrdersInfo", async (userId: any) => {
  const response = await getuserOrdersInfo(userId);
  return response
})


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {

    })
  }),
  extraReducers: (builder) => {
    builder
      .addCase(loggedInUserInfoAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(loggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.userInfo = action.payload
      })
      .addCase(userOrdersInfoAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(userOrdersInfoAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.orderInfo = action.payload
      })
  }
})

export default userSlice.reducer;

export const loggedInUserinfo = (state: any) => state.user.userInfo;

export const userOrdersInfo = (state: any) => state.user.orderInfo;