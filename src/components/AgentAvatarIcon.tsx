import React from "react"

export default function AgentAvatarIcon({
  className = "w-4 h-4 text-[#be4c3f]",
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M9 4v4" />
      <path d="M15 4v4" />
      <circle cx="9" cy="14" r="1" fill="currentColor" />
      <circle cx="15" cy="14" r="1" fill="currentColor" />
      <path d="M11 17h2" />
    </svg>
  )
}
