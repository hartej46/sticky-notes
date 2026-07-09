import './StickyNotes.css'

function StickyNotes({note,colors,onDelete,setColor}) {
  return (
    <div className="root">
        <div className="note">
          <div className="colors">
            {colors && colors.map((color, key) => (
              <div key={key} onClick={() => setColor(note.id, color)} className="color" style={{backgroundColor:`${color}`}}></div>
            ))}
            <button className="delete-btn" onClick={() => onDelete(note.id)}>
              &times;
            </button>
          </div>

          <div key = {note.id} className="value" style={{backgroundColor: `${note.color}`}}>
          {note.text}
        </div>
        </div>
        
    </div>
  )
}

export default StickyNotes