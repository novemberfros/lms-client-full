import { toast } from "react-toastify"
import { setBook, setBooks } from "./bookSlice"
import { createBook, getBook, getBooks, updateBook } from "../../axios/bookAxiosHelper"

// get all books
export const getBooksAction = () => async(dispatch) => {
  const result = await getBooks()

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setBooks(result.data))
}

// get a books
export const getBookAction = (_id) => async(dispatch) => {
  const result = await getBook(_id)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setBook(result.data))
}

// create a book
export const createBookAction = (bookObj) => async(dispatch) => {
  const result = await createBook(bookObj)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(getBooksAction())
}

export const updateBookAction = (bookObj) => async(dispatch) => {
  const result = await updateBook(bookObj)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(getBooksAction())
}