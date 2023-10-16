import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteAPI, loginAPI, registerAPI, updateAPI } from "../../api/auth";

const asyncRegister = createAsyncThunk(
  "userSlice/asyncRegister",
  async (data) => {
    const response = await registerAPI(data);
    return response.data;
  }
);

const asyncLogin = createAsyncThunk("userSlice/asyncLogin", async (data) => {
  const response = await loginAPI(data);

  return response.data;
});

const asyncUpdate = createAsyncThunk("userSlice/asyncUpdate", async (data) => {
  const result = await updateAPI(data);
  return result.data;
});

const asyncDelete = createAsyncThunk("userSlice/asyncDelete", async (data) => {
  const result = await deleteAPI(data);
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
    userReset: (state, action) => {
      return {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(asyncRegister.pending, (state, action) => {})
      .addCase(asyncRegister.rejected, (state, action) => {
        // console.log(action.error); <- 요거 코드 쓰면 에러 객체 뱉어냄
        return null;
      })
      .addCase(asyncRegister.fulfilled, (state, action) => {
        return action.payload;
      });

    builder
      .addCase(asyncLogin.pending, (state, action) => {})
      .addCase(asyncLogin.rejected, (state, action) => {
        return null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        if (action.payload.deleteAccountYN === "N") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }

        return action.payload;
      });

    builder.addCase(asyncUpdate.fulfilled, (state, action) => {
      if (action.payload.token !== "undefined") {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      return action.payload;
    });
    builder.addCase(asyncDelete.fulfilled, (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      userLogout();
      return {};
    });
  },
});

export default userSlice;
export { asyncRegister, asyncLogin, asyncUpdate, asyncDelete };
export const { userSave, userLogout, userReset } = userSlice.actions;
