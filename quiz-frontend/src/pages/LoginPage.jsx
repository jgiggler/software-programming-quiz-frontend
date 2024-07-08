import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({}) {
  const [isCorrect, setisCorrect] = useState(undefined)
  const navigateTo = useNavigate();
  

  const [formData, setFormData] = useState({
    username: '',
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
  
  const handleSubmit = async (e) => {};
  //   e.preventDefault();
  //   console.log('Form submitted with:', formData);
  //   try{
  //     const response = await fetch('http://127.0.0.1:5000/login', {method: 'POST',
  //                                                 headers: {'Content-Type': 'application/json'},
  //                                                 body: JSON.stringify(formData),});
    
  //   const data = await response.json();
  //   console.log(data.message)
    
  //   if (response.status ===200){
  //     setisCorrect(true);
  //     login();
  //     navigateTo('/');
  //   }
  //   else {
  //     setisCorrect(false)
  //     navigateTo('/login')
  //   }
  //   } catch (error) 
  //     {console.error('Login failed:', error);
  //   }
    
    
  // };

    return (
        <>
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required
            value={formData.username} 
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
        <div className='login-stack'>
        <button className='login-stack' type="submit">Login</button>
        <button className='login-stack' onClick={signup}>Create an Account</button>
        </div>
      </form>
      <p>
      {isCorrect !== undefined && <Message isCorrect={isCorrect}/>}
      </p>
    </div>
      
        </>
    )
}

export default LoginPage;