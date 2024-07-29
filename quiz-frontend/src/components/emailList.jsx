import React, { useState } from 'react';

const EmailListComponent = ({ quizId, toggleFormVisibility }) => {
  const [emails, setEmails] = useState(['']);

  const handleEmailChange = (index, event) => {
    const newEmails = [...emails];
    newEmails[index] = event.target.value;
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleSendEmails = () => {
    //post to backend
    console.log({'quiz_id': quizId, 'candidate_emails': emails})
    alert(`Quiz ID ${quizId} sent to ${emails.join(', ')}`);
    toggleFormVisibility(null)
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
            />
        </div>
        ))}
        <button onClick={handleAddEmail}>Add Another Email</button>
        <button onClick={handleSendEmails}>Send Quiz</button>
    </div>   
  );
};

export default EmailListComponent;