import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2021</em>
    </div>
  )
}


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
   
  const hook = () => {
    noteService 
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }
  useEffect(hook, [])

  // need to have onchange mech because input value now being controlled by App comp
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // stores list of notes to be displayed 
  const notesToShow = showAll
    ? notes 
    : notes.filter(note => note.important)

  // notification of error
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  // importance toggle
  const toggleImportanceOf = (id) => {
    // this note is a reference to note in state, do not want to change state directly
    const note = notes.find(n => n.id === id)
    // new object exact copy of old note but with importance changed 
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note: returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  

  const addNote = (event) => {
    event.preventDefault()
    // create new Note object
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() <0.5,
    }

    // post to notes db (update server)
    // add it to array notes via concat which creates NEW COPY of array (update state)
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage} />
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul className = 'note'>
        {notesToShow.map((note, idx) => 
          <Note key={idx} note={note} toggleImportance = {() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
    
  )
}

export default App 