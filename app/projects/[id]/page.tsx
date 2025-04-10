"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Type, PenTool, Clock, Move, Play } from "lucide-react"
import { DonationOverlay } from "@/components/donation-overlay"
import projectsData from "@/data/projects.json"
import { TextAnimation } from "@/components/animation-examples/text-animation"
import { PathAnimation } from "@/components/animation-examples/path-animation"
import { TimeAnimation } from "@/components/animation-examples/time-animation"
import { DraggableAnimation } from "@/components/animation-examples/draggable-animation"

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

const AnimationComponents = {
  Text: TextAnimation,
  Path: PathAnimation,
  Time: TimeAnimation,
  Draggable: DraggableAnimation,
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [isDonationOverlayOpen, setIsDonationOverlayOpen] = useState(false)
  const project = projectsData.find((p) => p.id === Number.parseInt(params.id))

  if (!project) {
    notFound()
  }

  const progress = (project.raised / project.goal) * 100
  const Icon = categoryIcons[project.category as keyof typeof categoryIcons]
  const AnimationComponent = AnimationComponents[project.category as keyof typeof AnimationComponents]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">{project.title}</CardTitle>
            <div className="flex items-center">
              <Icon className={`w-6 h-6 mr-2 ${categoryColors[project.category as keyof typeof categoryColors]}`} />
              <span className={`text-lg ${categoryColors[project.category as keyof typeof categoryColors]}`}>
                {project.category}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">{AnimationComponent && <AnimationComponent />}</div>
          <p className="text-xl mb-6">{project.description}</p>
          <div className="space-y-4">
            <Progress value={progress} className="h-4" />
            <div className="flex justify-between text-lg">
              <span>Complexity: {progress.toFixed(0)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <Button size="lg" className="w-full" onClick={() => setIsDonationOverlayOpen(true)}>
            Try This Animation
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Animation Code</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto">
            <code className="text-sm font-mono">
              {project.category === "Text" &&
                `
anime({
  targets: '.text-animation span',
  translateY: [-30, 0],
  opacity: [0, 1],
  easing: 'easeInOutQuad',
  duration: 800,
  delay: anime.stagger(50)
});
              `}
              {project.category === "Path" &&
                `
anime({
  targets: 'svg path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});
              `}
              {project.category === "Time" &&
                `
const timeline = anime.timeline({
  easing: 'easeOutExpo',
  duration: 750
});

timeline
  .add({
    targets: '.element',
    translateX: function(el, i) {
      return 100 + 30 * Math.cos(i * 0.35);
    },
    translateY: function(el, i) {
      return 100 + 30 * Math.sin(i * 0.35);
    },
    scale: [0, 1],
    delay: anime.stagger(10)
  })
  .add({
    targets: '.element',
    translateX: function(el, i) {
      return 100 + 70 * Math.cos(i * 0.35);
    },
    translateY: function(el, i) {
      return 100 + 70 * Math.sin(i * 0.35);
    }
  });
              `}
              {project.category === "Draggable" &&
                `
// Make element draggable
let isDragging = false;
let startX = 0;
let startY = 0;

element.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

function handleMouseMove(e) {
  if (!isDragging) return;
  
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  
  anime.set(element, {
    translateX: '+=' + dx,
    translateY: '+=' + dy
  });
  
  startX = e.clientX;
  startY = e.clientY;
}

function handleMouseUp() {
  isDragging = false;
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}
              `}
            </code>
          </pre>
        </CardContent>
      </Card>
      <DonationOverlay
        isOpen={isDonationOverlayOpen}
        onClose={() => setIsDonationOverlayOpen(false)}
        projectTitle={project.title}
      />
    </div>
  )
}
