import React, { useState, useEffect } from 'react';

const EmailListComponent = ({ quizId, toggleFormVisibility }) => {
  const [emails, setEmails] = useState(['']);
  const [isFormValid, setIsFormValid] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if all email fields are filled
    setIsFormValid(emails.every(email => email.trim() !== ''));
  }, [emails]);

  const handleEmailChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleSendEmails = async () => {
    if (isFormValid) {
      try {
        const response = await fetch('http://127.0.0.1:4546/send-quiz-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quiz_id: quizId,
            candidate_emails: emails,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setMessage(`Quiz ID ${quizId} sent to ${emails.join(', ')}`);
          toggleFormVisibility(null);
        } else {
          setMessage('Failed to send emails. Please try again.');
        }
      } catch (error) {
        console.error('Error sending emails:', error);
        setMessage('An error occurred. Please try again.');
      }
    } else {
      setMessage('Please fill out all email fields.');
    }
  };

  return (
    <div>
      <h2>Send Quiz ID: {quizId}</h2>
      {emails.map((email, index) => (
        <div key={index}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => handleEmailChange(index, event)}
            required
          />
        </div>
      ))}
      <button onClick={handleAddEmail}>Add Another Email</button>
      <button onClick={handleSendEmails} disabled={!isFormValid}>
        Send Quiz
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailListComponent;
