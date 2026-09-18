import React from "react"

interface FormattedChatMessageProps {
  text: string
  className?: string
}

// Helper to parse bold (**...**) and inline code (`...`)
function renderInlineFormatting(line: string) {
  const parts: (string | React.ReactNode)[] = []
  let remaining = line

  // Regex for **bold** or `code`
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/

  let keyIndex = 0
  while (remaining.length > 0) {
    const match = remaining.match(regex)
    if (!match || match.index === undefined) {
      parts.push(remaining)
      break
    }

    if (match.index > 0) {
      parts.push(remaining.substring(0, match.index))
    }

    const matchedStr = match[0]
    if (matchedStr.startsWith("**") && matchedStr.endsWith("**")) {
      parts.push(
        <strong
          key={`b-${keyIndex++}`}
          className="font-semibold text-slate-900"
        >
          {matchedStr.slice(2, -2)}
        </strong>,
      )
    } else if (matchedStr.startsWith("`") && matchedStr.endsWith("`")) {
      parts.push(
        <code
          key={`c-${keyIndex++}`}
          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[11px] border border-slate-200/80"
        >
          {matchedStr.slice(1, -1)}
        </code>,
      )
    }

    remaining = remaining.substring(match.index + matchedStr.length)
  }

  return parts
}

export const FormattedChatMessage: React.FC<FormattedChatMessageProps> = ({
  text,
  className = "",
}) => {
  // Split into block paragraphs
  const paragraphs = text.split(/\n\n+/)

  return (
    <div
      className={`space-y-2.5 text-xs text-slate-800 leading-relaxed ${className}`}
    >
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n")

        // 1. Heading block (### Heading)
        if (para.startsWith("### ")) {
          return (
            <h4
              key={pIdx}
              className="font-bold text-slate-900 text-xs tracking-tight pt-1 flex items-center gap-1.5"
            >
              {renderInlineFormatting(para.replace(/^###\s+/, ""))}
            </h4>
          )
        }

        // 2. Numbered list block (e.g. 1. ... 2. ...)
        const isNumbered = lines.every((l) => /^\d+\.\s+/.test(l.trim()))
        if (isNumbered && lines.length > 0) {
          return (
            <div key={pIdx} className="space-y-1.5 pl-1 my-1">
              {lines.map((line, lIdx) => {
                const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/)
                if (!numMatch) return null
                return (
                  <div key={lIdx} className="flex items-start gap-2 text-xs">
                    <span className="font-semibold text-[#be4c3f] shrink-0 text-[11px] select-none min-w-[14px]">
                      {numMatch[1]}.
                    </span>
                    <span className="text-slate-700 leading-relaxed">
                      {renderInlineFormatting(numMatch[2])}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        }

        // 3. Bullet list block (e.g. - ... or • ...)
        const isBullet = lines.every((l) => /^[-•*]\s+/.test(l.trim()))
        if (isBullet && lines.length > 0) {
          return (
            <div key={pIdx} className="space-y-1.5 pl-1 my-1">
              {lines.map((line, lIdx) => {
                const bulletContent = line.trim().replace(/^[-•*]\s+/, "")
                return (
                  <div key={lIdx} className="flex items-start gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#be4c3f] mt-1.5 shrink-0" />
                    <span className="text-slate-700 leading-relaxed">
                      {renderInlineFormatting(bulletContent)}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        }

        // 4. Mixed lines with bullet or normal text
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim()
              if (/^[-•*]\s+/.test(trimmed)) {
                return (
                  <div
                    key={lIdx}
                    className="flex items-start gap-2 text-xs pl-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#be4c3f] mt-1.5 shrink-0" />
                    <span className="text-slate-700 leading-relaxed">
                      {renderInlineFormatting(trimmed.replace(/^[-•*]\s+/, ""))}
                    </span>
                  </div>
                )
              }
              if (/^\d+\.\s+/.test(trimmed)) {
                const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/)
                if (numMatch) {
                  return (
                    <div
                      key={lIdx}
                      className="flex items-start gap-2 text-xs pl-1"
                    >
                      <span className="font-semibold text-[#be4c3f] shrink-0 text-[11px] select-none min-w-[14px]">
                        {numMatch[1]}.
                      </span>
                      <span className="text-slate-700 leading-relaxed">
                        {renderInlineFormatting(numMatch[2])}
                      </span>
                    </div>
                  )
                }
              }
              return (
                <p key={lIdx} className="text-slate-700 leading-relaxed">
                  {renderInlineFormatting(line)}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default FormattedChatMessage
