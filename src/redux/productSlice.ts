import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../utils/interfaces";

const initialState : InitialState = {product : []}

const slice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      action.payload?.forEach((item) => {
        if (!state.product.find(el=>el.id===item.id)) {
          state.product.push(item);
        }
      });
    },
  },
});
export const { setProduct } = slice.actions;
export default slice.reducer;
