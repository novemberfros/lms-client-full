import { Button, Form } from "react-bootstrap";
import CustomInput from "./customInput";
import useForm from "../hooks/useForm";
import { loginUser } from "../axios/userAxiosHelper";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginAction, getUserAction } from "../pages/user/userActions";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const initialFormData = {
  email: '',
  password: ''
}
const LoginForm = () => {
  const { formData, handleOnChange, isLoading, setIsLoading } = useForm(initialFormData)
  const { email, password }  =formData

  const dispatch = useDispatch()
  // Implement auto login system 
  // redirect to required path once a user is logged in
  // Saturday Class
  // handle on Submit function
  const handleOnSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)

    const result = await loginUser(formData)

    if(result?.error){
      setIsLoading(false)
      toast.error(result.message || "Invalid Creddentials!")
    }

    // if success
    
    //store accessJWT in session storage
    // store refreshJWT in local storage
    sessionStorage.setItem("accessJWT", result.data.accessJWT)
    localStorage.setItem("refreshJWT", result.data.refreshJWT)

    // Once logged in and tokens saved, make request to get
    // private route request, send access token with request
    dispatch(getUserAction())
    setIsLoading(false)
  }

  // Logic to redirect user to required path once logged in
  const { user }  = useSelector(state => state.user)
  const navigate = useNavigate()

  // for redirect, first know where the user has come in login page
  const { state } = useLocation()
  console.log('state',state);
  const fromLocation = state?.from ? state.from : '/admin'

  useEffect(()=>{
    // redirect to required route
    if(user?._id) { navigate(fromLocation)}

    // if not logged in, try to auto login
    if(!user?._id) { dispatch(autoLoginAction())}
  }, [user?._id, navigate, dispatch, fromLocation])

  return ( 
    <Form onSubmit={(e) => handleOnSubmit(e)}>
      <CustomInput 
        label = "Email"
        handleOnChange={handleOnChange}
        inputAttributes= {{
          type: 'email',
          name: 'email',
          value: email,
          placeholder: 'Enter your Email',
          required: true
        }}
      />

      <CustomInput 
        label = "Password"
        handleOnChange={handleOnChange}
        inputAttributes= {{
          type: 'password',
          name: 'password',
          value: password,
          placeholder: 'Enter a Password',
          required: true
        }}
      />

      <Button 
        variant="primary" 
        type="submit"
        disabled={isLoading}
        >
          {isLoading ? "Logging in...": "Login"}
        </Button>
    </Form>
   );
}
 
export default LoginForm;