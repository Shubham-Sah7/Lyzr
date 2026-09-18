import React, { useState } from "react"
import { Share2, Check, ChevronDown, MoreHorizontal, Home } from "lucide-react"
import ShareModal from "./ShareModal"
import DeployModal from "./DeployModal"

interface HeaderProps {
  activeTab: "build" | "run" | "evaluate"
  avatarMask?: string
  avatarImg?: string
  agentTitle?: string
  onTabChange?: (tab: "build" | "run" | "evaluate") => void
  onHomeClick?: () => void
}

export default function Header({
  activeTab,
  avatarMask,
  avatarImg,
  agentTitle = "Untitled agent",
  onTabChange,
  onHomeClick,
}: HeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isDeployOpen, setIsDeployOpen] = useState(false)

  return (
    <>
      <header className="bg-white border-b border-slate-200 flex items-center justify-between px-6 py-2.5 shrink-0 w-full select-none">
        {/* Left section: Home icon, divider, Agent Title, Published pill */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onHomeClick}
            className="p-1 text-[#be4c3f] hover:bg-[#fdf2f0] rounded transition-colors"
            title="Agent Home"
          >
            <Home className="w-4 h-4 text-[#be4c3f]" />
          </button>
          <div className="h-4 w-px bg-slate-200" />

          <span className="font-semibold text-slate-900 text-sm whitespace-nowrap">
            {agentTitle}
          </span>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50/70 border border-emerald-200/60 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Published</span>
          </div>
        </div>

        {/* Center tabs: Build / Run / Evaluate */}
        <div className="flex items-center bg-slate-100/90 p-0.5 rounded-lg border border-slate-200/70">
          <button
            onClick={() => onTabChange && onTabChange("build")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "build"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Build</span>
          </button>

          <button
            onClick={() => onTabChange && onTabChange("run")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "run"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Run</span>
          </button>

          <button
            onClick={() => onTabChange && onTabChange("evaluate")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === "evaluate"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>Evaluate</span>
          </button>
        </div>

        {/* Right section: Share, Save draft, Deploy dropdown, More */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Share</span>
          </button>

          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors border border-slate-200 shadow-2xs">
            Save draft
          </button>

          <div className="flex items-center bg-[#be4c3f] hover:bg-[#a83e32] text-white rounded-lg overflow-hidden transition-colors shadow-2xs">
            <button
              onClick={() => setIsDeployOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1"
            >
              Deploy
            </button>
            <button
              onClick={() => setIsDeployOpen(true)}
              className="px-1.5 py-1.5 border-l border-white/20 hover:bg-white/10 transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setIsDeployOpen(true)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        agentTitle={agentTitle}
      />

      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        agentTitle={agentTitle}
      />
    </>
  )
}
