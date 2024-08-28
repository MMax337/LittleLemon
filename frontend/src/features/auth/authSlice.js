import { createSlice } from "@reduxjs/toolkit";
import { register, login, checkAuthStatus, logout } from "./authActions";

const authSlice = createSlice({
  name: "auth",
  initialState:{
    value: {
      isAuthenticated: false,
      loading: true,
      error: '',
    }
  },

  extraReducers:  (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.value.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.value.isAuthenticated = true;
        state.value.loading = false;
        state.value.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.value.loading = false;
        state.value.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.value.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.value.isAuthenticated = true;
        state.value.loading = false;
        state.value.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.value.loading = false;
        state.value.error = action.payload;
      })
      .addCase(checkAuthStatus.pending, (state, action) => {
        state.value.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.value.isAuthenticated = true;
        state.value.loading = false;
        state.value.error = action.payload;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.value.loading = false;
        state.value.isAuthenticated = false;
        state.value.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.value.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.value.isAuthenticated = false;
        state.value.error = action.payload;
      })
  }
})


export default authSlice.reducer;