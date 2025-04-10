"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import confetti from "canvas-confetti"

interface StartProjectOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const categories = ["Text", "Path", "Time", "Draggable"]

export function StartProjectOverlay({ isOpen, onClose }: StartProjectOverlayProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [code, setCode] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = () => {
    // Here you would handle the actual animation submission
    console.log("Animation submitted:", { title, description, code, category })

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    // Reset form and close overlay
    setTitle("")
    setDescription("")
    setCode("")
    setCategory("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Animation</DialogTitle>
          <DialogDescription>Fill in the details below to create your anime.js animation.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Animation Title</Label>
            <Input
              id="title"
              placeholder="Enter animation title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Animation Description</Label>
            <Textarea
              id="description"
              placeholder="Enter animation description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Anime.js Code</Label>
            <Textarea
              id="code"
              placeholder="Enter your anime.js code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm"
              rows={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Animation Category</Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit} className="w-full" disabled={!title || !description || !category}>
            Create Animation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
