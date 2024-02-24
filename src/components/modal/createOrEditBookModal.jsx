/* eslint-disable react/prop-types */
import { Button, Form, Offcanvas, Stack } from "react-bootstrap";
import { bookFormFields } from "./bookFormFields";
import CustomInput from "../customInput";
import { useDispatch } from "react-redux";
import { createBookAction, updateBookAction } from "../../pages/book/bookActions";

const CreateOrEditBookModal = (props) => {
  const {showModal, setShowModal, modalPayload} = props

  const { formData, handleOnChange } = modalPayload

  const { _id } = formData
  const newRecord = !_id

  const dispatch = useDispatch()
  const handleOnSubmit = (e) => {
    e.preventDefault()

    // dispatch action
    newRecord ? dispatch(createBookAction(formData)) : dispatch(updateBookAction(formData))

    //close modal
    setShowModal(false)
  }

  return ( 
    <Offcanvas
      show={showModal}
      onHide={() => setShowModal(false)}
      placement="end"
      backdrop="static"
    >

      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{newRecord ? "Create" : "Update"} Book</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Form to create a book */}
        <Form onSubmit={(e) => handleOnSubmit(e)} className="d-flex flex-column justify-content-between h-100">
          <div>
            {bookFormFields.map((field, index) => {
              const keyName = field.type === "textarea" ? 'as' : 'type'

              return (
                <CustomInput
                  key={index}
                  label={field.label}
                  handleOnChange={handleOnChange}
                  inputAttributes={{
                    [keyName]: field.type,
                    name: field.name,
                    value: formData[field.name],
                    rows: 4
                  }}
                />
              )
            })}
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
 
export default CreateOrEditBookModal;