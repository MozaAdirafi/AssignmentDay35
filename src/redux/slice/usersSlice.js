import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchusers = createAsyncThunk("users/fetchusers", async () => {
  const response = await fetch("https://reqres.in/api/users");

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.data;
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchusers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchusers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchusers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
