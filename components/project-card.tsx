import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categoryColors, categoryIcons } from "@/config"


interface Project {
  id: number
  title: string
  description: string
  category: string
}

export function ProjectCard({ project }: { project: Project }) {
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
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        
      </CardFooter>
    </Card>
  )
}
