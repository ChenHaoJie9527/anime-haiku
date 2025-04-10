"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

declare global {
  interface Window {
    anime: any
  }
}

export function TextAnimation() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.anime || !textRef.current) return

    // Create text elements
    const text = "Anime.js Text Animation"
    const container = textRef.current
    container.innerHTML = ""

    // Create wrapper for each character
    text.split("").forEach((char) => {
      const span = document.createElement("span")
      span.innerText = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      span.style.fontSize = "2rem"
      span.style.fontWeight = "bold"
      container.appendChild(span)
    })

    // Animate each character
    const animation = window.anime.timeline({
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
      .add({
        translateY: [0, 30],
        opacity: [1, 0],
        delay: window.anime.stagger(50),
        duration: 800,
      })
      .add({
        duration: 1000,
      })

    return () => {
      animation.pause()
    }
  }, [])

  return (
    <Card className="p-8 flex items-center justify-center min-h-[200px]">
      <div ref={textRef} className="text-center"></div>
    </Card>
  )
}
