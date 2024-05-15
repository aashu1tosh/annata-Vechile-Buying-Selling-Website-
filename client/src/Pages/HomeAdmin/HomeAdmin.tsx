import { useEffect, useState } from "react"
import axios from "../../services/instance"
import './HomeAdmin.css'
import { FaWindowClose } from "react-icons/fa";


interface User {
  _id: string,
  name: string;
  email: string;
  role: string;
}


function HomeAdmin() {

  const [users, setUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  useEffect(fetchData, []);

  function fetchData() {
    const token: string | null = localStorage.getItem('user');
    try {
      axios.get<{ users: User[] }>('/user/getall', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
        if (res) {
          // setData(res.data.users);
          console.log(res);
          setUsers(res.data.users);
        }
      }).catch(() => {
        console.log('Promise Error',)
      })
    } catch (error) {
      console.log('Error aayo')
    }
  }

  const deleteUserButton = (_id: string) => {
    const token: string | null = localStorage.getItem('user');
    try {
      axios.delete(`/user/deleteuser/${_id}`, { headers: { Authorization: `Bearer ${token}` } }).then(() => {
        console.log("Delete Sucessfull");
        alert("User Deleted Successfully");
      }).catch(() => {
        console.log("error in promise");
      })
    } catch (error) {
      console.log("Error encountered", error)
    }
  }

  const handlePasswordChangeButton = async (id: string, nPassword: string) => {
    const token: string | null = localStorage.getItem('user');
    console.log(nPassword)
    try {
      await axios.put(`/user/changepassword/${id}`, { password: nPassword }, { headers: { Authorization: `Bearer ${token}` } },)
        .then((res) => {
          console.log(res);
          closeDialog();
          alert(res.data.message);
        }).catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log("Error encounterd", error)
    }

  }

  // Function to handle opening the dialog and setting the selected user
  const openDialog = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  // Function to handle closing the dialog
  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <div>HomeAdmin</div>
      <div>
        {/* <h1>List of Users</h1> */}
        <div className="users-box">
          <ul>

            {
              users.map(user => (
                <li key={user.email}>
                  <div>Name: {user.name}</div>
                  <div>Email: {user.email}</div>
                  <div>Role: {user.role}</div>

                  <button onClick={() => openDialog(user)} id='change-password'>Change Password</button>

                  <button id="delete-user" onClick={() => deleteUserButton(user._id)}>Delete User</button>
                </li>
              ))}

          </ul>
        </div>
      </div>

      {/* Dialog */}
      {dialogOpen && selectedUser && (
        <>
          <div className="backdrop" onClick={closeDialog}></div>
          <dialog open className="center-dialog">
            <FaWindowClose onClick={closeDialog} size={25} style={{ float: "right" }}/><br />
            <p>User Information:</p>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <input type="password" name="" id="" placeholder="Enter the New Password" onKeyDown={e => {
              if (e.key === 'Enter') {
                handlePasswordChangeButton(selectedUser._id, e.target.value);
              }
            }} />
          </dialog>
        </>
      )}

    </>


  )
}

export default HomeAdmin