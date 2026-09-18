import React from "react"

export interface AiOrbProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number
  className?: string
  // Kept for backward compatibility but animations are strictly disabled per user request
  animate?: boolean
  isThinking?: boolean
  showGlow?: boolean
}

export default function AiOrb({ size = "md", className = "" }: AiOrbProps) {
  let dimClass = "w-7 h-7"
  let pixelSize: number | undefined = undefined

  if (typeof size === "number") {
    pixelSize = size
  } else {
    switch (size) {
      case "xs":
        dimClass = "w-4 h-4"
        break
      case "sm":
        dimClass = "w-6 h-6"
        break
      case "md":
        dimClass = "w-7 h-7"
        break
      case "lg":
        dimClass = "w-10 h-10"
        break
      case "xl":
        dimClass = "w-14 h-14"
        break
      case "2xl":
        dimClass = "w-20 h-20"
        break
    }
  }

  const customStyle: React.CSSProperties = pixelSize
    ? { width: `${pixelSize}px`, height: `${pixelSize}px` }
    : {}

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${dimClass} ${className}`}
      style={customStyle}
    >
      <img
        src="/ai-orb-256.png"
        alt="AI Orb"
        className="w-full h-full object-contain rounded-full select-none"
        draggable={false}
      />
    </div>
  )
}
