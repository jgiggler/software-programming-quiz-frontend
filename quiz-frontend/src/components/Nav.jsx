import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import quizLogo from '/quiz_logo.jfif'

function Nav({}) {
    const [count, setCount] = useState(0)

    return (
    <nav className='sidebar'>
        <div>      
            <img src={quizLogo} className="logo" alt="Quiz logo" />      
        </div>
      
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
        
        <button className='logout' >Logout Now</button>
        <div className='social-box'>
            <a className="socials" href='http://twitter.com'>Twitter</a>
        </div>
        <footer>&copy; CS 467</footer>
    </nav>
    );
} 
  
  


export default Nav;