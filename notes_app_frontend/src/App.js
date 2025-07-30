import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import LoginPage from "./components/LoginPage";
import { getAuthUser, loginUser, logoutUser, registerUser } from "./utils/auth";
import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  searchNotes,
} from "./utils/notes";

// PUBLIC_INTERFACE
function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // show loading while auth check happens

  // UI layout state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mainView, setMainView] = useState("list"); // 'list' | 'edit' | 'create'
  const [editingNote, setEditingNote] = useState(null); // note being edited

  // Notes state
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);

  // Errors and notifications
  const [authError, setAuthError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // THEME MANAGEMENT
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  // Initial auth check and notes load
  useEffect(() => {
    const _load = async () => {
      setAuthLoading(true);
      try {
        const u = await getAuthUser();
        setUser(u);
      } catch (e) {
        setUser(null);
      }
      setAuthLoading(false);
    };
    _load();
  }, []);

  // Load notes after login/logout
  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }
    setNotesLoading(true);
    getAllNotes(user)
      .then(setNotes)
      .catch(() =>
        setNoteError("Failed to load notes. Please try again.")
      )
      .finally(() => setNotesLoading(false));
  }, [user]);

  // Handlers
  const handleLogin = async (email, password) => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const u = await loginUser(email, password);
      setUser(u);
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setMainView("list");
  };

  const handleRegister = async (email, password) => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const u = await registerUser(email, password);
      setUser(u);
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setNotesLoading(true);
      getAllNotes(user)
        .then(setNotes)
        .finally(() => setNotesLoading(false));
    } else {
      setNotesLoading(true);
      searchNotes(user, term)
        .then(setNotes)
        .finally(() => setNotesLoading(false));
    }
  };

  const handleStartEdit = (note) => {
    setEditingNote(note);
    setMainView("edit");
  };

  const handleDeleteNote = async (noteId) => {
    setNoteError("");
    setSuccessMsg("");
    try {
      await deleteNote(user, noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      setSuccessMsg("Note deleted.");
      setMainView("list");
    } catch {
      setNoteError("Failed to delete note.");
    }
  };

  const handleSaveNote = async (note) => {
    setNoteError("");
    setSuccessMsg("");
    try {
      let updated;
      if (note.id) {
        updated = await updateNote(user, note.id, note);
        setNotes((prev) =>
          prev.map((n) => (n.id === note.id ? updated : n))
        );
        setSuccessMsg("Note updated.");
      } else {
        updated = await createNote(user, note);
        setNotes((prev) => [updated, ...prev]);
        setSuccessMsg("Note created.");
      }
      setMainView("list");
      setEditingNote(null);
    } catch (e) {
      setNoteError("Failed to save note.");
    }
  };

  const handleCreateNew = () => {
    setEditingNote(null);
    setMainView("create");
  };

  const closeMsg = () => {
    setNoteError("");
    setSuccessMsg("");
  };

  // ---- Rendering ----
  // Auth first
  if (authLoading) {
    return (
      <div className="App">
        <div className="centered">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="App">
        <LoginPage
          onLogin={handleLogin}
          onRegister={handleRegister}
          loading={authLoading}
          error={authError}
        />
      </div>
    );
  }

  return (
    <div className="App notes-app-root">
      <TopNav
        user={user}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAllNotes={() => setMainView("list")}
        onNewNote={handleCreateNew}
        selected={mainView}
      />

      <main className={`main-area ${sidebarOpen ? "with-sidebar" : ""}`}>
        {noteError && (
          <div className="error-banner" onClick={closeMsg}>
            {noteError}
          </div>
        )}
        {successMsg && (
          <div className="success-banner" onClick={closeMsg}>
            {successMsg}
          </div>
        )}

        {mainView === "list" && (
          <NotesList
            notes={notes}
            loading={notesLoading}
            onEdit={handleStartEdit}
            onDelete={handleDeleteNote}
            searchValue={searchTerm}
            onSearch={handleSearch}
            onNewNote={handleCreateNew}
          />
        )}

        {(mainView === "create" || mainView === "edit") && (
          <NoteEditor
            user={user}
            note={editingNote}
            onCancel={() => {
              setMainView("list");
              setEditingNote(null);
            }}
            onSave={handleSaveNote}
            loading={notesLoading}
          />
        )}
      </main>
    </div>
  );
}

export default App;
