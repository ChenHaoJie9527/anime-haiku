"use client"

import { Button } from "@/components/ui/button"
import { Type, PenTool, Clock, Move } from "lucide-react"

const categoryIcons = {
  All: Type,
  Text: Type,
  Path: PenTool,
  Time: Clock,
  Draggable: Move,
}

const categoryColors = {
  All: "text-blue-400",
  Text: "text-purple-400",
  Path: "text-green-400",
  Time: "text-cyan-400",
  Draggable: "text-pink-400",
}

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {["All", ...categories].map((category, index) => {
        const Icon = categoryIcons[category as keyof typeof categoryIcons]
        return (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="rounded-full px-3 py-1 text-sm"
            onClick={() => onCategoryChange(category)}
          >
            <Icon className={`w-3 h-3 mr-1 ${categoryColors[category as keyof typeof categoryColors]}`} />
            <span>{category}</span>
          </Button>
        )
      })}
    </div>
  )
}
