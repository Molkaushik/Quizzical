import Option from './Option.js';
import React from 'react';

export default function Qsection(props){

    function handleClick(optionId){
        props.handleMarkedAns(props.qId, props.options[optionId])
        props.markOption(optionId, props.qId)
    }
    const optionElements = props.options.map((option, index) => {
        return <Option
                    key={index}
                    option={option}
                    optId={index}
                    questionsOptionsClass={props.questionsOptionsClass!==undefined? props.questionsOptionsClass[index] : "option"}
                    handleClick={handleClick}
                    results={props.results}
                    resultsOptionsClass={props.resultsOptionsClass!==undefined ? props.resultsOptionsClass[index] : "option"}
                />
    })
    return (
            <section className="q-section">
                <div className="question">
                    <h3>{props.question}</h3>
                </div>
                <div id="options-section" className="options">
                    {optionElements}
                </div>
            </section>
    )
}