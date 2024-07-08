import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({}) {
  const navigate = useNavigate()

  const LoggedIn = true
  if (LoggedIn === false){
    return (
        <>
    <h2>Homepage</h2>
      <p>
        Learn about personal finance, investing, real estate, 
        cryptocurrency and all things related to finance.
      </p>
      <p>To learn things about money Login or Sign Up right now!</p>
      <button className='login-stack'>Login</button>
      <button className='login-stack'>Sign Up</button>
      
        </>

    )
  } else {
    return (
      <>
    <h2>Homepage</h2>
    <p>
      Learn about personal finance, investing, real estate, 
      cryptocurrency and all things related to finance.
    </p>
    <p>Welcome!</p>
    
    </>
    )
  }
  
}

export default HomePage;