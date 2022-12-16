import React from 'react';
import Qsection from './Qsection.js';

export default function Results(props){

    var qSectionElements
    if(props.processedData!==undefined){
        qSectionElements = props.processedData.questions.map((question, index) => {
            return <Qsection 
                        key={index} 
                        question={question} 
                        options={props.processedData.options[index]} 
                        qId={index}
                        markedAns={props.markedAns}
                        correctAns={props.processedData.correct_answer}
                        results={props.results}
                        resultsOptionsClass={props.resultsOptionsClass!==undefined ? props.resultsOptionsClass[index] : []}
                    />
        })
    }

    return (
        <div className={`${props.results ? "results-page" : "results-page hide-results"}`}>
            {qSectionElements!==undefined ? qSectionElements : ""}
            <div className="results-footer">
                <p className="score-text">You scored {props.score}/{props.numQuestions} correct answers</p>
                <button className="play-again-btn" onClick={props.newGame}>Play Again</button>
            </div>
        </div>
    )
}