import React from 'react';

export default function Option(props){
    function handleClick(){
        if(!props.results){
            props.handleClick(props.optId)
        }else{
            console.log("Test over")
        }
    }
    return (
        <div>
            <button id="option-btn" className={props.results? props.resultsOptionsClass : props.questionsOptionsClass} onClick={handleClick}>{props.option}
            </button>
        </div>
    )
}