import React, { useState } from 'react'

const StatisticLine = ({text, value}) => {
    return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad 
  const average = (good - bad) / 3
  const positive = good/all * 100

  if (all === 0){
    return(
      <div>
        <h2>Statistics</h2>
          <table>
            <tbody>
            <StatisticLine text='No stats at this time'/>
            </tbody>
          </table>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good:' value={good}/>
          <StatisticLine text='Neutral:' value={neutral}/>
          <StatisticLine text='Bad:' value={bad}/>
          <StatisticLine text='Average:' value={average}/>
          <StatisticLine text='Positive%:' value={positive}/>
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <button className="button" onClick={() => setGood(good+1)}>Good</button>
      <button className="button" onClick={() => setNeutral(neutral+1)}>Neutral</button>
      <button className="button" onClick={() => setBad(bad+1)}>Bad</button><br/>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App