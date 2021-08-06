import React, { useState } from 'react'


const Anecdote = ({selected}) => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  return (
    <div>
      <p>{anecdotes[selected]}</p>
    </div>
  )
}

const Votes = ({numVotes}) => {
  return(
    <div>
      <p>This one has {numVotes} votes</p>
    </div>
  )
}

const MostVotes = ({points, NUM}) => {
  function findMax(array, length){
    let max = 0
    for (let i = 0; i < length; i++){
      if (points[i] > points[max]){
        max = i
      }
    }
    return max
  }
  const maxVotes = findMax(points, NUM)

  return(
    <div>
      <h2>Anecdote(s) with the most votes</h2>
      <Anecdote selected = {maxVotes}/>
      <p>{points[maxVotes]} number of votes</p>
    </div>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const NUM = 7;
  const [points, setPoints] = useState(Array(NUM).fill(0))

  let RNG = Math.floor(Math.random() * 6)

  while (RNG === selected){
    RNG = Math.floor(Math.random() * 6)
  }

  const updatePoints = (selected, points) => {
    const temp = [...points]
    temp[selected] += 1
    setPoints(temp)
  }

  return (
    <div>
      <h2>Random Anecdote!</h2>
      <Anecdote selected = {selected}/>
      <Votes numVotes = {points[selected]}/>
      <button className="button" onClick={()=> updatePoints(selected, points)}>Vote</button>
      <button className="button" onClick={() => setSelected(RNG)}>Next!</button>
      <MostVotes points = {points} NUM = {NUM}/>
    </div>
  )
}

export default App