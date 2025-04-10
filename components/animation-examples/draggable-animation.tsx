"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

declare global {
  interface Window {
    anime: any
  }
}

export function DraggableAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.anime || !containerRef.current || !ballRef.current) return

    const container = containerRef.current
    const ball = ballRef.current

    // Set initial position
    window.anime.set(ball, {
      translateX: 100,
      translateY: 100,
    })

    // Make element draggable
    let isDragging = false
    let startX = 0
    let startY = 0
    let animation: any = null

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.clientX
      startY = e.clientY

      // Stop any running animation
      if (animation) animation.pause()

      // Add event listeners for drag
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

      // Get current position
      const rect = ball.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // Calculate boundaries
      const maxX = containerRect.width - rect.width
      const maxY = containerRect.height - rect.height

      // Create bounce animation
      animation = window.anime({
        targets: ball,
        translateX: Math.min(Math.max(0, rect.left - containerRect.left), maxX),
        translateY: Math.min(Math.max(0, rect.top - containerRect.top), maxY),
        duration: 800,
        easing: "easeOutElastic(1, .6)",
      })
    }

    ball.addEventListener("mousedown", handleMouseDown)

    // Add touch support
    ball.addEventListener("touchstart", (e) => {
      e.preventDefault()
      isDragging = true
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY

      if (animation) animation.pause()
    })

    document.addEventListener("touchmove", (e) => {
      if (!isDragging) return

      const dx = e.touches[0].clientX - startX
      const dy = e.touches[0].clientY - startY

      const currentTranslateX = Number.parseFloat(ball.style.transform.split("translateX(")[1]) || 0
      const currentTranslateY = Number.parseFloat(ball.style.transform.split("translateY(")[1]) || 0

      window.anime.set(ball, {
        translateX: currentTranslateX + dx,
        translateY: currentTranslateY + dy,
      })

      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    })

    document.addEventListener("touchend", () => {
      isDragging = false

      // Get current position
      const rect = ball.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      // Calculate boundaries
      const maxX = containerRect.width - rect.width
      const maxY = containerRect.height - rect.height

      // Create bounce animation
      animation = window.anime({
        targets: ball,
        translateX: Math.min(Math.max(0, rect.left - containerRect.left), maxX),
        translateY: Math.min(Math.max(0, rect.top - containerRect.top), maxY),
        duration: 800,
        easing: "easeOutElastic(1, .6)",
      })
    })

    return () => {
      ball.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      if (animation) animation.pause()
    }
  }, [])

  return (
    <Card className="p-4">
      <div
        ref={containerRef}
        className="relative w-full h-[200px] border border-dashed border-muted-foreground rounded-md"
      >
        <div
          ref={ballRef}
          className="absolute w-16 h-16 bg-purple-500 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center text-white text-xs"
        >
          Drag me
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">Click and drag the ball</p>
    </Card>
  )
}
