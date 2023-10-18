import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./userlist.css"
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the user list from your server
    axios.get( process.env.REACT_APP_BASE_URL+"/api/user/get-all-user")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching user list:', error);
      });
  }, []);

  const deleteUser = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
   
    axios.post( process.env.REACT_APP_BASE_URL+`/api/user/delete-user/${userId}`)
      .then(() => {
       
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name || user.organisationName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user._id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
