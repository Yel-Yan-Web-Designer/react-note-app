import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ notes, createNewNotes, setCurrentNoteId, findCurrentSelectedNote, deleteNotes }) => {
  
  const note_elements = notes.map((note, index) => {
    return(
      <div className='note-elements-container' key = {note.id}>
          <div 
            className= {` note-elements_title px-1 ${note.id === findCurrentSelectedNote.id ? "selected-note" : ""}`}
            onClick = {() => setCurrentNoteId(note.id)} 
          >
            <h2 className='note-subtitle'>{note.body.split("\n")[0]}</h2>

          <FontAwesomeIcon 
              icon={faTrash} 
              className='trash-icon'
              onClick = {(e) => deleteNotes(e, note.id)}
            />
          </div>
      </div>
    )
  })
  return (
    <div className='sidebar-container'>

      <div className="sidebar-header px-1">
        <h1 className='sidebar-title'>Notes</h1>
        <button className='sidebar-btn' onClick={createNewNotes}>+</button>
      </div>
    {/* note elements */}
      {note_elements}
    </div>
  )
}

export default Sidebar;
// <FontAwesomeIcon icon="fa-solid fa-trash" />