import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountPage({employerID, setEmployerID}) {
    const navigateTo = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
      });
    useEffect(() => {
        // Fetch user details from the backend API and set the state
        // For demonstration, assuming user details are hardcoded
        setUserDetails({
          email: '',
          password: '',
        });
      }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({
        ...prevState,
        [name]: value,
        }));
    };
    const handleUpdate = async (e) => {
        const confirmUpdate = window.confirm("Are you sure you want to update your account details?");
        if (confirmUpdate) {
        try {
            const response = await axios.put('http://127.0.0.1:4546/update-user', userDetails);
            console.log('Updated details:', response.data);
        } catch (error) {
            console.error('Error updating details:', error);
        }
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
          try {
            const response = await axios.delete('http://127.0.0.1:4546/delete-user', {
              data: {employer_id: employerID},
            });
            if (response.status === 200) {
              console.log('Account deleted');
              setEmployerID(undefined)
              navigateTo("/");
            }

          } catch (error) {
            console.error('Error deleting account:', error);
          }
        }
    };

  if (employerID != undefined){
    return (
        <>
    <h2>Account Settings</h2>
      <p>
        What would you like to do with your account?
      </p>
      <p>Update Account</p>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={userDetails.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={userDetails.password} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
      <p>Delete Account</p>
      <button className='login-stack' onClick={handleDelete} style={{ marginTop: '20px', color: 'red' }}>Delete Account</button>
      
      
        </>
    )
  }
}

export default AccountPage;