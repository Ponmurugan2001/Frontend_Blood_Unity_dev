import { createSlice } from "@reduxjs/toolkit";

//alertslice
export const alertsSlice = createSlice({
  name: "alerts",
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

//exporting reducers from the alertslice
export const { showLoading, hideLoading } = alertsSlice.actions;
