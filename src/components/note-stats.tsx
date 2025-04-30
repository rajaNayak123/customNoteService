"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { getNotes, NOTE_UPDATED_EVENT } from "@/lib/storage"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { motion } from "framer-motion"

export function NoteStats() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  })

  const updateStats = () => {
    try {
      const notes = getNotes()
      const completed = notes.filter((note) => note.completed).length

      setStats({
        total: notes.length,
        completed,
        pending: notes.length - completed,
      })
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  useEffect(() => {
    updateStats()

    // Listen for storage updates
    window.addEventListener(NOTE_UPDATED_EVENT, updateStats)

    return () => {
      window.removeEventListener(NOTE_UPDATED_EVENT, updateStats)
    }
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <motion.div variants={item}>
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Notes</p>
                <h3 className="text-2xl font-bold">{stats.total}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <h3 className="text-2xl font-bold">{stats.completed}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-bold">{stats.pending}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
