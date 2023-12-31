import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.name}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({anecdote, votes}) => {
  return(
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Mostvote = ({anecdotes, votes}) => {
  const maxVotes = Math.max(...votes)
  const anecdoteindex=votes.indexOf(maxVotes)
  if (maxVotes === 0) {
    return (
      <p>No votes</p>
    )
  }

  return (
    <div>
      <p>{anecdotes[anecdoteindex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      <Header name='Anecdote of the day'/>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={handleRandom} text="next anecdote"/>
      <Button onClick={handleVote} text="vote"/>
      <Header name='Anecdote with most votes'/>
      <Mostvote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)