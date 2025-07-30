import React, { useState } from "react";

/**
 * Note editor component.
 * Props:
 *  - note: note object (null=new)
 *  - user: user object
 *  - onSave(note): called on save
 *  - onCancel(): cancel editing
 *  - loading: state of saving
 */
// PUBLIC_INTERFACE
function NoteEditor({ note, onSave, onCancel, loading }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");
  const [error, setError] = useState("");

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }
    onSave({ ...note, title: title.trim(), content: content.trim() });
  };

  return (
    <div className="note-editor">
      <h2>{note && note.id ? "Edit Note" : "New Note"}</h2>
      {error && <div className="editor-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="editor-title"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <textarea
          className="editor-content"
          rows={12}
          placeholder="Type your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <div className="editor-actions">
          <button
            className="save-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="cancel-btn" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
