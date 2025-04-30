"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StickyNote } from "lucide-react";

export function HeroSection() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-8 mb-8 shadow-sm"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold tracking-tight"
          >
            Capture your thoughts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground max-w-md"
          >
            Keep track of your ideas, tasks, and reminders in one place. Create,
            edit, and organize your notes with ease.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={() => router.push("/add")}
              size="lg"
              className="mt-2"
            >
              Create New Note
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="hidden md:flex items-center justify-center bg-white dark:bg-slate-700 rounded-full h-32 w-32 shadow-md"
        >
          <StickyNote className="h-16 w-16 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
}
