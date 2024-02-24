import { useState } from "react";

const useModal = (payload = {}) => {
  const [show, setShow] = useState(false)
  const [modalPayload, setModalPayload] = useState(payload)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return ({ 
    show,
    handleClose,
    handleShow,
    modalPayload,
    setModalPayload,
  });
}
 
export default useModal;