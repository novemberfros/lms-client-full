import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  burrows: [],
}

const burrowSlice = createSlice({
   name: "burrow",
   initialState,
   reducers: {
    setBurrows: (state, action) => {
      state.burrows = action.payload
    },
   }
})

const { reducer: burrowReducer, actions } = burrowSlice

export const { setBurrows } = actions
export default burrowReducer