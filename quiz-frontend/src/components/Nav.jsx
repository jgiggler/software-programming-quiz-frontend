import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import quizLogo from '/quiz_logo.jfif';

function Nav({employerID, setEmployerID, candidateID, setCandidateID}) {
    const navigateTo = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (candidateID !== undefined && location.pathname === '/show-quiz') {
            const params = new URLSearchParams(location.search);
            params.set('candidateID', candidateID);
            const newPath = `${location.pathname}?${params.toString()}`;
            if (location.search !== `?${params.toString()}`) {
                navigateTo(newPath, { replace: true });
            }
        }
    }, [candidateID, location.pathname, location.search, navigateTo]);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout){
            setEmployerID(undefined);
            navigateTo('/');
        }
    };

    const handleReset = () => {
        setEmployerID(undefined);
        setCandidateID(undefined);
        navigateTo('/');
    };

    if (employerID == undefined && candidateID == undefined){
        return (
        <nav className='sidebar'>
            <div>      
                <img src={quizLogo} className="logo" alt="Quiz logo" />      
            </div>
            
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>

            <div className='social-box'>
                <a className="socials" href='http://twitter.com'>Twitter</a>
            </div>
            <footer>&copy; CS 467</footer>
        </nav>
        );
    } else if (employerID == undefined && candidateID != undefined){
        return (
            <nav className='sidebar'>
                <div>      
                    <img src={quizLogo} className="logo" alt="Quiz logo" />      
                </div>
                
                <Link to="/">Home</Link>
                <Link to={`/show-quiz?candidateID=${candidateID}`}>Take Quiz</Link>

                <div className='social-box'>
                    <a className="socials" href='http://twitter.com'>Twitter</a>
                </div>
                <footer>&copy; CS 467</footer>
            </nav>
            );
    } else if (employerID != undefined && candidateID != undefined){
        return (
            <nav className='sidebar'>
                <div>      
                    <img src={quizLogo} className="logo" alt="Quiz logo" />      
                </div>

                <button className='logout' onClick={handleReset}>Return to Home</button>
                <div className='social-box'>
                    <a className="socials" href='http://twitter.com'>Twitter</a>
                </div>
                <footer>&copy; CS 467</footer>
            </nav>
        )
    }
    else {
        return (
            <nav className='sidebar'>
                <div>      
                    <img src={quizLogo} className="logo" alt="Quiz logo" />      
                </div>
                
                <Link to="/">Home</Link>
                <Link to="/create-quiz">Create a Quiz</Link>
                <Link to="/quizzes">Quizzes</Link>
                <Link to="/account-settings">Account Settings</Link>
                
                <button className='logout' onClick={handleLogout}>Logout Now</button>
                <div className='social-box'>
                    <a className="socials" href='http://twitter.com'>Twitter</a>
                </div>
                <footer>&copy; CS 467</footer>
            </nav>
        );
    }
}

export default Nav;
