import React from 'react';

function TandC({isOpen}){
    if (isOpen){
    return <>
        
        <div className="tandc">
          <h2>Terms and Conditions</h2>
    
          <p>We will only use your email for verification purposes and to send you results from quizzes you have made. We will NOT use it for marketing purposes.
             We do not sell your personal information.</p>
        </div>
        </>
    }
}

export default TandC;