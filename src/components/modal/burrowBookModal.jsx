/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { add } from "date-fns";
import { useDispatch, useSelector } from 'react-redux';
import { createBurrowAction } from '../../entity/burrow/burrowActions';
// import { createBurrowAction } from '../../entity/burrow/burrowActions';

const BurrowBookModal = (props) => {
  const { show, handleClose } = props
  const [burrowDays, setBurrowDays] = useState(7)

  const { book } = useSelector(state => state.book)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleOnClick = () => {
    // prepare payload to be sent for burrow book
    const burrow = {
      book_id: book?._id,
      book_name: book?.title,
      user_id: user?._id,
      user_name: `${user?.first_name} ${user?.last_name}`,
      due_date: add(new Date(), { days: burrowDays })
    }

    // call action to burrow book
    dispatch(createBurrowAction(burrow))

    // close the modal
    handleClose()
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Burrow Book</Modal.Title>
        </Modal.Header>
        <Modal.Body className='mx-auto'>
          <ButtonGroup>
            <ToggleButton 
              key={7}
              id={7}
              type='radio'
              name="radio"
              variant='outline-info'
              checked= {burrowDays === 7}
              value={7}
              onChange={(e) => setBurrowDays(Number(e.currentTarget.value))}
            >
              1 Week
            </ToggleButton>

            <ToggleButton 
              key={14}
              id={14}
              type='radio'
              name="radio"
              variant='outline-primary'
              checked= {burrowDays === 14}
              value={14}
              onChange={(e) => setBurrowDays(Number(e.currentTarget.value))}
            >
              2 Weeks
            </ToggleButton>

            <ToggleButton
              key={21}
              id={21}
              type='radio'
              name="radio"
              variant='outline-success'
              checked= {burrowDays === 21}
              value={21}
              onChange={(e) => setBurrowDays(Number(e.currentTarget.value))}
            >
              3 Weeks
            </ToggleButton>

            <ToggleButton 
              key={28}
              id={28}
              type='radio'
              name="radio"
              variant='outline-danger'
              checked= {burrowDays === 28}
              value={28}
              onChange={(e) => setBurrowDays(Number(e.currentTarget.value))}
            >
              4 Weeks
            </ToggleButton>
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleOnClick}>Burrow Now</Button>

          <Button variant="outline-danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BurrowBookModal;