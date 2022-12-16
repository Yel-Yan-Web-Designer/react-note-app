import React, {useState, useEffect} from 'react';
import './App.css';
import { nanoid } from 'nanoid';
import Split from 'react-split';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) ||  ""
  )

  // ! LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // !CREATE NEW NOTES
  function createNewNotes () {
    const new_notes = {
      id : nanoid(),
      body : "#Type"
    }

    // first create notes
    setNotes(prevNotes => [...prevNotes, new_notes]);
    // get new notes id
    setCurrentNoteId(new_notes.id);
  }

  // !UPDATE FUNCTIONS
  function updateNotes (text) {
    // imperative update notes
    setNotes(oldNotes => {
      let newarray = [];
      for(let i = 0; i < oldNotes.length; i++){
          let oldNote = oldNotes[i];

          if(oldNote.id === currentNoteId){
             newarray.unshift({...oldNote, body : text})
          } else {
             newarray.push(oldNote);
          }
      }
      return newarray;
    })
  }

  // !FIND CURRENT SELECETD ID
  function findCurrentSelectedNote () {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0];  // notes[0] for first initialize 
  }

  // ! DELETE NOTES
  function deleteNotes (e, noteID) {
    e.stopPropagation();
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteID))
  }

  return (
    <div className="App">
      {
        notes.length > 0 ?
        <Split
          className = "split"
          sizes={[30, 70]}
          direction = "horizontal"
          cursor= 'col-resize'
          gutterSize = {10}
        >
          <Sidebar
            notes = {notes}
            createNewNotes = {createNewNotes}
            setCurrentNoteId = {setCurrentNoteId}
            findCurrentSelectedNote = {findCurrentSelectedNote()}
            deleteNotes = {deleteNotes}
          />
          <Editor
            updateNotes = {updateNotes}
            findCurrentSelectedNote = {findCurrentSelectedNote()}
          />
        </Split>
        :
        <div className='no-notes-page'> 
          <h1 className='no-notes_title'>Create New Notes</h1>
          <button className='no-notes_btn' onClick={createNewNotes}>New Notes</button>
        </div>
      }
    </div>
  );
}

export default App;
