import React, { useState } from 'react'
import Note from './components/Note'



const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  
  // need to have onchange mech because input value now being controlled by App comp
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  // stores list of notes to be displayed 
  const notesToShow = showAll
    ? notes 
    : notes.filter(note => note.important)

  
  const addNote = (event) => {
    event.preventDefault()
    // create new Note object
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() <0.5,
      id: notes.length + 1
    }
    // add it to array notes via concat which creates NEW COPY of array
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=> setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 