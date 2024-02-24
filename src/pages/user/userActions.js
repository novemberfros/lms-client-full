import { toast } from "react-toastify"
import { createUserByAdmin, getAccessToken, getUser, getUsers, logoutUser } from "../../axios/userAxiosHelper"
import { setUser, setUsers } from "./userSlice"

export const getUserAction = () => async(dispatch) => {
  // call axios to get the user
  const result = await getUser()

  if(result?.error){
    return toast.error("Cannot fetch user")
  }

  dispatch(setUser(result.data))
}

// autologin

export const autoLoginAction = () => async(dispatch) => {
  // check if we have access token
  const accessJWT = sessionStorage.getItem("accessJWT")
  const refreshJWT = localStorage.getItem("refreshJWT")

  // if no  access token present, get me a new access token based on refresh token
  if(!accessJWT && refreshJWT){
    //call axios to get new access token
    const result = await getAccessToken()

    if(result.status === "success") {
      // store new access token
      sessionStorage.setItem("accessJWT", result.data)
      dispatch(getUserAction())
      return
    }
  }

  // if access token present, get me a user
  dispatch(getUserAction())
  
}

// logout user
export const logoutUserAction = (email) => async(dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT")

  // remove tokens from storage
  sessionStorage.removeItem("accessJWT")
  localStorage.removeItem("refreshJWT")

  // clear state
  dispatch(setUser({}))

  // call api to delete session and update user's refesh token
  const result = await logoutUser(email, accessJWT)

  if(result?.status === "success"){
    return toast.success(result.message)
  }
}

// only admin can get all users
// get all users
export const getUsersAction = () => async(dispatch) => {
  const result = await getUsers()

  if(result?.status === "error"){
    return toast.error(result.message)
  }

  dispatch(setUsers(result.data))
}

// Create User Action
export const createUserAction = (userObj) => async (dispatch) => {
  const result = await createUserByAdmin(userObj)

  if(result.error){
    return toast.error("Could not create User!")
  }

  dispatch(getUsersAction())
  toast.success("User Created!")
};