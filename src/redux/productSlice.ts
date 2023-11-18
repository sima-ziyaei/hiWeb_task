import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});
export const { setProduct } = slice.actions;
export default slice.reducer;