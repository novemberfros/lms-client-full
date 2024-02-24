import { toast } from "react-toastify"
import { createReview, getReviews, updateReview } from "./reviewAxiosHelper"
import { setReviews } from "./reviewSlice"
import { getBurrowsAction } from "../burrow/burrowActions"

// get user burrows
export const getReviewsAction = () => async(dispatch) => {
  const result = await getReviews()

  if(result?.status === "success"){
    dispatch(setReviews(result.data))
  }
}

// create a review
export const createReviewAction = (reviewObj) => async(dispatch) => {
  const result = await createReview(reviewObj)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  // once a revew is submitted, we refetch burrows
  dispatch(getBurrowsAction())
}

// create a review
export const updateReviewAction = (reviewObj) => async(dispatch) => {
  const result = await updateReview(reviewObj)

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  // once a revew is updated, we get all reviews
  dispatch(getReviewsAction())
}