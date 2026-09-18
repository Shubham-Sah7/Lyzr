import React from "react"
import {
  Bot,
  Wrench,
  Users,
  Database,
  Phone,
  Plus,
  ArrowRight,
  X,
} from "lucide-react"

interface CreateModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectOption: (optionId: string) => void
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onSelectOption,
}) => {
  if (!isOpen) return null

  const createOptions = [
    {
      id: "agent",
      title: "Agent",
      description:
        "Create a new AI agent from scratch with custom instructions",
      icon: Bot,
      bgColor: "bg-slate-100 text-slate-800 border-slate-200",
      badge: "Popular",
    },
    {
      id: "tool",
      title: "Tool",
      description: "Build a custom workflow or integration for external APIs",
      icon: Wrench,
      bgColor: "bg-slate-100 text-slate-800 border-slate-200",
      badge: undefined,
    },
    {
      id: "workforce",
      title: "Workforce",
      description: "Manage a team of agents working together autonomously",
      icon: Users,
      bgColor: "bg-indigo-50 text-indigo-600 border-indigo-200",
      badge: "Multi-Agent",
    },
    {
      id: "knowledge",
      title: "Knowledge Base",
      description: "Add vector data, documents, and APIs to power your agents",
      icon: Database,
      bgColor: "bg-amber-50 text-amber-600 border-amber-200",
      badge: "RAG",
    },
    {
      id: "phone",
      title: "Phone / Voice Agent",
      description:
        "Build an interactive voice agent for inbound or outbound calls",
      icon: Phone,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      badge: "Voice AI",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl border border-slate-200 p-5 z-10 overflow-hidden transform transition-all animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">
                Create New Asset
              </h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Select what type of capability you want to build
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="mt-3 space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
          {createOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <button
                key={opt.id}
                onClick={() => {
                  onSelectOption(opt.id)
                  onClose()
                }}
                className="w-full text-left flex items-start gap-3 p-3 rounded-md border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all group relative"
              >
                <div className="p-2 rounded-md bg-slate-50 border border-slate-200 text-slate-700 flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900 text-xs">
                      {opt.title}
                    </span>
                    {opt.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5 line-clamp-2">
                    {opt.description}
                  </p>
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
