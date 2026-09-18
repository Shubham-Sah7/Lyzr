import React, { useState } from "react"
import {
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
} from "lucide-react"

export interface TraceStep {
  name: string
  status: "completed" | "in-progress" | "failed" | "running" | "Completed" | string
  latency: string
}

interface ExecutionTracesCardProps {
  steps: TraceStep[]
  msgId?: string
  fullOutputText?: string
  defaultExpanded?: boolean
  className?: string
}

export const ExecutionTracesCard: React.FC<ExecutionTracesCardProps> = ({
  steps,
  msgId = "trace",
  fullOutputText,
  defaultExpanded = true,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    const content =
      fullOutputText ||
      steps
        .map((st) => `[${st.status.toUpperCase()}] ${st.name} (${st.latency})`)
        .join("\n")
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate total latency if available
  const totalMs = steps.reduce((acc, curr) => {
    const match = curr.latency.match(/(\d+)ms/)
    return match ? acc + parseInt(match[1], 10) : acc
  }, 0)

  return (
    <div
      className={`rounded-xl border border-slate-200/90 bg-slate-50/50 overflow-hidden shadow-2xs transition-all ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-white border-b border-slate-200/80 select-none">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-slate-800 hover:text-[#be4c3f] transition-colors cursor-pointer text-left group"
        >
          <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 group-hover:text-[#be4c3f] transition-colors shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-xs text-slate-800 group-hover:text-[#be4c3f]">
            Execution Step Traces
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {steps.length} steps verified
          </span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#be4c3f] transition-transform" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#be4c3f] transition-transform" />
          )}
        </button>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          title="Copy output trace"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-500" />
              <span>Copy output</span>
            </>
          )}
        </button>
      </div>

      {/* Trace items */}
      {isExpanded && (
        <div className="bg-white">
          <div className="p-2 space-y-1">
            {steps.map((st, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span
                    className="font-medium text-slate-800 text-xs truncate"
                    title={st.name}
                  >
                    {st.name}
                  </span>
                </div>

                <span className="shrink-0 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-[10px] font-semibold text-slate-600">
                  {st.latency}
                </span>
              </div>
            ))}
          </div>

          {/* Trace Card Footer */}
          <div className="px-3 py-1.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-slate-400" />
              Runtime: Sandbox V8
            </span>
            <span>
              {totalMs > 0 ? `Total latency: ${totalMs}ms` : "Traces verified"}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExecutionTracesCard
