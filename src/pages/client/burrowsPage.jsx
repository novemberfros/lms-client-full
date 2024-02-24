import { Button, Container, Table } from "react-bootstrap";
import ClientLayout from "../../components/layouts/clientLayout";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { useEffect } from "react";
import { getBurrowsAction, returnBurrowedBookActioin } from "../../entity/burrow/burrowActions";
import ReviewBookModal from "../../components/modal/reviewBookModal";
import useModal from "../../hooks/useModal";

const BurrowsPage = () => {
  const { burrows } = useSelector(state => state.burrow)

  // get burrows on page load by dispatching getBurrowsAction
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(getBurrowsAction())
  }, [dispatch])

  // return the book | update the burrow
  const handleOnReturnBook = (burrow) => {
    // dispatch action to update burrow
    dispatch(returnBurrowedBookActioin(burrow._id))
  }

  // review modal
  const {show, handleClose, handleShow, modalPayload, setModalPayload} = useModal()

  const handleOnReview = (burrow) =>{
    setModalPayload(burrow)
    handleShow()
  }

  return ( 
    <ClientLayout>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Due Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {burrows.map((burrow, index) => 
              <tr key={burrow._id}>
                <td>{index+1}</td>
                <td>{burrow.book_name}</td>
                <td>{format(new Date(burrow.due_date), 'MMMM d, yyyy', '')}</td>
                <td className="text-center">
                  {!burrow.is_returned && 
                    <Button
                    variant="outline-success"
                    onClick={() => handleOnReturnBook(burrow)}
                    >
                      Return Book
                    </Button>
                  }

                  {burrow.is_returned && !burrow.has_review && 
                    <Button
                    variant="outline-primary"
                    onClick={() => handleOnReview(burrow)}
                    >
                      Review Book
                    </Button>
                  }

                  {burrow.is_returned && burrow.has_review && 
                    <Button
                    variant="outline-danger"
                    disabled
                    >
                      Book Returned
                    </Button>
                  }
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      <ReviewBookModal show={show} handleClose={handleClose} modalPayload={modalPayload} />
    </ClientLayout>
   );
}
 
export default BurrowsPage;