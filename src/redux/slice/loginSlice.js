import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUserAsync = createAsyncThunk(
  "authentication/loginUser",
  async (userCredentials) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      if (!response.ok) {
        throw new Error("Login Failed");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error in loginUserAsync:", error);
      throw error;
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    authToken: null,
    requestStatus: "idle",
    errorMessage: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.requestStatus = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        state.authToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.error.message;
      });
  },
});

export default authenticationSlice.reducer;
