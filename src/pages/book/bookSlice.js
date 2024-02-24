import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  book: {},
  books: [],
}

const bookSlice = createSlice({
   name: "book",
   initialState,
   reducers: {
    setBook: (state, action) => {
      state.book = action.payload
    },
    setBooks: (state, action) => {
      state.books = action.payload
    },
   }
})

const { reducer: bookReducer, actions } = bookSlice

export const { setBook, setBooks } = actions
export default bookReducer