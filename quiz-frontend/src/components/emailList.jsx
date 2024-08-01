import React, { useState, useEffect } from 'react';

const EmailListComponent = ({ quizId, toggleFormVisibility }) => {
  const [emails, setEmails] = useState(['']);
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleSendEmails = () => {
    if (isFormValid) {
      // Post to backend
      console.log({ 'quiz_id': quizId, 'candidate_emails': emails });
      alert(`Quiz ID ${quizId} sent to ${emails.join(', ')}`);
      toggleFormVisibility(null);
    } else {
      alert('Please fill out all email fields.');
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
    </div>
  );
};

export default EmailListComponent;
