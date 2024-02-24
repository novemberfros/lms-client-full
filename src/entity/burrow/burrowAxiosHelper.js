import axios from "axios";

import { axiosConfig } from "../../axios/axiosHelper";


// Burrow API URL
const BURROW_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/burrow`


// PRIVATE ROUTES
// GET BURROWS FOR LOGGED IN USER
export const getBurrows = () => {
  const response = axios.get(BURROW_API_URL, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

// CREATE BURROW
export const createBurrow = (burrowObj) => {
  const response = axios.post(BURROW_API_URL, burrowObj, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

// UPDATE BURROW
export const returnBurrowedBook = (_id) => {
  const response = axios.patch(`${BURROW_API_URL}/${_id}`, {}, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}