import React from 'react';

export default function Intro(props){
    return (
        <div className={`intro-page ${props.quizStatus ? "hide-intro" : ""}`}>
            <h1 className="intro-title">Quizzical</h1>
            <h3 className="intro-sub-title">Interested in some Trivia?</h3>
            <button className="start-quiz-btn" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}