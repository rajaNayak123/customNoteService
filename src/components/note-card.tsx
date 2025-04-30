"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { type Note, toggleNoteCompletion, deleteNote } from "@/lib/storage"
import { Edit, Trash2, Loader2, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface NoteCardProps {
  note: Note
  onUpdate?: () => void
}

export function NoteCard({ note, onUpdate }: NoteCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isCompleted, setIsCompleted] = useState(note.completed)
  const router = useRouter()

  const handleToggleComplete = async () => {
    setIsLoading(true)
    try {
      const updatedNote = toggleNoteCompletion(note.id)
      setIsCompleted(updatedNote.completed)

      if (onUpdate) {
        onUpdate()
      }

      toast.success(
        updatedNote.completed ? "Note completed" : "Note marked as pending",
        {
          description: updatedNote.completed
            ? "The note has been marked as completed"
            : "The note has been marked as pending",
        }
      )
    } catch (error) {
      toast.error("Failed to update note status")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return

    setIsLoading(true)
    try {
      deleteNote(note.id)
      toast.success("Note deleted", {
        description: "Your note has been deleted successfully",
      })

      if (onUpdate) {
        onUpdate()
      }
    } catch (error) {
      toast.error("Failed to delete note")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    router.push(`/edit/${note.id}`)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const excerpt =
    note.content.length > 100
      ? `${note.content.substring(0, 100)}...`
      : note.content

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card
        className={`w-full h-full border-l-4 ${
          isCompleted
            ? "border-l-green-500 bg-green-50/30 dark:bg-green-950/10"
            : "border-l-primary"
        } transition-all hover:shadow-md`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => handleToggleComplete()}
                  className={`mt-1 ${
                    isCompleted ? "bg-green-500 text-white border-green-500" : ""
                  }`}
                />
              )}
              <CardTitle
                className={`text-lg ${
                  isCompleted ? "line-through text-muted-foreground" : ""
                }`}
              >
                {note.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p
            className={`whitespace-pre-wrap ${
              isCompleted ? "text-muted-foreground" : ""
            }`}
          >
            {excerpt}
          </p>
          <div className="flex items-center mt-4 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(note.updatedAt)}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={isLoading}
            className="hover:bg-primary/10"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isLoading}
            className="opacity-80 hover:opacity-100"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
