"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

declare global {
  interface Window {
    anime: any
  }
}

export function PathAnimation() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.anime || !svgRef.current) return

    const svg = svgRef.current

    // Create the path animation
    const animation = window.anime({
      targets: svg.querySelectorAll("path"),
      strokeDashoffset: [window.anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1500,
      delay: (el, i) => i * 250,
      direction: "alternate",
      loop: true,
    })

    return () => {
      animation.pause()
    }
  }, [])

  return (
    <Card className="p-8 flex items-center justify-center min-h-[200px]">
      <svg ref={svgRef} width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="#9333ea" strokeWidth="4" d="M50,100 C50,50 150,50 150,100 C150,150 50,150 50,100 Z" />
        <path fill="none" stroke="#22d3ee" strokeWidth="4" d="M70,70 L130,70 L130,130 L70,130 Z" />
        <path fill="none" stroke="#4ade80" strokeWidth="4" d="M100,50 L100,150" />
        <path fill="none" stroke="#f472b6" strokeWidth="4" d="M50,100 L150,100" />
      </svg>
    </Card>
  )
}
