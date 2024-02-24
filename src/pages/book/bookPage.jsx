import { Stack, Button } from "react-bootstrap";
import CreateOrEditBookModal from "../../components/modal/createOrEditBookModal";
import { useState } from "react";
import BooksTable from "../../components/booksTable";
import useForm from "../../hooks/useForm";


const initialFormData = {
  thumbnail: '',
  title: '',
  author: '',
  publish_year: '',
  isbn: '',
  description: '',
}

const BookPage = () => {
const [showModal, setShowModal] = useState(false)

const modalPayload = useForm(initialFormData)
const { setFormData } = modalPayload

  const openCreateBookModal = () => {
    setFormData(initialFormData)
    setShowModal(true)
  }

  return ( 
    <>
    <Stack direction='horizontal' className='justify-content-between'>
        <input type="text" placeholder="Searchbar" />

        {/* Button To Launch Create Book Modal */}
        <Button 
          variant='success'
          onClick={() => openCreateBookModal()}
        >
          Add Book
        </Button>
      </Stack>

      {/* Books Table */}
      <BooksTable setShowModal={setShowModal} setFormData={setFormData} />

      <CreateOrEditBookModal showModal={showModal} setShowModal={setShowModal} modalPayload={modalPayload} />
    </>
   );
}
 
export default BookPage;