import React from "react";

/**
 * Notes list component
 * Props:
 *  - notes: notes array
 *  - loading: loading state
 *  - onEdit(note): edit callback
 *  - onDelete(noteId): delete callback
 *  - searchValue: value for search bar
 *  - onSearch(term): search callback
 *  - onNewNote(): callback for 'new note'
 */
// PUBLIC_INTERFACE
function NotesList({
  notes,
  loading,
  onEdit,
  onDelete,
  searchValue,
  onSearch,
  onNewNote,
}) {
  return (
    <section className="notes-list-section">
      <div className="notes-list-header">
        <h2>Notes</h2>
        <button className="create-note-btn" onClick={onNewNote}>
          + New Note
        </button>
      </div>
      <div className="notes-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="notes-loading">Loading notes...</div>
      ) : notes && notes.length > 0 ? (
        <ul className="notes-list">
          {notes.map((note) => (
            <li className="notes-list-item" key={note.id}>
              <div className="note-title">{note.title}</div>
              <div className="note-snippet">
                {note.content.length > 80
                  ? note.content.slice(0, 80) + "..."
                  : note.content}
              </div>
              <div className="note-meta">
                <span className="note-date">
                  {new Date(note.updated_at).toLocaleString()}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(note)}
                  aria-label="Edit"
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(note.id)}
                  aria-label="Delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-notes-found">No notes found.</div>
      )}
    </section>
  );
}
export default NotesList;
