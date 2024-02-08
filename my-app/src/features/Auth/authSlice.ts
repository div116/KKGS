import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { createUser, loginUser } from "./authAPI"

export interface AuthSliceState {
  registeredUser: any
  loggedInUser: any
  status: "idle" | "loading" | "failed",
  error: any  
}

const initialState: AuthSliceState = {
  registeredUser: null,
  loggedInUser: null,
  status: "idle",
  error: null
}

export const createUserAsync = createAsyncThunk("user/createUser", async (data: { email: string; password: string }) => {
  const response: any = await createUser(data)
  return response
}
)

export const checkUserAsync = createAsyncThunk("user/checkUser", async (data: { email: string; password: string }) => {
  try {
    const response: any = await loginUser(data)
    return response
  } catch (error) {
    throw error = "Invalid Credentials"
  }
})

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: create => ({

  }),
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.registeredUser = action.payload
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed"
      })
      .addCase(checkUserAsync.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.loggedInUser = action.payload
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error
      })

  }
})

export const User = (state: any) => state.auth.registeredUser

export const loggedUser = (state: any) => state.auth.loggedInUser
export const loginError = (state: any) => state.auth.error

export default authSlice.reducer;




