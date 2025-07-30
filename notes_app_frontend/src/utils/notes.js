/**
 * NOTES utility functions (localStorage mock).
 * Replace with backend calls using .env endpoint config when available.
 */

function userKey(user) {
  if (!user?.email) throw new Error("Missing user");
  return `notes_${user.email}`;
}

// PUBLIC_INTERFACE
export async function getAllNotes(user) {
  const notes = JSON.parse(localStorage.getItem(userKey(user)) || "[]");
  return notes.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

// PUBLIC_INTERFACE
export async function createNote(user, note) {
  let notes = await getAllNotes(user);
  const newNote = {
    ...note,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  notes = [newNote, ...notes];
  localStorage.setItem(userKey(user), JSON.stringify(notes));
  return newNote;
}

// PUBLIC_INTERFACE
export async function updateNote(user, noteId, note) {
  let notes = await getAllNotes(user);
  notes = notes.map((n) =>
    n.id === noteId
      ? {
          ...n,
          ...note,
          updated_at: new Date().toISOString(),
        }
      : n
  );
  localStorage.setItem(userKey(user), JSON.stringify(notes));
  return notes.find((n) => n.id === noteId);
}

// PUBLIC_INTERFACE
export async function deleteNote(user, noteId) {
  let notes = await getAllNotes(user);
  notes = notes.filter((n) => n.id !== noteId);
  localStorage.setItem(userKey(user), JSON.stringify(notes));
}

// PUBLIC_INTERFACE
export async function searchNotes(user, query) {
  let notes = await getAllNotes(user);
  query = query.toLowerCase();
  return notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query)
  );
}
