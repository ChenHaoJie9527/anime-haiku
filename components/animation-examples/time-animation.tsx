"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

declare global {
  interface Window {
    anime: any
  }
}

export function TimeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.anime || !containerRef.current) return

    const container = containerRef.current
    container.innerHTML = ""

    // Create elements
    for (let i = 0; i < 25; i++) {
      const el = document.createElement("div")
      el.classList.add("element")
      el.style.width = "20px"
      el.style.height = "20px"
      el.style.backgroundColor = "#22d3ee"
      el.style.borderRadius = "50%"
      el.style.position = "absolute"
      container.appendChild(el)
    }

    const elements = container.querySelectorAll(".element")

    // Create timeline animation
    const timeline = window.anime.timeline({
      easing: "easeOutExpo",
      duration: 750,
      loop: true,
    })

    // Add animations to timeline
    timeline
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
      .add({
        targets: elements,
        translateX: 100,
        translateY: 100,
        scale: 0,
        backgroundColor: "#f472b6",
      })

    return () => {
      timeline.pause()
    }
  }, [])

  return (
    <Card className="p-4">
      <div ref={containerRef} className="relative w-full h-[200px]"></div>
    </Card>
  )
}
