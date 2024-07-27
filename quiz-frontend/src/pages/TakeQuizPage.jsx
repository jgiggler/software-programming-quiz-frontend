import React, { useState, useEffect } from 'react';

const quizData = {
    employer_id: "4103",
    quiz_id : 123,
    title: "Title of Quiz",
    description: "Description of quiz",
    timer: 1, // Timer in minutes
    questions:[
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
  
  const Quiz = ({ data, candidateID }) => {
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
  
    const handleSubmit = async () => {
      setSubmitted(true);
      console.log({
        quiz_id: quizData.quiz_id,
        candidateID: candidateID,
        quizData: answers,
      })
      try {
        const response = await fetch('http://127.0.0.1:4546/submit-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quiz_id: quizData.quiz_id,
            candidateID: candidateID,
            quizData: answers,
          }),
        });
        
        const data = await response.json();
        console.log(data)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        console.log('Quiz submitted successfully:', result);
      } catch (error) {
        console.error('Error submitting quiz:', error);
      }
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
                    value={answer}
                    checked={answers[index] === answer}
                    onChange={() => handleChange(index, answer)}
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
                    value={answer}
                    checked={Array.isArray(answers[index]) && answers[index].includes(answer)}
                    onChange={(e) => {
                      const newAnswers = Array.isArray(answers[index]) ? [...answers[index]] : [];
                      if (e.target.checked) {
                        newAnswers.push(answer);
                      } else {
                        const answerIndex = newAnswers.indexOf(answer);
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
                    value={answer}
                    checked={answers[index] === answer}
                    onChange={() => handleChange(index, answer)}
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
    
    if (candidateID != undefined){
    return (
      <div>
        
        {showQuiz ? (
          <Quiz data={quizData} candidateID={candidateID} />
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