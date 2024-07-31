import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmailListComponent from '../components/emailList';

function QuizzesPage({employerID, setEmployerID}) {
  
  const [quizzes, setQuizzes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (employerID) {
        setLoading(true);
        try {
          const response = await fetch('http://127.0.0.1:4546/user-quiz', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employer_id: employerID }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          const quizData = {
            quiz_id: data.quiz_id[0],
            title: data.title[0],
            description: data.description[0],
          };
          const transformedQuizzes = quizData.quiz_id.map((id, index) => ({
            quiz_id: id,
            title: quizData.title[index],
            description: quizData.description[index],
          }));

          setQuizzes(transformedQuizzes);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuizzes();
  }, [employerID]);
  
 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
    
    if (confirmDelete) {
      try {
        const response = await fetch('http://127.0.0.1:4546/delete-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quiz_id: id, employer_id: employerID }),
        });
  
        if (response.ok) {
          // Remove the deleted quiz from the quizzes state
          setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz.quiz_id !== id));
        } else {
          console.error('Failed to delete quiz');
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };
  

  const toggleFormVisibility = (id) => {
    setShowForm(!showForm);
    setCurrentQuizId(id);
  };
  //RETURN
  if (loading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!employerID) return null;
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