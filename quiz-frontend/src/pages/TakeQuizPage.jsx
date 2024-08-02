import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Quiz from '../components/quiz';

const TakeQuizPage = ({ candidateID, setCandidateID }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('candidateID');
    
    if (id && id !== candidateID) {
      setCandidateID(id);
      localStorage.setItem('candidateID', id);
      fetchQuizData(id);
    } else {
      const storedID = localStorage.getItem('candidateID');
      if (storedID) {
        setCandidateID(storedID);
        fetchQuizData(storedID);
      }
    }
  }, [location.search, candidateID]);

  const fetchQuizData = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:4546/show-quiz/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuizData(data);
      const quizStatus = JSON.parse(localStorage.getItem(`quizCompleted-${id}`));
      setQuizCompleted(quizStatus || false);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleShowQuiz = () => {
    setShowQuiz(true);
    localStorage.setItem(`quizStarted-${candidateID}`, JSON.stringify(true));
    localStorage.setItem(`startTime-${candidateID}`, new Date().toISOString());
    navigate(`/show-quiz?candidateID=${candidateID}`);
  };

  if (!candidateID) {
    return <div>Candidate ID not valid. Please contact support.</div>;
  }

  if (quizCompleted) {
    return <div>You have already completed the quiz. Thank you!</div>;
  }

  return (
    <div>
      {showQuiz ? (
        quizData ? <Quiz data={quizData} candidateID={candidateID} /> : <div>Loading quiz...</div>
      ) : (
        <>
          <h2>{quizData?.title || 'Loading...'}</h2>
          <h3>{quizData?.description || 'Loading...'}</h3>
          <h3>Time Allowed: {quizData?.timer || 'Loading...'} Minutes</h3>
          <button onClick={handleShowQuiz}>Start Quiz</button>
        </>
      )}
    </div>
  );
};

export default TakeQuizPage;
