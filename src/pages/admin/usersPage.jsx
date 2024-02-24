import { Button, Stack } from "react-bootstrap";
import UsersTable from "../../components/usersTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersAction } from "../user/userActions";
import CreateOrEditUserModal from "../../components/modal/creatOrEditUserModal";
import useForm from "../../hooks/useForm";

const initialFormData = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
  role: 'admin',
}

const UsersPage = () => {
  const [showModal, setShowModal] = useState(false)

  const formPayload = useForm(initialFormData)
  const { setFormData } = formPayload

  const { users } = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsersAction())
  }, [dispatch])

  // openCreateOrEditUserModal
  const openCreateOrEditUserModal = () => {
    setFormData(initialFormData)
    setShowModal(true)
  }

  return ( 
    <>
    <Stack direction="horizontal" className="justify-content-between">
      <input type="text" placeholder="Search user" />

      <Button variant="success" onClick={openCreateOrEditUserModal }>Add user</Button>
    </Stack>

    {/* Users Table */}
    <UsersTable users={users} />

    <CreateOrEditUserModal  showModal={showModal} setShowModal={setShowModal} modalPayload={formPayload} />
    </>
   );
}
 
export default UsersPage;