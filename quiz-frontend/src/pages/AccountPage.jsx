import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AccountPage({employerID, setEmployerID}) {
    const navigateTo = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: '',
        employer_id: employerID,
        password: '',
      });
    useEffect(() => {
        // Fetch user details from the backend API and set the state
        // For demonstration, assuming user details are hardcoded
        setUserDetails({
          email: '',
          employer_id: employerID,
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
        e.preventDefault();
        const confirmUpdate = window.confirm("Are you sure you want to update your account details?");
        if (confirmUpdate) {
          try {
            const response = await fetch('http://127.0.0.1:4546/update-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userDetails),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              console.log('Update successful:', data);
              // Handle success, e.g., show a success message or redirect
            } else {
              console.error('Update failed:', data);
              // Handle error, e.g., show an error message
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
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
      <div className='account-settings-container'>
    <h2>Account Settings</h2>
      <p>
        What would you like to do with your account?
      </p>
      <p>Update Account</p>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" placeholder="you@example.com" value={userDetails.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" placeholder="new password" value={userDetails.password} onChange={handleChange} />
        </div>
        <button className='update' type="submit">Update Account</button>
      </form>
      <p>Delete Account</p>
      <button className='delete' onClick={handleDelete} >Delete Account</button>
      </div>
      
      </>

    )
  }
}

export default AccountPage;