import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Quiz from '../components/quiz';

const quizData = {
  employer_id: "4103",
  quiz_id: 123,
  title: "Title of Quiz",
  description: "Description of quiz",
  timer: 1, // Timer in minutes
  questions: [
    {
      answers: ['cat', 'dog', 'bear', 'meow'],
      question_text: "Question 1",
      question_type: "multiple-choice"
    },
    {
      answers: ['apple', 'banana', 'cherry', 'date'],
      question_text: "Question 2",
      question_type: "select-all"
    },
    {
      answers: ['u', 'x', 'y', 'z'],
      question_text: "Question 3",
      question_type: "free-form"
    },
    {
      question_text: "Question 4",
      question_type: "true-false"
    }
  ]
};


const TakeQuizPage = ({ candidateID, setCandidateID }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const location = useLocation();
  const navigateTo = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('candidateID');
    
    if (id && id !== candidateID) {
      setCandidateID(id);
      localStorage.setItem('candidateID', JSON.stringify(id));
      fetchQuizData(id);
      console.log(id)
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
      console.log(data); // Log the data here
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
    navigateTo(`/show-quiz?candidateID=${candidateID}`);
  };

  if (!candidateID) {
    return <div>Candidate ID not valid. Please contact support.</div>;
  }

  if (quizCompleted) {
    return <div>You have already completed the quiz. Thank you!</div>;
  }

  if (quizData !== null){
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
  } else {
    return (
      <div>
        No quiz data
      </div>
    )
  }
};

export default TakeQuizPage;