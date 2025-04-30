"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { NoteForm } from "@/components/note-form";
import { NavTabs } from "@/components/nav-tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { getNoteById, type Note } from "@/lib/storage";

export default function EditNotePage() {
  const params = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id || typeof params.id !== "string") {
      setError("Invalid note ID");
      setIsLoading(false);
      return;
    }

    try {
      const foundNote = getNoteById(params.id);
      if (!foundNote) {
        setError("Note not found");
      } else {
        setNote(foundNote);
      }
    } catch (err) {
      setError("Failed to load note");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <main className="container max-w-4xl mx-auto p-4">
        <NavTabs />
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container max-w-4xl mx-auto p-4">
        <NavTabs />
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className="container max-w-4xl mx-auto p-4">
      <NavTabs />
      <NoteForm initialData={note} isEditing={true} />
    </main>
  );
}
