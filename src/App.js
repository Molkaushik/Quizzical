import React from 'react';
import './App.css';
import Intro from './Intro.js';
import Questions from './Questions.js';
import Results from './Results.js';
import {processData, shuffle} from './utils.js';

export default function App() {

  const [newQuiz, setNewQuiz] = React.useState(true)
  const [quizStatus, setQuizStatus] = React.useState(false)
  const [results, setResults] = React.useState(false)
  const [markedAns, setMarkedAns] = React.useState({})
  const [processedData, setProcessedData] = React.useState()
  const [resultsOptionsClass, setResultsOptionsClass] = React.useState([])
  const [numQuestions, setNumQuestions] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const baseClasses = ["option", "option", "option", "option"]
  const defaultClasses = [baseClasses, baseClasses, baseClasses, baseClasses, baseClasses]
  const [questionsOptionsClass, setQuestionsOptionsClass] = React.useState(defaultClasses)

  React.useEffect(() => {
      async function getData(){
          const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          const data = await res.json()
          setProcessedData( () => {
              var obj = {}
              let temp = []
              for(let i=0; i<data.results.length; i++){
                  temp.push(data.results[i].question)
              }
              obj.questions = temp
              let cAns = []
              let opts = []
              for(let i=0; i<data.results.length; i++){
                  cAns.push(data.results[i].correct_answer)
                  let arr = [...data.results[i].incorrect_answers, data.results[i].correct_answer]
                  arr = shuffle(arr)
                  opts.push(arr)
              }
              obj.correct_answer = cAns
              obj.options = opts
              return processData(obj)
          })
          setNumQuestions( () => data.results.length)
      }
      getData()
  }, [newQuiz])
  function startQuiz(){
    setQuizStatus((prevStatus) => !prevStatus)
  }

  function showResults(){
    setResults((prevStatus) => !prevStatus)
    setResultsOptionsClass(() => {
      let resultsOptionsClass = []
      for(let i=0; i<processedData.options.length; i++){
        let arr = []
        for(let j=0; j<processedData.options[i].length; j++){
          if(processedData.options[i][j]===processedData.correct_answer[i]){
            arr.push("option option-correct")
          }else if(processedData.options[i][j]===markedAns[i]){
            arr.push("option option-incorrect option-opaque")
          }else arr.push("option option-opaque")
        }
        resultsOptionsClass.push(arr)
      }
      return resultsOptionsClass
    })
    setScore((prevCount) => {
      let tempCount = prevCount
      for(let i=0; i<numQuestions; i++){
        if(markedAns[i]===processedData.correct_answer[i]){
          tempCount++
        }
      }
      return tempCount
    })
  }
  function handleMarkedAns(objKey, objVal){
    setMarkedAns( (prevMarkedAns) => {
        const currMarkedAns = {...prevMarkedAns, [objKey]: objVal}
        return currMarkedAns
    })
  } 

  function newGame(){
    setQuizStatus((prevStatus) => !prevStatus)
    setResults((prevStatus) => !prevStatus)
    setNewQuiz((prevStatus) => !prevStatus)
    setMarkedAns({})
    setQuestionsOptionsClass(defaultClasses)
    setScore(0)
    const optionButton = document.getElementById("option-btn")
    optionButton.disabled = true
    setTimeout(()=>{
      optionButton.disabled = false
    }, 3000)
  }

  return (
    <div className="App">
      <Intro 
            quizStatus={quizStatus} 
            startQuiz={startQuiz} 
      />
      <Questions 
                quizStatus={quizStatus} 
                results={results} 
                showResults={showResults} 
                processedData={processedData}
                handleMarkedAns={handleMarkedAns}
                attempted={Object.keys(markedAns).length}
                numQuestions={numQuestions}
                questionsOptionsClass={questionsOptionsClass}
                setQuestionsOptionsClass={setQuestionsOptionsClass}
      />
      <Results 
              results={results}
              processedData={processedData}
              markedAns={markedAns} 
              resultsOptionsClass={resultsOptionsClass}
              score={score}
              numQuestions={numQuestions}
              newGame={newGame}
      />
    </div>
  );
}



