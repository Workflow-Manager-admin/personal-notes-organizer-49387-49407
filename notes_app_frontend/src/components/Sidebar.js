import React from "react";

/**
 * Sidebar navigation for switching between main sections.
 * Props:
 *  - open (bool): Whether the sidebar is open.
 *  - onClose: Called to close sidebar on mobile.
 *  - onAllNotes: Go to all notes list.
 *  - onNewNote: Go to note creation.
 *  - selected: Active section.
 */
// PUBLIC_INTERFACE
function Sidebar({ open, onClose, onAllNotes, onNewNote, selected }) {
  return (
    <aside className={`sidebar${open ? "" : " closed"}`}>
      <div className="sidebar-header">
        <span className="sidebar-title">📝 Notes Organizer</span>
        <button
          className="sidebar-close-btn"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          ✖
        </button>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`sidebar-link${selected === "list" ? " active" : ""}`}
          onClick={onAllNotes}
        >
          All Notes
        </button>
        <button
          className={`sidebar-link${selected === "create" ? " active" : ""}`}
          onClick={onNewNote}
        >
          + New Note
        </button>
      </nav>
      <div className="sidebar-footer">
        <span className="accent-text">Light, modern, intuitive ✨</span>
      </div>
    </aside>
  );
}

export default Sidebar;
