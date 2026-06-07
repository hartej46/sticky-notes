import { use, useState } from 'react';
import './App.css'
import StickyNotes from './components/stickyNotes'

function App() {
  const COLORS = ["#ffe1b4", "#FFF9D5", "#ECFAF5", "#CBF5E4", "#A5DEC8", "#FFF"];
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddind, setIsAdding] = useState(false);
  const [activeDragId, setActiveDragId] = useState(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const addNote = () => {
    const newNote = {
      id: `note_${Date.now()}`,
      text: input,
      x: Math.random() * 400 + 50,  
      y: Math.random() * 400 + 50, 
      color: COLORS[Math.floor(Math.random() * COLORS.length)] 
    };
    setNotes([...notes, newNote]); 
    setIsAdding(false)
    setInput('')
  };

  const deleteNote = (idToDelete) => {
    const filteredNotes = notes.filter(note => note.id !== idToDelete);
    setNotes(filteredNotes);
  };

  const handleMouseUp = () => {
    setActiveDragId(null);
  };

  const handleMouseDown = (id) => {
    setActiveDragId(id);
  };

  const handleMouseMove = (e) => {
    if (!activeDragId) return;
    const updatedNotes = notes.map(note => {
      if (note.id === activeDragId) {
        return {
          ...note,
          x: e.clientX - 125,
          y: e.clientY - 20  
        };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const setColor = (id,color) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          color: color
        };
      }
      return note;
    })

    setNotes(updatedNotes)
  }


  return (
    <div className='note-interface'  onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
     { isAddind && <div className='add-new' onClick={() => setIsAdding(false)}>
          <div className='new-stickynote'>
              <textarea name="sticky-notes" onChange={handleInput} onClick={(e) => e.stopPropagation()} placeholder='Add new Note'></textarea>
              <button className='addNote' onClick={addNote}> Add </button>
          </div>
      </div>}
      <div className='sticky-notes'> 
        {notes && notes.map((note, key) => (
          <div key = {key} onMouseDown={() => handleMouseDown(note.id)}  style={{left: note.x + 'px', top: note.y + 'px'}} className='note'>
            <StickyNotes note={note} colors={COLORS} onDelete={deleteNote} setColor = {setColor}/>
          </div>
        ))}
      </div>
      <div className='add-button' onClick={() => setIsAdding(true)}>
        +
      </div>
    </div>
  )
}

export default App
