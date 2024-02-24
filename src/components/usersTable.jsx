/* eslint-disable react/prop-types */
import Table from 'react-bootstrap/Table';

const UsersTable = (props) => {
  const { users } = props

  return (
    <>
      <Table striped bordered>
          <thead>
            <tr>
              <th className='col-1'>#</th>
              <th className='col-2'>First Name</th>
              <th className='col-2'>Last Name</th>
              <th className='col-3'>Email</th>
              <th className='col-2'>Phone</th>
              <th className='col-2'>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) =>
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
              </tr>
            )
            }
          </tbody>
        </Table>
      </>
   );
}
 
export default UsersTable;