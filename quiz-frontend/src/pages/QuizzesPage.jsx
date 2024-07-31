import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmailListComponent from '../components/emailList';

function QuizzesPage({employerID, setEmployerID}) {
  
  const [quizzes, setQuizzes] = useState(null);
  useEffect(() => {
    if (employerID) {
      const employer_id = { employer_id: employerID };
      fetch('http://127.0.0.1:4546/user-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employer_id),
      })
        .then(response => response.json())
        .then(data => {
          const quizData = {
            quiz_id: data.quiz_id[0],
            title: data.title[0],
            description: data.description[0],
          };

          // Combine into an array of quiz objects
          const transformedQuizzes = quizData.quiz_id.map((id, index) => ({
            quiz_id: id,
            title: quizData.title[index],
            description: quizData.description[index],
          }));

          setQuizzes(transformedQuizzes);
        })
        .catch(error => console.error('Error fetching quizzes:', error));
    }
  }, [employerID]);
  


 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?")
     if (confirmDelete){
      try {
        const response = await fetch(`http://127.0.0.1:4546/delete-quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({quiz_id: id, employer_id: employerID}),
        });
        if (response.status === 200) {
          setQuizzes((prevQuizzes) => {
            if (!prevQuizzes || !Array.isArray(prevQuizzes.quiz_id)) {
              console.error('Invalid quizzes structure');
              return prevQuizzes;
            }
            
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
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = (id) => {
    setShowForm(!showForm);
    setCurrentQuizId(id);
  };
  //RETURN

  if (employerID != undefined){
    if (!quizzes) {
      return <div>Loading quizzes...</div>;
    }
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
                {quizzes.length > 0 ? (
                  quizzes.map(quiz => (
                    <tr key={quiz.quiz_id}>
                      <td>{quiz.quiz_id}</td>
                      <td>{quiz.title}</td>
                      <td>{quiz.description}</td>
                      <td>
                        <Link to={`/results?quiz_id=${quiz.quiz_id}&employer_id=${employerID}`}>View Results</Link>
                      </td>
                      <td>
                        <button onClick={() => toggleFormVisibility(quiz.quiz_id)}>
                          Send Quiz {quiz.quiz_id} to Candidates
                        </button>
                        <button onClick={() => handleDelete(quiz.quiz_id)}>Delete Quiz</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No quizzes available.</td>
                  </tr>
                )}
              </tbody>
      </table>
    </div>
    {showForm && currentQuizId && (
        <EmailListComponent quizId={currentQuizId} toggleFormVisibility={toggleFormVisibility} />
      )}
    </div>
    </>
    )
  }
}

export default QuizzesPage;