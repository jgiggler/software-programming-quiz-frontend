// src/CreateQuiz.js
import React, { useState } from 'react';

const CreateQuiz = () => {
  const initialQuestionState = {
    question: '',
    type: 'multiple-choice',
    answers: ['', '', '', ''],
    correctAnswers: [0]
  };

  const [quiz, setQuiz] = useState([initialQuestionState]);

  const handleQuestionChange = (index, event) => {
    const newQuiz = [...quiz];
    newQuiz[index].question = event.target.value;
    setQuiz(newQuiz);
  };

  const handleTypeChange = (index, event) => {
    const newQuiz = [...quiz];
    newQuiz[index].type = event.target.value;

    if (event.target.value === 'true-false') {
      newQuiz[index].answers = ['True', 'False'];
      newQuiz[index].correctAnswers = [0];
    } else {
      newQuiz[index].answers = ['', '', '', ''];
      newQuiz[index].correctAnswers = [0];
    }

    setQuiz(newQuiz);
  };

  const handleAnswerChange = (qIndex, aIndex, event) => {
    const newQuiz = [...quiz];
    newQuiz[qIndex].answers[aIndex] = event.target.value;
    setQuiz(newQuiz);
  };

  const handleCorrectAnswerChange = (qIndex, event) => {
    const newQuiz = [...quiz];
    const aIndex = parseInt(event.target.value, 10);
    const correctAnswers = newQuiz[qIndex].correctAnswers;

    if (newQuiz[qIndex].type === 'select-all') {
      if (event.target.checked) {
        correctAnswers.push(aIndex);
      } else {
        const answerIndex = correctAnswers.indexOf(aIndex);
        if (answerIndex > -1) {
          correctAnswers.splice(answerIndex, 1);
        }
      }
    } else {
      newQuiz[qIndex].correctAnswers = [aIndex];
    }

    setQuiz(newQuiz);
  };

  const handleAddQuestion = () => {
    setQuiz([...quiz, initialQuestionState]);
  };

  const handleRemoveLastQuestion = () => {
    if (quiz.length > 1) {
      setQuiz(quiz.slice(0, -1));
    }
  };
  
  const handleTimerChange = (event) => {
    setQuiz({ ...quiz, timer: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(quiz);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Quiz Name: <input type="text"></input></label>
      <label>Quiz Description: <input type="text"></input></label>
      {quiz.map((q, qIndex) => (
        <div key={qIndex} style={{ marginBottom: '20px' }}>
            <label>
            Type:
            <select value={q.type} onChange={(e) => handleTypeChange(qIndex, e)}>
              <option value="multiple-choice">Multiple Choice</option>
              <option value="select-all">Select All</option>
              <option value="true-false">True/False</option>
            </select>
          </label>
          <label>
            Question {qIndex + 1}:
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e)}
            />
          </label>
          
          {q.answers.map((answer, aIndex) => (
            <div key={aIndex}>
              <label>
                Answer {aIndex + 1}:
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                  disabled={q.type === 'true-false'}
                />
              </label>
            </div>
          ))}
          <label>
            Correct Answer:
            {q.type === 'select-all' ? (
              q.answers.map((answer, aIndex) => (
                <div key={aIndex}>
                  <input
                    type="checkbox"
                    value={aIndex}
                    checked={q.correctAnswers.includes(aIndex)}
                    onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                  />
                  {answer}
                </div>
              ))
            ) : (
              <select value={q.correctAnswers[0]} onChange={(e) => handleCorrectAnswerChange(qIndex, e)}>
                {q.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            )}
          </label>
        </div>
      ))}
      <p>How much time should be allowed to take the quiz?</p>
      <label for='timer'>Minutes </label>
      <input type="number" min="1" id='timer' name='timer' value={quiz.timer} onChange={handleTimerChange}/>
      <p></p>
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
      
      <button type="button" onClick={handleRemoveLastQuestion}>
        Remove Last Question
      </button>
      <button type="submit" onClick={handleSubmit}>Submit Quiz</button>
    </form>
  );
};

export default CreateQuiz;
