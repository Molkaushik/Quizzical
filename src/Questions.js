import React from 'react';
import Qsection from './Qsection.js';

export default function Questions(props){
    
    var qSectionElements
    if(props.processedData!==undefined){
        qSectionElements = props.processedData.questions.map((question, qindex) => {

            function markOption(optionId, questionId){
                props.setQuestionsOptionsClass( (prevOptionsClass) => {
                    const currOptionsClass = [...prevOptionsClass]
                    const modifiedArr =  currOptionsClass[questionId].map((currClass, oindex) => {
                        return oindex===optionId? "option option-marked" : "option"
                    })
                    currOptionsClass[questionId] = modifiedArr
                    return currOptionsClass
                })
            }

            return <Qsection 
                        key={qindex} 
                        question={question} 
                        options={props.processedData.options[qindex]} 
                        questionsOptionsClass={props.questionsOptionsClass[qindex]}
                        qId={qindex}
                        markOption={markOption}
                        handleMarkedAns={props.handleMarkedAns}
                    />
        })
    }
    
    return (
        <div className= {`${props.quizStatus && !props.results ? "questions-page" : "questions-page hide-questions"}`}>
            {qSectionElements!==undefined ? qSectionElements : ""}
            <button disabled={props.attempted===props.numQuestions && props.processedData!==undefined ? false : true} 
                    className={props.attempted===props.numQuestions && props.processedData!==undefined ? "check-ans-btn" : "check-ans-btn btn-disabled"}
                    onClick={props.showResults}>
                        Check answers
            </button>
        </div>
        )
}