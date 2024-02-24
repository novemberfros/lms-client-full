
import { Button, Form, Row, Col } from "react-bootstrap";
import CustomInput from "./customInput";
import useForm from "../hooks/useForm";
import { createUser } from "../axios/userAxiosHelper";
import { toast } from "react-toastify";

const initialFormData = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
  confirm_password: ''
}

const SignupForm = (props) => {
  const {setIsLoginForm} = props

  const { formData, handleOnChange, isLoading, setIsLoading } = useForm(initialFormData)

  const { first_name, last_name, phone, email, password, confirm_password } = formData
  const handleOnSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)

    // password and confirm password check
    if(password !== confirm_password){
      setIsLoading(false)
      return toast.error("Password and confirm password are different!")
    }
    // call axios function to send signup request
    // assignment for students to make a local function to remove confirm password from formData
    // and pass it to create user axios call
    const result = await createUser({
      first_name,
      last_name,
      phone,
      email,
      password,
    })

    setIsLoading(false)

    if(result?.status === "error"){
      return toast.error(result.message)
    }

    toast.success(result.message)
    // set isLoginForm state true to display login form
    setIsLoginForm(true)
  }

  return ( 
    <Form onSubmit={(e)=> handleOnSubmit(e)}>
      <h2 className="text-center mb-4">Create an Account</h2>

      <Row>
        <Col>
          <CustomInput 
            label = "First Name"
            handleOnChange={handleOnChange}
            inputAttributes= {{
              type: 'text',
              name: 'first_name',
              value:formData.name,
              placeholder: 'Enter your first name',
              required: true,
            }}
          />
        </Col>

        <Col>
          <CustomInput 
              label = "Last Name"
              handleOnChange={handleOnChange}
              inputAttributes= {{
                type: 'text',
                name: 'last_name',
                value:formData.last_name,
                placeholder: 'Enter your last name',
                required: true,
              }}
            />
        </Col>
      </Row>

      <CustomInput 
        label = "Phone"
        handleOnChange={handleOnChange}
        inputAttributes= {{
          type: 'tel',
          name: 'phone',
          value:formData.phone,
          placeholder: 'Enter your Phone number',
          required: true
        }}
      />

      <CustomInput 
        label = "Email"
        handleOnChange={handleOnChange}
        inputAttributes= {{
          type: 'email',
          name: 'email',
          value:formData.email,
          placeholder: 'Enter your Email',
          required: true
        }}
      />

      <CustomInput 
        label = "Password"
        handleOnChange= {handleOnChange}
        inputAttributes= {{
          type: 'password',
          name: 'password',
          value: formData.password,
          placeholder: 'Enter a Password',
          required: true
        }}
      />

      <CustomInput 
        label = "Confirm Password"
        handleOnChange= {handleOnChange}
        inputAttributes= {{
          type: 'password',
          name: 'confirm_password',
          value: formData.confirm_password,
          placeholder: 'Enter Password',
          required: true
        }}
      />

          <Button 
            variant="primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sigining Up..." : "Sign up"}
          </Button>
    </Form>
   );
}
 
export default SignupForm;