import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Type, PenTool, Clock, Move, Play } from "lucide-react"

const categoryIcons = {
  All: Play,
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

interface Project {
  id: number
  title: string
  description: string
  goal: number
  raised: number
  daysLeft: number
  category: string
}

export function ProjectCard({ project }: { project: Project }) {
  const progress = (project.raised / project.goal) * 100
  const Icon = categoryIcons[project.category as keyof typeof categoryIcons]

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <CardTitle>{project.title}</CardTitle>
          <Icon className={`w-5 h-5 ${categoryColors[project.category as keyof typeof categoryColors]}`} />
        </div>
        <div className={`text-sm ${categoryColors[project.category as keyof typeof categoryColors]}`}>
          {project.category}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <Progress value={progress} className="mb-2" />
        <div className="flex justify-between text-sm">
          <span>Complexity: {progress.toFixed(0)}%</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Example</span>
        <Button asChild>
          <Link href={`/projects/${project.id}`}>View Animation</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
