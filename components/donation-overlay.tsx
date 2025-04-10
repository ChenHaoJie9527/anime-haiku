"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

declare global {
  interface Window {
    anime: any
  }
}

interface DonationOverlayProps {
  isOpen: boolean
  onClose: () => void
  projectTitle: string
}

export function DonationOverlay({ isOpen, onClose, projectTitle }: DonationOverlayProps) {
  const animationRef = useRef<HTMLDivElement>(null)
  const [animationInstance, setAnimationInstance] = useState<any>(null)

  useEffect(() => {
    if (!isOpen || !animationRef.current || typeof window === "undefined" || !window.anime) return

    let animation: any = null

    // Create different animations based on the project title
    if (projectTitle.includes("Text")) {
      // Create text elements
      const text = "Anime.js Text"
      const container = animationRef.current
      container.innerHTML = ""

      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.innerText = char === " " ? "\u00A0" : char
        span.style.display = "inline-block"
        span.style.fontSize = "2rem"
        span.style.fontWeight = "bold"
        container.appendChild(span)
      })

      animation = window.anime.timeline({
        targets: container.querySelectorAll("span"),
        easing: "easeInOutQuad",
        loop: true,
      })

      animation
        .add({
          translateY: [-30, 0],
          opacity: [0, 1],
          delay: window.anime.stagger(50),
          duration: 800,
        })
        .add({
          translateY: 0,
          scale: [1, 1.2],
          rotate: [-5, 5],
          delay: window.anime.stagger(100),
          duration: 600,
        })
    } else if (projectTitle.includes("Path")) {
      // Create SVG
      const container = animationRef.current
      container.innerHTML = `
        <svg width="200" height="200" viewBox="0 0 200 200">
          <path
            fill="none"
            stroke="#9333ea"
            strokeWidth="4"
            d="M50,100 C50,50 150,50 150,100 C150,150 50,150 50,100 Z"
          />
          <path
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
            d="M70,70 L130,70 L130,130 L70,130 Z"
          />
        </svg>
      `

      animation = window.anime({
        targets: container.querySelectorAll("path"),
        strokeDashoffset: [window.anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        delay: (el: any, i: number) => i * 250,
        direction: "alternate",
        loop: true,
      })
    } else if (
      projectTitle.includes("Timeline") ||
      projectTitle.includes("Time") ||
      projectTitle.includes("Staggered")
    ) {
      // Create elements
      const container = animationRef.current
      container.innerHTML = ""

      for (let i = 0; i < 25; i++) {
        const el = document.createElement("div")
        el.classList.add("element")
        el.style.width = "15px"
        el.style.height = "15px"
        el.style.backgroundColor = "#22d3ee"
        el.style.borderRadius = "50%"
        el.style.position = "absolute"
        container.appendChild(el)
      }

      const elements = container.querySelectorAll(".element")

      animation = window.anime.timeline({
        easing: "easeOutExpo",
        duration: 750,
        loop: true,
      })

      animation
        .add({
          targets: elements,
          translateX: (el: any, i: number) => 100 + 30 * Math.cos(i * 0.35),
          translateY: (el: any, i: number) => 100 + 30 * Math.sin(i * 0.35),
          scale: [0, 1],
          delay: window.anime.stagger(10),
          backgroundColor: "#9333ea",
        })
        .add({
          targets: elements,
          translateX: (el: any, i: number) => 100 + 70 * Math.cos(i * 0.35),
          translateY: (el: any, i: number) => 100 + 70 * Math.sin(i * 0.35),
          backgroundColor: "#4ade80",
        })
    } else if (projectTitle.includes("Draggable")) {
      // Create draggable element
      const container = animationRef.current
      container.innerHTML = `
        <div class="relative w-full h-[200px] border border-dashed border-muted-foreground rounded-md">
          <div class="ball absolute w-16 h-16 bg-purple-500 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center text-white text-xs">
            Drag me
          </div>
        </div>
      `

      const ball = container.querySelector(".ball") as HTMLElement

      // Set initial position
      window.anime.set(ball, {
        translateX: 100,
        translateY: 100,
      })

      // Make element draggable
      let isDragging = false
      let startX = 0
      let startY = 0

      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        startX = e.clientX
        startY = e.clientY

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return

        const dx = e.clientX - startX
        const dy = e.clientY - startY

        const currentTranslateX = Number.parseFloat(ball.style.transform.split("translateX(")[1]) || 0
        const currentTranslateY = Number.parseFloat(ball.style.transform.split("translateY(")[1]) || 0

        window.anime.set(ball, {
          translateX: currentTranslateX + dx,
          translateY: currentTranslateY + dy,
        })

        startX = e.clientX
        startY = e.clientY
      }

      const handleMouseUp = () => {
        isDragging = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      ball.addEventListener("mousedown", handleMouseDown)

      animation = {
        pause: () => {
          ball.removeEventListener("mousedown", handleMouseDown)
          document.removeEventListener("mousemove", handleMouseMove)
          document.removeEventListener("mouseup", handleMouseUp)
        },
      }
    }

    setAnimationInstance(animation)

    return () => {
      if (animation && animation.pause) {
        animation.pause()
      }
    }
  }, [isOpen, projectTitle])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Try {projectTitle}</DialogTitle>
          <DialogDescription>Interactive animation preview</DialogDescription>
        </DialogHeader>
        <Card className="p-8 flex items-center justify-center min-h-[300px]">
          <div ref={animationRef} className="w-full h-full flex items-center justify-center"></div>
        </Card>
        <Button onClick={onClose} className="w-full">
          Close Preview
        </Button>
      </DialogContent>
    </Dialog>
  )
}
