import React, { useState, useEffect } from 'react';

const quizData = {
    employer_id: "4103",
    title: "Title of Quiz",
    description: "Description of quiz",
    timer: 1, // Timer in minutes
    0: {
      answers: ['cat', 'dog', 'bear', 'meow'],
      correct_answers: [1],
      question_text: "Question 1",
      question_type: "multiple-choice"
    },
    1: {
      answers: ['apple', 'banana', 'cherry', 'date'],
      correct_answers: [2],
      question_text: "Question 2",
      question_type: "multiple-choice"
    }
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
  
    const handleChange = (questionIndex, answerIndex) => {
      setAnswers({
        ...answers,
        [questionIndex]: answerIndex
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
          {Object.keys(data).filter(key => !isNaN(key)).map(key => {
            const question = data[key];
            return (
              <div key={key}>
                <h2>{question.question_text}</h2>
                {question.answers.map((answer, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${key}`}
                        value={index}
                        checked={answers[key] === index}
                        onChange={() => handleChange(key, index)}
                      />
                      {answer}
                    </label>
                  </div>
                ))}
              </div>
            );
          })}
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