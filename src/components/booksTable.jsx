import { Button, Stack, Table } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";

const BooksTable = (props) => {
  const { setShowModal, setFormData } = props

  const { books } = useSelector(state => state.book)

  const handleOpenModal = (book) => {
    setFormData({
      _id: book._id,
      thumbnail: book.thumbnail,
      title: book.title,
      author: book.author,
      publish_year: book.publish_year,
      isbn: book.isbn,
      description: book.description,
    })
    setShowModal(true)
  }

  return ( 
    <Table striped bordered>
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-2">Thumbnail</th>
          <th className="col-2">Title</th>
          <th className="col-5">Description</th>
          <th className="col-2 text-center">Actions</th>
        </tr>
        </thead>

        <tbody>
          {books.map((book, index) =>
                <tr key={book._id}>
                  <td>{index+1}</td>
                  <td><img src={book.thumbnail} className='img-thumbnail'  alt='BookImage'/></td>
                  <td className='fw-bold'>
                    {book.title} <br />
                    {book.author}
                  </td>
                  <td>{book.description}</td>
                  <td>
                    <Stack direction='horizontal' gap={2} className='p-2 justify-content-center'>
                      <Button variant='outline-light' onClick={() => handleOpenModal(book)}>
                        <BsPencil color='green' />
                      </Button>
                      <BsTrash color='red' />
                    </Stack>
                  </td>
                </tr>
              )
            }
        </tbody>
    </Table>
   );
}
 
export default BooksTable;