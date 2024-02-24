import axios from "axios";

import { axiosConfig } from "../../axios/axiosHelper";

// Burrow API URL
const REVIEW_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/review`

// PUBLIC ROUTES
// GET REVIEWS
export const getReviews = () => {
  const response = axios.get(REVIEW_API_URL, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

// PRIVATE ROUTES

// CREATE Review
export const createReview = (reviewObj) => {
  const response = axios.post(REVIEW_API_URL, reviewObj, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

export const updateReview = (reviewObj) => {
  const response = axios.patch(`${REVIEW_API_URL}/${reviewObj._id}`, reviewObj, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}