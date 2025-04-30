import { NavTabs } from "@/components/nav-tabs";
import { NoteList } from "@/components/note-list";
import { NoteStats } from "@/components/note-stats";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <main className="container max-w-4xl mx-auto p-4">
      <NavTabs />
      <HeroSection />
      <NoteStats />
      <div className="mt-8">
        <NoteList />
      </div>
    </main>
  );
}
