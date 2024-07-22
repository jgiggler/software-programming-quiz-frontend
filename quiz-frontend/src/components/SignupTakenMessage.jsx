import React from 'react';

function Taken({isCorrect}){
    if (isCorrect == false){
    return <>
        <p className='message2'> Username already taken </p>
        
        </>
    }
}

export default Taken;