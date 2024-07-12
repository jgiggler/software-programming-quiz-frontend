import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';

import './App.css'
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateQuiz from './pages/CreateQuizPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  

  return (
    <>
    <Router>
    <h1>Software Programming Quiz</h1>
    <div className='sidebar'>
      {<Nav/>}
    </div>
    <main>
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/create-quiz' element={<CreateQuiz/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
    </Routes>
    </main>

    </Router>
    </>
  )
}

export default App
