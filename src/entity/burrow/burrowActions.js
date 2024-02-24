import { toast } from "react-toastify"
import { createBurrow, getBurrows, returnBurrowedBook } from "./burrowAxiosHelper"
import { getBookAction } from "../../pages/book/bookActions"
import { setBurrows } from "./burrowSlice"

// get user burrows
export const getBurrowsAction = () => async(dispatch) => {
  const result = await getBurrows()

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setBurrows(result.data))
}

// create a burrow
export const createBurrowAction = (burrowObj) => async(dispatch) => {
  const result = await createBurrow(burrowObj)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  // once a burrow is made, we get book details again
  dispatch(getBookAction(burrowObj.book_id))
}

// return a burrowed
export const returnBurrowedBookActioin = (_id) => async(dispatch) => {
  const result = await returnBurrowedBook(_id)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  // once a burrow is returned, we get burrows again
  toast.success(result.message)
  dispatch(getBurrowsAction())
}