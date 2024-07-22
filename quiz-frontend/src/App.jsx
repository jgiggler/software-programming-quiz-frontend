import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';

import './App.css'
import Nav from './components/Nav';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateQuiz from './pages/CreateQuizPage';
import SignUpPage from './pages/SignUpPage';
import AccountPage from './pages/AccountPage';
import QuizzesPage from './pages/QuizzesPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  const [employerID, setEmployerID] = useState(123)
  
  return (
    <>
    <Router>
    <h1>Software Programming Quiz</h1>
    <div className='sidebar'>
      {<Nav employerID={employerID} setEmployerID={setEmployerID}/>}
    </div>
    <main>
    
    <Routes>
      <Route path='/' element={<HomePage employerID={employerID} setEmployerID={setEmployerID}/>}/>
      <Route path='/login' element={<LoginPage employerID={employerID} setEmployerID={setEmployerID}/>}/>
      <Route path='/create-quiz' element={<CreateQuiz employerID={employerID} setEmployerID={setEmployerID}/>}/>
      <Route path='/signup' element={<SignUpPage employerID={employerID} setEmployerID={setEmployerID}/>}/>
      <Route path='/account-settings' element={<AccountPage employerID={employerID} setEmployerID={setEmployerID}/>}/>
      <Route path='/quizzes' element={<QuizzesPage employerID={employerID} setEmployerID={setEmployerID}/>}/>
      <Route path="/results" element={<ResultsPage/>} />
    </Routes>
    </main>

    </Router>
    </>
  )
}

export default App
