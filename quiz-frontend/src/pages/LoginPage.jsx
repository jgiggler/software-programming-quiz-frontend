import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../components/invalid-login-message';

function LoginPage({employerID, setEmployerID}) {
  const navigateTo = useNavigate();
  const [isCorrect, setIsCorrect] = useState(undefined)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const signup = () =>{
    navigateTo("/signup")
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('http://127.0.0.1:4546/login', {method: 'POST',
                                                  headers: {'Content-Type': 'application/json'},
                                                  body: JSON.stringify(formData),});
    
    const data = await response.json();
    console.log(data.message)
  
    if (response.status ===200){
      setEmployerID(data.employer_id);
      setIsCorrect(undefined)
      navigateTo('/');
    }
    else {
      setEmployerID(undefined);
      setIsCorrect(false)

    }
    } catch (error) 
      {console.error('Login failed:', error);
    }
  };

  if (employerID == undefined){
    return (
        <>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required
            value={formData.password} 
            onChange={handleChange} 
          />
        </div>
        {!isCorrect && <Message isCorrect={isCorrect}/>}
        <div className='login-stack'>
        <button className='login' type="submit" onClick={handleSubmit}>Login</button>
        <button className='login' onClick={signup}>Create an Account</button>
        </div>
      </form>
      <p>
      
      </p>
    </div>
      
        </>
    )
  }
}

export default LoginPage;