import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr><td>{text}</td><td>{value}</td> </tr>
    </>  
  )    
}

const Statistics = ({good, neutral, bad}) => {
  if ((good + neutral + bad) === 0 ){
    return (
      <div>
        No feedback given 
      </div>  
    )    
  }
  
  const all = good + neutral + bad
  const average = (good * 1 + bad * -1)/(good + neutral + bad)
  const positive = (good / (good + neutral + bad)) * 100
  const positiveStr =  positive.toString().concat(' %');

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positiveStr}/>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
         <h1>give feedback</h1>
         <div> 
         <Button onClick={handleGoodClick} text='good' />
         <Button onClick={handleNeutralClick} text='neutral' />
         <Button onClick={handleBadClick} text='bad' />
        
         </div>
         <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)