import axios from "axios";

import { axiosConfig } from "./axiosHelper";
// BASE API URL + USER ENDPOINT
const USER_API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/api/user`

// Signup | User registration
export const createUser = (userObj) => {
  const response = axios.post(USER_API_URL, userObj)
                    .then(res => res.data)
                    .catch(error => { throw error })
                
  return response
}

// Login | User Login
export const loginUser = (userObj) => {
  const response = axios.post(USER_API_URL + "/login", userObj)
                    .then(res => res.data)
                    .catch(error => { throw error })
                
  return response
}

//PRIVATE ROUTES

//GET USER
export const getUser = () => {
  const response = axios.get(USER_API_URL, {
                      headers: {
                        Authorization: sessionStorage.getItem("accessJWT")
                      }
                    })
                    .then(res => res.data)
                    .catch(error => { throw error })
                
  return response
}

// GET NEW ACCESS TOKEN
export const getAccessToken = () => {
  const response = axios.get(USER_API_URL + "/accessjwt", {
                      headers: {
                        Authorization: localStorage.getItem("refreshJWT")
                      }
                    })
                    .then(res => res.data)
                    .catch(error => { throw error })
                
  return response
}

// Logout User
export const logoutUser = (email, accessJWT) => {
  const response = axios.post(USER_API_URL + "/logout", {email, accessJWT})
                    .then(res => res.data)
                    .catch(error => { throw error })
                
  return response
}

// PRIVATE ROUTE
export const getUsers = () => {
  const response = axios.get(`${USER_API_URL}/users`, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

// CreateUserByAdmin
export const createUserByAdmin = (userObj) => {

  const response = axios.post(`${USER_API_URL}/createUser`, userObj, axiosConfig())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}