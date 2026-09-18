import React, { useState } from "react"
import StudioMainView from "./screens/StudioMainView"
import RelevanceStudioView from "./screens/RelevanceStudioView"
import Screen1 from "./screens/Screen1"
import Screen2 from "./screens/Screen2"
import Screen3 from "./screens/Screen3"
import Screen4 from "./screens/Screen4"
import EvaluationView from "./components/EvaluationView"
import { AgentsDirectoryView } from "./components/AgentsDirectoryView"
import { CreateModal } from "./components/CreateModal"
import CaseStudyView from "./components/CaseStudyView"
import {
  Layout,
  Folder,
  MessageSquare,
  Play,
  Gauge,
  Search,
  Bell,
  Moon,
  FileText,
} from "lucide-react"

const screens = [
  { id: 1, label: "Studio — Main Reference", icon: Layout, hasDiamond: true },
  { id: 2, label: "Folders Workspace", icon: Folder },
  { id: 3, label: "Copilot Chat", icon: MessageSquare },
  { id: 4, label: "Live Run & Sandbox", icon: Play },
  { id: 5, label: "Benchmark Evaluate", icon: Gauge },
  { id: 7, label: "Case Study", icon: FileText },
]

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, {
  hasError: boolean
  error: Error | null
}> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 text-slate-800">
          <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="px-4 py-2 bg-[#be4c3f] text-white rounded-xl text-xs font-semibold hover:bg-[#a83e32] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [active, setActiveState] = useState<number>(() => {
    try {
      const hash = window.location.hash.replace("#", "").toLowerCase()
      if (hash === "studio" || hash === "1") return 1
      if (hash === "folders" || hash === "workspace" || hash === "2") return 2
      if (hash === "copilot" || hash === "chat" || hash === "3") return 3
      if (hash === "sandbox" || hash === "run" || hash === "4") return 4
      if (hash === "evaluate" || hash === "eval" || hash === "5") return 5
      if (hash === "directory" || hash === "agents" || hash === "6") return 6
      if (hash === "case-study" || hash === "casestudy" || hash === "study" || hash === "7") return 7
      const saved = localStorage.getItem("lyzx_active_tab")
      if (saved) {
        const num = parseInt(saved, 10)
        if (num >= 1 && num <= 7) return num
      }
    } catch (_) {}
    return 1 // Default to Studio — Main Reference
  })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const setActive = (id: number) => {
    setActiveState(id)
    try {
      localStorage.setItem("lyzx_active_tab", String(id))
      const slugs: Record<number, string> = {
        1: "studio",
        2: "folders",
        3: "copilot",
        4: "sandbox",
        5: "evaluate",
        6: "directory",
        7: "case-study",
      }
      window.location.hash = slugs[id] || String(id)
    } catch (_) {}
  }

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase()
      const map: Record<string, number> = {
        studio: 1,
        "1": 1,
        folders: 2,
        workspace: 2,
        "2": 2,
        copilot: 3,
        chat: 3,
        "3": 3,
        sandbox: 4,
        run: 4,
        "4": 4,
        evaluate: 5,
        eval: 5,
        "5": 5,
        directory: 6,
        agents: 6,
        "6": 6,
        "case-study": 7,
        casestudy: 7,
        study: 7,
        "7": 7,
      }
      if (map[hash]) {
        setActiveState(map[hash])
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleNavigateTab = (tab: "build" | "run" | "evaluate") => {
    if (tab === "run") {
      setActive(4)
    } else if (tab === "build") {
      setActive(1)
    } else if (tab === "evaluate") {
      setActive(5)
    }
  }

  const handleHomeClick = () => {
    setActive(6) // 6 = Agents Directory
  }

  return (
    <div className="flex flex-col h-screen bg-white font-sans antialiased text-slate-800 overflow-hidden">
      {/* Top Global Screen Selector bar matching reference screenshot */}
      <div className="bg-white text-slate-800 flex items-center justify-between px-5 py-2 shrink-0 border-b border-slate-200 select-none relative">
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActive(1)}
          >
            <img
              src="/Logo.webp"
              alt="Logo"
              className="h-5 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {screens.map((s) => {
              const Icon = s.icon
              const isCurrent = active === s.id
              return (
                <button
                  key={s.id}
                  id={`tab-${s.id}`}
                  onClick={() => setActive(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border relative ${
                    isCurrent
                      ? "bg-[#fdf2f0] text-[#be4c3f] border-[#f5d0cb] shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isCurrent ? "text-[#be4c3f]" : "text-slate-500"
                    }`}
                  />
                  <span>{s.label}</span>
                  {s.hasDiamond && (
                    <span className="text-[#be4c3f] text-xs leading-none">
                      ◆
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right tools: Moon toggle, Notification Bell, User Avatar SS */}
        <div className="flex items-center gap-2.5">
          <button className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Moon className="w-4 h-4" />
          </button>

          <button className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
          </button>

          <div
            onClick={() => setActive(6)}
            className="w-7 h-7 rounded-full overflow-hidden cursor-pointer shadow-2xs hover:ring-2 hover:ring-[#be4c3f] transition-all ml-1 ring-1 ring-slate-200"
            title="User Profile & All Agents"
          >
            <img
              src="/user-avatar.jpg"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Screen content area */}
      <ErrorBoundary>
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          {active === 1 && (
            <StudioMainView
              onNavigateTab={handleNavigateTab}
              onHomeClick={handleHomeClick}
              onOpenFolders={() => setActive(2)}
              onOpenCopilot={() => setActive(3)}
            />
          )}
          {active === 2 && (
            <Screen2
              onNavigateTab={handleNavigateTab}
              onOpenCopilot={() => setActive(3)}
              onHomeClick={handleHomeClick}
            />
          )}
          {active === 3 && (
            <Screen3
              onNavigateTab={handleNavigateTab}
              onHomeClick={handleHomeClick}
            />
          )}
          {active === 4 && (
            <Screen4
              onNavigateTab={handleNavigateTab}
              onHomeClick={handleHomeClick}
            />
          )}
          {active === 5 && (
            <EvaluationView
              onNavigateTab={handleNavigateTab}
              onHomeClick={handleHomeClick}
            />
          )}
          {active === 6 && (
            <AgentsDirectoryView
              onOpenCreateModal={() => setIsCreateModalOpen(true)}
              onSelectAgent={() => setActive(2)}
              onOpenInventStudio={() => setActive(3)}
            />
          )}
          {active === 7 && (
            <CaseStudyView
              onNavigateScreen={(id) => setActive(id)}
            />
          )}
        </div>
      </ErrorBoundary>

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSelectOption={() => {
          setIsCreateModalOpen(false)
          setActive(2)
        }}
      />
    </div>
  )
}
