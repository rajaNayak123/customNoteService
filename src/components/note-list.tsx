"use client";

import { useEffect, useState } from "react";
import { NoteCard } from "@/components/note-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Search } from "lucide-react";
import { type Note, getNotes, NOTE_UPDATED_EVENT } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  // Function to load notes from storage
  const loadNotes = () => {
    try {
      const storedNotes = getNotes();
      setNotes(storedNotes);
      setError(null);
    } catch (err) {
      setError("Failed to load notes from storage");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and setup event listener
  useEffect(() => {
    loadNotes();

    // Listen for storage updates from other components
    window.addEventListener(NOTE_UPDATED_EVENT, loadNotes);

    return () => {
      window.removeEventListener(NOTE_UPDATED_EVENT, loadNotes);
    };
  }, []);

  // Filter notes based on search query and completion filter
  useEffect(() => {
    let result = notes;

    // Apply completion filter
    if (filter === "completed") {
      result = result.filter((note) => note.completed);
    } else if (filter === "pending") {
      result = result.filter((note) => !note.completed);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(result);
  }, [notes, searchQuery, filter]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Why display error banner: Provides clear feedback when storage operations fail
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12 bg-muted/30 rounded-lg"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">No notes found</h3>
            <p className="text-muted-foreground">
              {notes.length === 0
                ? "Create your first note to get started!"
                : "Try adjusting your search or filters"}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4 md:grid-cols-2"
        >
          <AnimatePresence>
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <NoteCard note={note} onUpdate={loadNotes} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
