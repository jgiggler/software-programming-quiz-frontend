import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateQuiz({ employerID, setEmployerID }) {
  const navigateTo = useNavigate();
  const initialQuestionState = () => ({
    question: '',
    type: 'multiple-choice',
    answers: ['', '', '', ''],
    correctAnswers: [0]
  });

  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    employer_id: employerID,
    questions: [initialQuestionState()],
    timer: 1
  });

  const handleTitleChange = (event) => {
    setQuiz({ ...quiz, title: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setQuiz({ ...quiz, description: event.target.value });
  };

  const handleQuestionChange = (index, event) => {
    const newQuiz = [...quiz.questions];
    newQuiz[index].question = event.target.value;
    setQuiz({ ...quiz, questions: newQuiz });
  };

  const handleTypeChange = (index, event) => {
    const newQuiz = [...quiz.questions];
    const newType = event.target.value;
    newQuiz[index].type = newType;

    if (newType === 'true-false') {
      newQuiz[index].answers = ['True', 'False'];
      newQuiz[index].correctAnswers = [0];
    } else if (newType === 'free-form') {
      newQuiz[index].answers = [];
      newQuiz[index].correctAnswers = [''];
    } else {
      newQuiz[index].answers = ['', '', '', ''];
      newQuiz[index].correctAnswers = [0];
    }

    setQuiz({ ...quiz, questions: newQuiz });
  };

  const handleAnswerChange = (qIndex, aIndex, event) => {
    const newQuiz = [...quiz.questions];
    newQuiz[qIndex].answers[aIndex] = event.target.value;
    setQuiz({ ...quiz, questions: newQuiz });
  };

  const handleCorrectAnswerChange = (qIndex, event) => {
    const newQuiz = [...quiz.questions];
    const value = event.target.value;
  
    if (newQuiz[qIndex].type === 'select-all') {
      const correctAnswers = [...newQuiz[qIndex].correctAnswers];
      const numericValue = Number(value);
      const index = correctAnswers.indexOf(numericValue);
      if (event.target.checked) {
        if (index === -1) {
          correctAnswers.push(numericValue);
        }
      } else {
        if (index > -1) {
          correctAnswers.splice(index, 1);
        }
      }
      newQuiz[qIndex].correctAnswers = correctAnswers;
    } else if (newQuiz[qIndex].type === 'free-form') {
      newQuiz[qIndex].correctAnswers = [value];
    } else {
      newQuiz[qIndex].correctAnswers = [Number(value)];
    }
  
    setQuiz({ ...quiz, questions: newQuiz });
  };

  const handleAddQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, initialQuestionState()] });
  };

  const handleRemoveQuestion = (index) => {
    if (quiz.questions.length > 1) {
      const newQuiz = quiz.questions.filter((_, qIndex) => qIndex !== index);
      setQuiz({ ...quiz, questions: newQuiz });
    }
  };

  const handleTimerChange = (event) => {
    setQuiz({ ...quiz, timer: event.target.value });
  };

  const [wait, setWait] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmCreate = window.confirm("Are you sure you want to submit the quiz as is?");
    if (confirmCreate) {
      try {
        setWait("Please Wait, creating quiz...");
        const response = await axios.post('http://127.0.0.1:4546/create-quiz', quiz);
        console.log(response.data);
        navigateTo('/quizzes');
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };

  if (employerID !== undefined) {
    return (
      <>
        <h2>Create a Quiz</h2>
        <form className="quiz-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Quiz Name: 
            <input 
              className="form-input" 
              type="text" 
              value={quiz.title} 
              onChange={handleTitleChange} 
              required 
            />
          </label>
          <label className="form-label">
            Quiz Description: 
            <input 
              className="form-input" 
              type="text" 
              value={quiz.description} 
              onChange={handleDescriptionChange} 
              required 
            />
          </label>
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="question-section">
              <label className="form-label">
                Type:
                <select 
                  className="form-type" 
                  value={q.type} 
                  onChange={(e) => handleTypeChange(qIndex, e)}
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="select-all">Select All</option>
                  <option value="true-false">True/False</option>
                  <option value="free-form">Free Form</option>
                </select>
              </label>
              <label className="form-label">
                Question {qIndex + 1}:
                <input 
                  className="form-input" 
                  type="text" 
                  value={q.question} 
                  onChange={(e) => handleQuestionChange(qIndex, e)} 
                  required 
                />
              </label>
              
              {q.type !== 'free-form' && q.answers.map((answer, aIndex) => (
                <div key={aIndex}>
                  <label className="form-label">
                    Answer {aIndex + 1}:
                    <input
                      className="form-input"
                      type="text"
                      value={answer}
                      onChange={(e) => handleAnswerChange(qIndex, aIndex, e)}
                      disabled={q.type === 'true-false'}
                      required
                    />
                  </label>
                </div>
              ))}
              {q.type !== 'free-form' && (
                <label className="form-label">
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
                    <select 
                      className="form-select" 
                      value={q.correctAnswers[0]} 
                      onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                    >
                      {q.answers.map((answer, index) => (
                        <option key={index} value={index}>
                          {answer}
                        </option>
                      ))}
                    </select>
                  )}
                </label>
              )}
              {q.type === 'free-form' && (
                <label className="form-label">
                  Correct Answer:
                  <input
                    className="form-input"
                    type="text"
                    value={q.correctAnswers[0] || ''}
                    onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                  />
                </label>
              )}
              <button 
                className="button" 
                type="button" 
                onClick={() => handleRemoveQuestion(qIndex)}
              >
                Remove Question
              </button>
            </div>
          ))}
          <button 
            className="button" 
            type="button" 
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
          <label className="form-label">
            Time Allowed (minutes): 
            <input 
              className="form-input" 
              type="number" 
              min="1" 
              value={quiz.timer} 
              onChange={handleTimerChange} 
            />
          </label>
          <button 
            className="button" 
            type="submit"
          >
            Create Quiz
          </button>
          {wait}
        </form>
      </>
    );
  }
}

export default CreateQuiz;
