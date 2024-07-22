import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function QuizzesPage({employerID, setEmployerID}) {
  const navigateTo = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);
    try{
      const response = await fetch('http://127.0.0.1:4546/quizzes', {method: 'POST',
                                                  headers: {'Content-Type': 'application/json'},
                                                  body: JSON.stringify(formData),});
    
    const data = await response.json();
    console.log(data.message)
  
    if (response.status ===200){
      setEmployerID(data.employer_id);
      navigateTo('/');
    }
    else {
      setEmployerID(undefined)
      navigateTo('/login')
    }
    } catch (error) 
      {console.error('Login failed:', error);
    }
  };

  const QuizResults = async (e) => {}

  const data = {
    message: "success, return all user quizzes",
    quizzes: {
      quiz_id: [1, 24, 54],
      title: ["my quiz", "quiz1", "EpicQuiz"],
      description: ["first quiz", "my description", "this will be epic"]
    }
  };
  const { quizzes } = data;
  const { quiz_id, title, description } = quizzes;
  if (employerID != undefined){
    return (
    <>
    <div>
      <h2>Quizzes</h2>
      <p>Here is a table of all quizzes you have made. Click 'Results' on one of them to view the results of a given quiz.</p>
    </div>
    <div>
      <h3>Quiz List</h3>
    <div  className='table-container'>
      <table border="1">
        <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {quiz_id.map((id, index) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title[index]}</td>
              <td>{description[index]}</td>
              <td><Link to={`/results?quiz_id=${id}&employer_id=${employerID}`}>View Results</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
    )
  }
}

export default QuizzesPage;