import React from 'react';

function Message({isCorrect}){
    if (isCorrect === false){

        return <>
    <p className='message2'> Invalid username or password </p>
        
        </>
    }
}

export default Message;