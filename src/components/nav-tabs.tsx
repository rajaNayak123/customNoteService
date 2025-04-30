"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle, List } from "lucide-react";

export function NavTabs() {
  const pathname = usePathname();

  // Why this nav approach for simplicity: Using tabs with active state provides clear
  // navigation between main views while maintaining a consistent layout
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Notes App</h1>
      <div className="flex gap-2">
        <Button
          variant={pathname === "/" ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/">
            <List className="h-4 w-4 mr-2" />
            View Notes
          </Link>
        </Button>
        <Button
          variant={pathname === "/add" ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href="/add">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Note
          </Link>
        </Button>
      </div>
    </div>
  );
}
