/* eslint-disable react/prop-types */
import { Button, Form, Offcanvas, Stack } from "react-bootstrap";
import CustomInput from "../customInput";
import { useDispatch } from "react-redux";
//import { createUserAction } from "../../pages/auth/userActions";
import { userFormFields } from "./userFormFields";
import { createUserAction } from "../../pages/user/userActions";

const CreateOrEditUserModal = (props) => {
  const { showModal, setShowModal, modalPayload } = props
  
  const { formData, handleOnChange } = modalPayload

  const newRecord = !formData?._id

  const dispatch = useDispatch()

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // call action
    dispatch(createUserAction(formData))
    setShowModal(false)
  }

  return ( 
    <Offcanvas 
      show={showModal} 
      onHide={()=> setShowModal(false)}
      placement="end"
      backdrop="static"
    >
      <Offcanvas.Header closeButton>
          <Offcanvas.Title>{newRecord ? "Create" : "Update"} User</Offcanvas.Title>
      </Offcanvas.Header>

      
        {/* Create or Edit User Form */}
        <Offcanvas.Body className="h-100">
          
          <Form onSubmit={(e) => handleOnSubmit(e)} className="d-flex flex-column justify-content-between h-100">
            <div>
              {userFormFields.map((field, index) =>{
                return(
                  <CustomInput
                    key={index}
                    label = {field.label}
                    handleOnChange= {handleOnChange}
                    inputAttributes= {{
                      type: field.type,
                      name: field.name,
                      value: formData[field.name],
                      required: true,
                      rows: 4
                    }}
                  />)
              })}

              <Form.Group>
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={formData.role}>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                </Form.Select>
              </Form.Group>
            </div>

            <Stack direction="horizontal" gap={1} className="p-2 mt-auto">
              <Button 
                variant="outline-success" 
                className="w-100"
                type="submit"
              >
                {newRecord ? "Create" : "Update"}
              </Button>
              <Button 
                variant="outline-danger" 
                className="w-100"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Form>
      </Offcanvas.Body>

    </Offcanvas>
   );
}
 
export default CreateOrEditUserModal;