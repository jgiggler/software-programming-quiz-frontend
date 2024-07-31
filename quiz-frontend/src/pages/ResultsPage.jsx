import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const resultsData = {
    message: "success",
    candidate_email: ["abc@gmail.com", "xyz@hotmail.com"],
    grades: [0.95, 0.85]
  };

function ResultsPage({employerID}){
  const [resultsData, setResultsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(useLocation().search);
  const quizId = query.get('quiz_id');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:4546/quiz-results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({quiz_id: quizId, employer_id: employerID}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResultsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId, employerID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!resultsData || !resultsData.candidate_email || !resultsData.grades) return <div>No data available</div>;

  const { candidate_email, grades } = resultsData;

  return (
    <div>
      <h2>Results for Quiz {quizId}</h2>
      <div className='table-container'>
        <table border="1">
          <thead>
            <tr>
              <th>Candidate Email</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
          {(candidate_email.length > 0 && grades.length > 0) ? (
              candidate_email.map((email, index) => (
                <tr key={index}>
                  <td>{email}</td>
                  <td>{grades[index]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default ResultsPage;