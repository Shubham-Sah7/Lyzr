import React from "react"

export function GmailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 -5 256 200" fill="none">
      <path
        d="M58.18 192.05V93.14L27.5 65.08 0 49.5v125.09c0 9.66 7.83 17.46 17.45 17.46h40.73z"
        fill="#4285F4"
      />
      <path
        d="M197.82 192.05h40.73c9.66 0 17.45-7.83 17.45-17.46V49.5l-31.15 17.84-27.03 25.8v98.91z"
        fill="#34A853"
      />
      <polygon
        points="58.18 93.14 54.01 54.49 58.18 17.5 128 69.87 197.82 17.5 202.49 52.5 197.82 93.14 128 145.5"
        fill="#EA4335"
      />
      <path
        d="M197.82 17.5v75.64l58.18-43.64V26.23c0-21.58-24.64-33.89-41.89-20.94l-16.29 12.21z"
        fill="#FBBC04"
      />
      <path
        d="M0 49.5l26.76 20.07 31.42 23.57V17.5L41.89 5.29C24.61-7.66 0 4.65 0 26.23V49.5z"
        fill="#C5221F"
      />
    </svg>
  )
}

export function SlackIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="14 14 56 56" fill="none">
      {/* Light blue pill & dot (left) */}
      <path
        d="M19.83 40C16.6 40 14 37.32 14 34s2.6-6 5.83-6h14.34C37.4 28 40 30.68 40 34s-2.6 6-5.83 6z"
        fill="#36C5F1"
      />
      <path
        d="M40 20v6h-6c-3.32 0-6-2.68-6-6s2.68-6 6-6 6 2.68 6 6z"
        fill="#36C5F1"
      />
      {/* Green pill & dot (top) */}
      <path
        d="M44 19.83C44 16.6 46.68 14 50 14s6 2.6 6 5.83v14.34C56 37.4 53.32 40 50 40s-6-2.6-6-5.83z"
        fill="#2FB67C"
      />
      <path
        d="M64 40h-6v-6c0-3.32 2.68-6 6-6s6 2.68 6 6-2.68 6-6 6z"
        fill="#2FB67C"
      />
      {/* Magenta/red pill & dot (bottom-left) */}
      <path
        d="M28 49.83C28 46.6 30.68 44 34 44s6 2.6 6 5.83v14.34C40 67.4 37.32 70 34 70s-6-2.6-6-5.83z"
        fill="#E01E5A"
      />
      <path
        d="M20 44h6v6c0 3.32-2.68 6-6 6s-6-2.68-6-6 2.68-6 6-6z"
        fill="#E01E5A"
      />
      {/* Yellow pill & dot (right) */}
      <path
        d="M49.83 56C46.6 56 44 53.32 44 50s2.6-6 5.83-6h14.34C67.4 44 70 46.68 70 50s-2.6 6-5.83 6z"
        fill="#ECB22D"
      />
      <path
        d="M44 64c0 3.32 2.68 6 6 6s6-2.68 6-6-2.68-6-6-6h-6z"
        fill="#ECB22D"
      />
    </svg>
  )
}

export function SheetsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#0F9D58" />
      <path
        d="M6.5 10.5h11M6.5 14.5h11M10.5 6.5v11"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function GlobeToolIcon({
  className = "w-5 h-5",
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function renderToolIcon(name: string, className = "w-5 h-5") {
  const lower = name.toLowerCase()
  if (lower.includes("gmail") || lower.includes("email")) {
    return <GmailIcon className={className} />
  }
  if (lower.includes("slack")) {
    return <SlackIcon className={className} />
  }
  if (lower.includes("sheet") || lower.includes("excel")) {
    return <SheetsIcon className={className} />
  }
  if (
    lower.includes("web") ||
    lower.includes("search") ||
    lower.includes("browser")
  ) {
    return <GlobeToolIcon className={`${className} text-slate-700`} />
  }
  return <span className="text-sm">🔧</span>
}
