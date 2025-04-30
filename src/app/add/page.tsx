import { NoteForm } from "@/components/note-form";
import { NavTabs } from "@/components/nav-tabs";

export default function AddNotePage() {
  return (
    <main className="container max-w-4xl mx-auto p-4">
      <NavTabs />
      <NoteForm />
    </main>
  );
}
