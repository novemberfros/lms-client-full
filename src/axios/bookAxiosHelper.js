import axios from "axios";

import { axiosConfig } from "./axiosHelper";

// BOOK API URL

const BOOK_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/book`

// public route
export const getBooks = () => {
  const response = axios.get(BOOK_API_URL)
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

export const getBook = (_id) => {
  const response = axios.get(`${BOOK_API_URL}/${_id}`)
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

// private route
export const createBook = (bookObj) => {
  const response = axios.post(BOOK_API_URL, bookObj, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

export const updateBook = (bookObj) => {
  const response = axios.patch(BOOK_API_URL, bookObj, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}