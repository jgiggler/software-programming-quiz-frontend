import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({employerID, setEmployerID}) {
  
  const navigate = useNavigate()
  const login = () =>{
    navigate("/login")
  };
  const signup = () =>{
    navigate("/signup")
  };
  const LoggedIn = true
  if (employerID == undefined){
    return (
        <>
    <h2>Homepage</h2>
      <p>
        A website for testing incoming employment candidates.
      </p>
      <p>All you have to do is create a quiz then you can send a quiz link to any candidate</p>
      <p>To get started <button className='login-stack' onClick={login}>Login</button> or <button className='login-stack' onClick={signup}>Sign Up</button> right now!</p>
      
        </>

    )
  } else {
    return (
      <>
    <h2>Homepage</h2>

    <h3>Welcome Employer #{employerID}</h3>
    <p>Use the tab on the left to create a quiz, view existing quizzes you have made or update your account information.</p>
    </>
    )
  }
}

export default HomePage;