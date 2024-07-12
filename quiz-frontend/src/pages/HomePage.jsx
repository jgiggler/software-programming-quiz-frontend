import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({}) {
  const navigate = useNavigate()
  const login = () =>{
    navigate("/login")
  };
  const signup = () =>{
    navigate("/signup")
  };
  const LoggedIn = true
  if (LoggedIn === true){
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
    <p>
    A website for testing incoming employment candidates.
    </p>
    <p>Welcome $user (UPDATE USER)</p>
    </>
    )
  }
  
}

export default HomePage;