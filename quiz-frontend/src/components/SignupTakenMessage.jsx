import React from 'react';

function Taken({isCorrect, count}){
    if (!isCorrect){
    return <>
        <p className='message2'> Username already taken </p>
        
        </>
    }
}

export default Taken;