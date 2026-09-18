import React from "react"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showText = true,
  size = "md",
}) => {
  const heights = {
    sm: "h-6",
    md: "h-7",
    lg: "h-9",
  }

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <img
        src="/Logo.webp"
        alt="Logo"
        className={`${heights[size]} w-auto object-contain transition-transform duration-200 hover:scale-105`}
      />
    </div>
  )
}
export default Logo
