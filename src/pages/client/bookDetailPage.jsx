import { Badge, Button, Col, Container, Image, Row, Stack } from "react-bootstrap";
import ClientLayout from "../../components/layouts/clientLayout";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBookAction } from "../book/bookActions";
import { Link } from "react-router-dom";
import BookDetailsTab from "../../components/bookDetailsTab";
import BurrowBookModal from "../../components/modal/burrowBookModal";
import useModal from "../../hooks/useModal";
import { format } from 'date-fns';

const BookDetailPage = () => {
  //grab _id from url params
  const {_id} = useParams()
  const { book } = useSelector(state => state.book)
  const { user } = useSelector(state => state.user)

  const isAuthenticated = !!user?._id

  //get book detail for this ID
  const dispatch = useDispatch()

  useEffect(()=>{
    if(_id){
      // call action to get a book
      dispatch(getBookAction(_id))
    }
  }, [_id, dispatch])

  // open burrow book modal
  const {show, handleClose, handleShow } = useModal()

  // Dates
const availableFrom = book?.due_date ? format(new Date(book?.due_date), 'MMMM d, yyyy', '') : ''

  return ( 
    <ClientLayout>
      <Container className="my-2">
        <Row>
          <Col xs={4}>
            <Image src={book.thumbnail} thumbnail />
          </Col>

          <Col xs={8}>
            <Stack gap={1}>
                <div className="fw-bold h1">{book.title}</div>
                <div className="fst-italic">By {book.author}</div>
                <div>Publish Year: {book.publish_year}</div>
                <div><Badge bg="warning">ISBN: {book.isbn}</Badge></div>

                {isAuthenticated && book?.is_available &&
                  <Button variant="outline-primary" className="mt-4" onClick={() => handleShow()} >
                      Burrow Book
                    </Button>
                }
                {!isAuthenticated &&
                  <Link to="/auth" state={{ from: `/book/${_id}`}}>
                      <Button variant="outline-danger" className="mt-4">
                        Login To Borrow Book
                      </Button>
                    </Link>
                }

                {(isAuthenticated && !book?.is_available) 
                  && <Button variant="outline-danger" className="mt-4 fw-bold text-center" disabled>
                      Book Not Available!! <br /> Available From: {availableFrom}
                    </Button>
                }
                
            </Stack>
          </Col>
        </Row>

        <Row className="mt-4">
          <BookDetailsTab description={book.description} />
        </Row>
      </Container>

      <BurrowBookModal show={show} handleClose={handleClose} />
    </ClientLayout>
   );
}
 
export default BookDetailPage;