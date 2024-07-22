import React from 'react';
import { useLocation } from 'react-router-dom';

const resultsData = {
    message: "success",
    candidate_email: ["abc@gmail.com", "xyz@hotmail.com"],
    grades: [0.95, 0.85]
  };

const ResultsPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const quizId = query.get('quiz_id');
  const employerId = query.get('employer_id');

  const { candidate_email, grades } = resultsData;

  return (
    <div>
      <h2>Results for Quiz {quizId}</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Candidate Email</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {candidate_email.map((email, index) => (
            <tr key={index}>
              <td>{email}</td>
              <td>{grades[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsPage;