import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginAPI } from "../../api/auth";

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const result = await loginAPI(data);
  return result.data;
});

const userSlice = createSlice({
  name: "userSlice",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      return {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });
  },
});

export default userSlice;
export { asyncLogin };
export const { userSave, userLogout } = userSlice.actions;
