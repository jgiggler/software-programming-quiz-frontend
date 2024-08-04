import React, { useState, useEffect } from 'react';


const Quiz = ({ data, candidateID }) => {
    const [answers, setAnswers] = useState(() => {
      const savedAnswers = localStorage.getItem(`answers-${candidateID}`);
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    });
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(() => {
      const savedStartTime = localStorage.getItem(`startTime-${candidateID}`);
      if (savedStartTime) {
        const elapsedTime = Math.floor((Date.now() - new Date(savedStartTime).getTime()) / 1000);
        const totalQuizTime = data.timer * 60;
        return totalQuizTime - elapsedTime;
      }
      return data.timer * 60;
    });
  
    useEffect(() => {
      if (timeLeft <= 0 && !submitted) {
        handleSubmit();
      }
  
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          localStorage.setItem(`timeLeft-${candidateID}`, JSON.stringify(newTime));
          return newTime;
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft, submitted]);
  
    const handleChange = (questionIndex, answer) => {
      const newAnswers = {
        ...answers,
        [questionIndex]: answer
      };
      setAnswers(newAnswers);
      localStorage.setItem(`answers-${candidateID}`, JSON.stringify(newAnswers));
    };
  
    const handleSubmit = async () => {
      setSubmitted(true);
      localStorage.setItem(`quizCompleted-${candidateID}`, JSON.stringify(true));
      localStorage.removeItem(`answers-${candidateID}`);
      localStorage.removeItem(`timeLeft-${candidateID}`);
      localStorage.removeItem(`startTime-${candidateID}`);
  
      try {
        const response = await fetch('http://127.0.0.1:4546/submit-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quiz_id: data.quiz_id,
            employer_id: data.employer_id,
            candidateID: candidateID,
            quizData: answers,
          }),
        });
  
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
                      required
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
                      required
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
                      required
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
                      required
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

export default Quiz;
  