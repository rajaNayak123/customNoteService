# 📝 Custom Note Service

A simple, fast, and fully responsive note-taking app built with **Next.js**, using **localStorage** for data persistence.  
Perfect for quick thoughts, todos, and tracking tasks — all stored right in your browser!

---

## 🚀 Live Demo

🔗 [View the Live App](https://custom-note-service-two.vercel.app/)

---

## Setup & Run Steps

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design Decisions

### Storage Strategy
- **Why localStorage + key naming:** 
  - Used localStorage for client-side persistence without requiring a backend
  - Single storage key (`next-notes-app`) to store all notes as a JSON array, making it easy to manage the entire collection
  - Structured data with timestamps and IDs for better organization and future-proofing

### Component Design
- **Why separate components:**
  - `NoteForm`: Reusable component for both adding and editing notes
  - `NoteCard`: Encapsulates display and actions for a single note
  - `NoteList`: Manages fetching and displaying the collection of notes
  - `NavTabs`: Provides consistent navigation between views

### State Management
- **Why useState + controlled inputs:**
  - Simple form state management with direct access to current values
  - Enables validation before submission
  - Provides immediate UI feedback

- **Why useEffect to sync storage → state:**
  - Ensures component state reflects localStorage on mount
  - Keeps UI in sync with persisted data
  - Handles errors gracefully

### Styling
- **Why Tailwind + shadcn/ui:**
  - Tailwind for rapid utility-based styling and responsive design
  - shadcn/ui for accessible, reusable components with consistent design
  - Custom styling for interactive elements (completion status, hover states)

### Navigation
- **Why this nav approach:**
  - Simple tab-based navigation between main views
  - Active state indicators for current view
  - Consistent layout across the application
  - Next.js App Router for clean URL structure

### Loading & Error States
- **Why show spinner:**
  - Provides immediate feedback during async operations
  - Prevents user from submitting multiple times
  - Indicates that the application is responsive

- **Why display error banner:**
  - Clear feedback when storage operations fail
  - Consistent error handling across components
  - Actionable information for users

## Features

- Add, edit, and delete notes
- Mark notes as complete/incomplete
- Responsive design for all screen sizes
- Persistent storage using localStorage
- Loading and error states
