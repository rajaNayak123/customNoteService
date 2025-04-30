"use client"

// Note type definition
export interface Note {
  id: string
  title: string
  content: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

// Storage keys
const STORAGE_KEY = "next-notes-app"

// Event for cross-component communication
export const NOTE_UPDATED_EVENT = "note-storage-updated"

// Custom event dispatcher
export const dispatchStorageEvent = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(NOTE_UPDATED_EVENT))
  }
}

// Get all notes from localStorage
export const getNotes = (): Note[] => {
  if (typeof window === "undefined") return []

  try {
    const notes = localStorage.getItem(STORAGE_KEY)
    return notes ? JSON.parse(notes) : []
  } catch (error) {
    console.error("Failed to get notes from localStorage:", error)
    return []
  }
}

// Add a new note to localStorage
export const addNote = (note: Omit<Note, "id" | "createdAt" | "updatedAt">): Note => {
  try {
    const notes = getNotes()
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([newNote, ...notes]))
    dispatchStorageEvent()
    return newNote
  } catch (error) {
    console.error("Failed to add note to localStorage:", error)
    throw new Error("Failed to save note. Storage might be full.")
  }
}

// Update an existing note
export const updateNote = (id: string, updatedNote: Partial<Omit<Note, "id" | "createdAt">>): Note => {
  try {
    const notes = getNotes()
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex === -1) {
      throw new Error("Note not found")
    }

    const updatedNotes = [...notes]
    updatedNotes[noteIndex] = {
      ...updatedNotes[noteIndex],
      ...updatedNote,
      updatedAt: Date.now(),
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes))
    dispatchStorageEvent()
    return updatedNotes[noteIndex]
  } catch (error) {
    console.error("Failed to update note:", error)
    throw new Error("Failed to update note. Storage might be full.")
  }
}

// Get a single note by ID
export const getNoteById = (id: string): Note | undefined => {
  const notes = getNotes()
  return notes.find((note) => note.id === id)
}

// Toggle note completion status
export const toggleNoteCompletion = (id: string): Note => {
  const note = getNoteById(id)
  if (!note) {
    throw new Error("Note not found")
  }

  return updateNote(id, { completed: !note.completed })
}

// Delete a note
export const deleteNote = (id: string): void => {
  try {
    const notes = getNotes()
    const filteredNotes = notes.filter((note) => note.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes))
    dispatchStorageEvent()
  } catch (error) {
    console.error("Failed to delete note:", error)
    throw new Error("Failed to delete note")
  }
}
