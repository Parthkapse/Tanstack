import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPost, addUser, deleteUser } from '../services/api';

function Dashboard() {
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    address: '',
    age: '',
  });

  const [deleteId, setDeleteId] = useState('');
  const queryClient = useQueryClient();

  // Fetch data using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: fetchPost,
  });

  // Mutation to add user
  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
    queryClient.invalidateQueries(['user']);
    resetForm();
    },
  });

  // Handle Add user form submission
  const handleAddUser = () => {
    const { name, lastName, address, age } = userData;
    if (name && lastName && address && age) {
      addUserMutation.mutate({
        name,
        lastName,
        address,
        age: parseInt(age, 10),
      });
    } else {
      alert('Please fill out all fields');
    }
  };

    

  // Mutation to delete user
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });
  // Handle Delete user action
  const handleDeleteUser = () => {
    if (deleteId) {
      deleteUserMutation.mutate(deleteId);
    } else {
      alert('Please enter an ID to delete');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Reset form after successful user addition
  const resetForm = () => {
    setUserData({
      name: '',
      lastName: '',
      address: '',
      age: '',
    });
  };

  // Loading state
  if (isLoading) {
    return <span>Loading...</span>;
  }

  // Error handling
  if (error) {
    console.error("Error fetching data:", error);
    return <span>Error: {error.message}</span>;
  }

  console.log("Fetched data:", data);  
  const users = data?.data || [];

  return (
    <div style={containerStyle}>
      <h2>UserDetails</h2>
      <div style={inputContainerStyle}>
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={userData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={userData.address}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={userData.age}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      {/* Action Buttons */}
      <div style={buttonContainerStyle}>
        <input
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)} 
          placeholder="Enter ID for Update/Delete"
          style={inputStyle} 
        />
        <div style={buttonRowStyle}>
          <button onClick={handleAddUser} style={buttonStyle}>Add</button>
          <button onClick={handleAddUser} style={buttonStyle}>Update</button>
          <button onClick={handleDeleteUser} style={buttonStyle}>Delete</button>  
        </div>
      </div>

      {/* Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={borderStyle}>ID</th>
            <th style={borderStyle}>Name</th>
            <th style={borderStyle}>Last Name</th>
            <th style={borderStyle}>Address</th>
            <th style={borderStyle}>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.lastName}</td>
                <td style={tdStyle}>{user.address}</td>  
                <td style={tdStyle}>{user.age}</td>  
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={tdStyle}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
const borderStyle = {
  borderBottom: "2px solid #ddd"
}

const containerStyle = {
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  maxWidth: "900px",
  margin: "0 auto",
};


const inputContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "20px",
};


const inputStyle = {
  padding: "10px",
  margin: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  flex: "1",
  minWidth: "150px",
};


const buttonContainerStyle = {
  marginBottom: "20px",
};

const buttonRowStyle = {
  display: "flex",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "1px solid #007bff",
  borderRadius: "5px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const thStyle = {
  backgroundColor: "#f2f2f2",
  padding: "10px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default Dashboard;
