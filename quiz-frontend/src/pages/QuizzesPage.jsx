import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function QuizzesPage({employerID, setEmployerID}) {
  const [quizzes, setQuizzes] = useState({
    quiz_id: [1, 24, 54],
    title: ["my quiz", "quiz1", "EpicQuiz"],
    description: ["first quiz", "my description", "this will be epic"]
  });
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
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?")
     if (confirmDelete){
      try {
        const response = await fetch(`http://127.0.0.1:4546/delete-quiz/${id}`, { method: 'DELETE' });
  
        if (response.status === 200) {
          setQuizzes((prevQuizzes) => {
            const quizIndex = prevQuizzes.quiz_id.indexOf(id);
            if (quizIndex !== -1) {
              const updatedQuizID = prevQuizzes.quiz_id.filter((_, index) => index !== quizIndex);
              const updatedTitle = prevQuizzes.title.filter((_, index) => index !== quizIndex);
              const updatedDescription = prevQuizzes.description.filter((_, index) => index !== quizIndex);
  
              return {
                quiz_id: updatedQuizID,
                title: updatedTitle,
                description: updatedDescription,
              };
            }
            return prevQuizzes;
          });
        } else {
          console.error('Failed to delete quiz');
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
     }    
  };

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
          {quizzes.quiz_id.map((id, index) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{quizzes.title[index]}</td>
              <td>{quizzes.description[index]}</td>
              <td><Link to={`/results?quiz_id=${id}&employer_id=${employerID}`}>View Results</Link></td>
              <td><button onClick={() => handleDelete(id)}>Delete Quiz</button></td>
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