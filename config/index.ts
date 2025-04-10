import { Type, PenTool, Clock, Move, Slack  } from "lucide-react"

export const categoryIcons = {
  All: Type,
  Text: Type,
  Path: PenTool,
  Time: Clock,
  Draggable: Move,
  Logo: Slack,
}

export const categoryColors = {
  All: "text-blue-400",
  Text: "text-purple-400",
  Path: "text-green-400",
  Time: "text-cyan-400",
  Draggable: "text-pink-400",
  Logo: "text-red-400",
}

export type Category = "All" | "Text" | "Path" | "Time" | "Draggable" | "Logo"
