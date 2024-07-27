import React, { useState, useEffect } from 'react';

const quizData = {
    employer_id: "4103",
    title: "Title of Quiz",
    description: "Description of quiz",
    timer: 1, // Timer in minutes
    questions:[
      {
      answers: ['cat', 'dog', 'bear', 'meow'],
      correct_answers: [1],
      question_text: "Question 1",
      question_type: "multiple-choice"
      },
      {
      answers: ['apple', 'banana', 'cherry', 'date'],
      correct_answers: [2,3],
      question_text: "Question 2",
      question_type: "select-all"
    },
    {
      answers: ['u', 'x', 'y', 'z'],
      correct_answers: [2,3],
      question_text: "Question 3",
      question_type: "free-form"
    }

  ]
};
  
  const Quiz = ({ data, onSubmit }) => {
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(data.timer * 60);
  
    useEffect(() => {
      if (timeLeft <= 0 && !submitted) {
        handleSubmit();
      }
  
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft, submitted]);
  
    const handleChange = (questionIndex, answer) => {
      setAnswers({
        ...answers,
        [questionIndex]: answer
      });
    };
  
    const handleSubmit = () => {
      setSubmitted(true);
      onSubmit(answers);
    };
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
  
    if (submitted) {
      return (
        <div>
          <h3>Thank you for taking our Quiz! We will get back to you shortly.</h3>
        </div>
      );
    }
  
    return (
      <div>
      <div>Time Left: {formatTime(timeLeft)}</div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {data.questions.map((question, index) => (
          <div key={index}>
            <h2>{question.question_text}</h2>
            {question.question_type === 'multiple-choice' && question.answers.map((answer, idx) => (
              <div key={idx}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={idx}
                    checked={answers[index] === idx}
                    onChange={() => handleChange(index, idx)}
                  />
                  {answer}
                </label>
              </div>
            ))}
            {question.question_type === 'select-all' && question.answers.map((answer, idx) => (
              <div key={idx}>
                <label>
                  <input
                    type="checkbox"
                    name={`question-${index}`}
                    value={idx}
                    checked={Array.isArray(answers[index]) && answers[index].includes(idx)}
                    onChange={(e) => {
                      const newAnswers = Array.isArray(answers[index]) ? [...answers[index]] : [];
                      if (e.target.checked) {
                        newAnswers.push(idx);
                      } else {
                        const answerIndex = newAnswers.indexOf(idx);
                        newAnswers.splice(answerIndex, 1);
                      }
                      handleChange(index, newAnswers);
                    }}
                  />
                  {answer}
                </label>
              </div>
            ))}
            {question.question_type === 'true-false' && ['True', 'False'].map((answer, idx) => (
              <div key={idx}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={idx}
                    checked={answers[index] === idx}
                    onChange={() => handleChange(index, idx)}
                  />
                  {answer}
                </label>
              </div>
            ))}
            {question.question_type === 'free-form' && (
              <div>
                <label>
                  <input
                    type="text"
                    name={`question-${index}`}
                    value={answers[index] || ''}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </label>
              </div>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
    );
  };
  

function TakeQuizPage({candidateID, setCandidateID}) {
    const [showQuiz, setShowQuiz] = useState(false);

    const handleShowQuiz = () => {
      setShowQuiz(true);
    };
  
    const handleQuizSubmit = (answers) => {
      console.log('Quiz submitted:', answers);
    };
    if (candidateID != undefined){
    return (
      <div>
        
        {showQuiz ? (
          <Quiz data={quizData} onSubmit={handleQuizSubmit} />
        ) : (
            <>
            <h2>{quizData.title}</h2>
            <h3>{quizData.description}</h3>
            <h3>Time Allowed: {quizData.timer} Minutes</h3>
          <button onClick={handleShowQuiz}>Start Quiz</button>
          </>
        )}
      </div>
    );
    };
};


export default TakeQuizPage;