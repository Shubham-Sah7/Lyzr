import React from "react"

export interface AiOrbProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number
  className?: string
  animate?: boolean
  isThinking?: boolean
  showGlow?: boolean
}

export default function AiOrb({
  size = "md",
  className = "",
  animate = true,
  isThinking = false,
  showGlow = true,
}: AiOrbProps) {
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
      {/* Ambient Pulsing Aura/Glow */}
      {showGlow && (
        <div
          className={`absolute inset-[-15%] rounded-full pointer-events-none ${
            animate
              ? isThinking
                ? "animate-orb-glow opacity-85 scale-110"
                : "animate-orb-glow"
              : "opacity-60"
          }`}
          style={{
            background:
              "radial-gradient(circle at 35% 45%, rgba(244, 63, 158, 0.55) 0%, rgba(56, 189, 248, 0.55) 55%, transparent 75%)",
            filter: "blur(6px)",
          }}
        />
      )}

      {/* Ripple ring for active thinking state */}
      {isThinking && (
        <div
          className="absolute inset-[-20%] rounded-full animate-ping opacity-40 pointer-events-none"
          style={{
            border: "1.5px solid rgba(244, 63, 158, 0.6)",
          }}
        />
      )}

      {/* Outer Floating & Breathing Container */}
      <div
        className={`relative w-full h-full rounded-full flex items-center justify-center ${
          animate
            ? isThinking
              ? "animate-orb-breathe"
              : "animate-orb-float"
            : ""
        }`}
      >
        {/* Rotating gradient orb image */}
        <img
          src="/ai-orb-256.png"
          alt="AI Orb"
          className={`w-full h-full object-contain rounded-full drop-shadow-xs ${
            animate
              ? isThinking
                ? "animate-orb-spin-fast"
                : "animate-orb-spin-slow"
              : ""
          }`}
          style={{
            willChange: "transform",
          }}
        />

        {/* Dynamic Specular Sheen (stays oriented while the texture rotates) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle at 38% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 65%)",
          }}
        />
      </div>
    </div>
  )
}
