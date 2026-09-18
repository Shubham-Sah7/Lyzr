import React, { useState } from "react"
import { SlackIcon, SheetsIcon, GmailIcon } from "./ToolIcons"
import {
  Bot,
  Wand2,
  FileText,
  Wrench,
  Database,
  Zap,
  Bell,
  Brain,
  Share2,
  Plus,
  Terminal,
  Home,
  ChevronDown,
  MoreHorizontal,
  ChevronsLeft,
  ChevronsRight,
  HelpCircle,
  X,
  Send,
  Maximize2,
  Sliders,
  ChevronRight,
  UploadCloud,
} from "lucide-react"

interface AgentBuilderViewProps {
  agentId?: string
  onBackToDirectory: () => void
  onTestAgent: () => void
}

export const AgentBuilderView: React.FC<AgentBuilderViewProps> = ({
  onBackToDirectory,
  onTestAgent,
}) => {
  const [activeSubTab, setActiveSubTab] = useState("prompt")
  const [activeMainTab, setActiveMainTab] =
    useState<"build" | "run" | "evaluate">("build")
  const [agentName, setAgentName] = useState("Untitled agent")
  const [agentDescription, setAgentDescription] = useState(
    "Give this agent a short description...",
  )
  const [selectedModel, setSelectedModel] = useState(
    "Performance-optimized Model",
  )

  // Right Drawer Mode: 'parameters' (Screenshot 3) or 'ai-copilot' (Screenshot 2) or 'closed'
  const [rightDrawer, setRightDrawer] =
    useState<"parameters" | "copilot" | "closed">("parameters")

  const [chatInput, setChatInput] = useState("")

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased select-none animate-fadeIn">
      {/* 1. TOP GLOBAL HEADER BAR matching Screenshots */}
      <header className="bg-white border-b border-slate-200/80 px-4 py-2 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        {/* Left: Home Icon, Agent Title, Status Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDirectory}
            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Pixel Character Avatar */}
          <div className="w-6 h-6 rounded-md bg-[#00E5BF] flex items-center justify-center text-xs overflow-hidden">
            🧙‍♀️
          </div>

          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="font-bold text-slate-900 text-sm bg-transparent border border-transparent hover:border-slate-200 focus:border-brand-500 focus:bg-white rounded px-1.5 py-0.5 focus:outline-none transition-all"
          />

          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Published
          </span>
        </div>

        {/* Center: Build / Run / Evaluate Tabs Pill Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
          <button
            onClick={() => setActiveMainTab("build")}
            className={`flex items-center gap-1.5 px-4 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeMainTab === "build"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-slate-700" />
            <span>Build</span>
          </button>

          <button
            onClick={() => {
              setActiveMainTab("run")
              onTestAgent()
            }}
            className={`flex items-center gap-1.5 px-4 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeMainTab === "run"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-slate-700" />
            <span>Run</span>
          </button>

          <button
            onClick={() => setActiveMainTab("evaluate")}
            className={`flex items-center gap-1.5 px-4 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeMainTab === "evaluate"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-slate-700" />
            <span>Evaluate</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 text-xs font-medium hover:bg-slate-100 transition-colors">
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>

          <span className="text-xs text-slate-600 font-semibold px-1">
            Saved
          </span>

          <div className="flex items-center">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-l-xl bg-[#090A0F] hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all">
              <span>Published</span>
            </button>
            <button className="px-2 py-1.5 rounded-r-xl bg-[#090A0F] hover:bg-slate-800 text-white text-xs font-semibold border-l border-slate-800 transition-all">
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN THREE-PANEL LAYOUT */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT INVENT SIDEBAR */}
        <aside className="w-56 bg-[#FBFBFE] border-r border-slate-200/80 p-3 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-3">
            {/* Top Invent Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center">
                <Bot className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-xs">Invent</span>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1">
              {/* Prompt Section */}
              <button
                onClick={() => setActiveSubTab("prompt")}
                className={`w-full text-left p-3 rounded-2xl transition-all ${
                  activeSubTab === "prompt"
                    ? "bg-slate-900 text-white font-semibold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText
                    className={`w-4 h-4 ${
                      activeSubTab === "prompt"
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  />
                  <div>
                    <div className="text-xs font-bold">Prompt</div>
                    <div
                      className={`text-[10px] ${
                        activeSubTab === "prompt"
                          ? "text-slate-300"
                          : "text-slate-600"
                      } font-medium`}
                    >
                      Create guidelines for your agent
                    </div>
                  </div>
                </div>
              </button>

              {/* Tools Section */}
              <button
                onClick={() => setActiveSubTab("tools")}
                className={`w-full text-left p-3 rounded-2xl transition-all ${
                  activeSubTab === "tools"
                    ? "bg-slate-900 text-white font-semibold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench
                    className={`w-4 h-4 ${
                      activeSubTab === "tools" ? "text-white" : "text-slate-500"
                    }`}
                  />
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        activeSubTab === "tools"
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      Tools
                    </div>
                    <div
                      className={`text-[10px] ${
                        activeSubTab === "tools"
                          ? "text-slate-300"
                          : "text-slate-500"
                      } font-medium`}
                    >
                      Used by agents to complete tasks
                    </div>
                  </div>
                </div>
              </button>

              {/* Knowledge Section */}
              <button
                onClick={() => setActiveSubTab("knowledge")}
                className={`w-full text-left p-3 rounded-2xl transition-all ${
                  activeSubTab === "knowledge"
                    ? "bg-slate-900 text-white font-semibold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database
                    className={`w-4 h-4 ${
                      activeSubTab === "knowledge"
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  />
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        activeSubTab === "knowledge"
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      Knowledge
                    </div>
                    <div
                      className={`text-[10px] ${
                        activeSubTab === "knowledge"
                          ? "text-slate-300"
                          : "text-slate-500"
                      } font-medium`}
                    >
                      Add your documents and data
                    </div>
                  </div>
                </div>
              </button>

              {/* Triggers Section */}
              <button
                onClick={() => setActiveSubTab("triggers")}
                className={`w-full text-left p-3 rounded-2xl transition-all ${
                  activeSubTab === "triggers"
                    ? "bg-slate-900 text-white font-semibold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Zap
                    className={`w-4 h-4 ${
                      activeSubTab === "triggers"
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  />
                  <div>
                    <div
                      className={`text-xs font-bold ${
                        activeSubTab === "triggers"
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      Triggers
                    </div>
                    <div
                      className={`text-[10px] ${
                        activeSubTab === "triggers"
                          ? "text-slate-300"
                          : "text-slate-500"
                      } font-medium`}
                    >
                      Run tasks on auto-pilot
                    </div>
                  </div>
                </div>
              </button>

              <div className="my-2 border-t border-slate-200/70" />

              {/* Alarms */}
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-all font-medium">
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Alarms</span>
              </button>

              {/* Memory */}
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-all font-medium">
                <Brain className="w-4 h-4 text-slate-500" />
                <span>Memory</span>
              </button>

              {/* Variables */}
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-all font-medium">
                <span className="font-mono text-xs text-slate-500 font-bold">
                  {"{}"}
                </span>
                <span>Variables</span>
              </button>
            </nav>
          </div>

          {/* Bottom Sidebar Links */}
          <div className="space-y-1 pt-3 border-t border-slate-200/70">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-all font-medium">
              <Sliders className="w-4 h-4 text-slate-500" />
              <span>Advanced</span>
            </button>

            <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-700 hover:bg-slate-100 transition-all font-medium">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>Need help?</span>
              </div>
              <div className="w-4 h-4 rounded border border-slate-300 flex items-center justify-center text-[10px]">
                ↗
              </div>
            </button>
          </div>
        </aside>

        {/* CENTER MAIN CANVAS AREA - Full Width responsive container */}
        <main className="flex-1 p-6 overflow-y-auto space-y-5 w-full">
          {/* Top Agent Profile Card */}
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#00E5BF] flex items-center justify-center text-xl overflow-hidden shadow-2xs">
                🧙‍♀️
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">
                  Untitled agent
                </h2>
                <input
                  type="text"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  className="text-xs text-slate-600 font-medium bg-transparent border-b border-transparent hover:border-slate-200 focus:outline-none w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <button className="p-1.5 rounded-lg border border-slate-200/80 hover:bg-slate-100 text-slate-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setRightDrawer(
                    rightDrawer === "closed" ? "parameters" : "closed",
                  )
                }
                className="p-1.5 rounded-lg border border-slate-200/80 hover:bg-slate-100 text-slate-600 transition-colors"
                title="Toggle Right Drawer"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model Selector & Action Toolbar */}
          <div className="flex items-center gap-2.5 pt-1 w-full">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 shadow-2xs"
            >
              <option value="Performance-optimized Model">
                Performance-optimized Model ↕
              </option>
              <option value="OpenAI / GPT-5.4-mini">
                OpenAI / GPT-5.4-mini
              </option>
              <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
            </select>

            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold shadow-2xs transition-colors">
              <Wand2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Create with AI</span>
            </button>

            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold shadow-2xs transition-colors">
              <Plus className="w-3.5 h-3.5 text-slate-600" />
              <span>Prompt template</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            Write instructions or '/' for tools and more...
          </p>

          {/* START FROM A TEMPLATE CONTAINER CARD matching latest screenshot */}
          <div className="space-y-4 w-full">
            <h3 className="font-bold text-slate-900 text-base tracking-tight font-sans">
              Start from a template
            </h3>

            {/* Grid of 6 Cards matching Screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              {/* Card 1: Web Researcher */}
              <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group w-full">
                <div className="bg-[#EBF7FC] p-4 flex items-center justify-center h-36 w-full">
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl shadow-2xs w-full max-w-[220px]">
                    <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-sm shadow-2xs">
                      🌐
                    </div>
                    <span className="text-slate-400 text-xs font-bold">→</span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-sm shadow-2xs">
                      ⚙️
                    </div>
                    <span className="text-slate-400 text-xs font-bold">→</span>
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm shadow-2xs">
                      📊
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Web Researcher
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Search the web and summarize findings
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-slate-700 group-hover:text-black text-left transition-colors">
                    Use template
                  </button>
                </div>
              </div>

              {/* Card 2: Meeting Prepper */}
              <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group w-full">
                <div className="bg-[#FCF5EB] p-4 flex items-center justify-center h-36 w-full">
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl shadow-2xs w-full max-w-[220px]">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm shadow-2xs">
                      📅
                    </div>
                    <span className="text-slate-400 text-xs font-bold">→</span>
                    <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center text-sm shadow-2xs">
                      💼
                    </div>
                    <span className="text-slate-400 text-xs font-bold">→</span>
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-sm shadow-2xs">
                      📄
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Meeting Prepper
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Prepare for meetings and send follow-ups
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-slate-700 group-hover:text-black text-left transition-colors">
                    Use template
                  </button>
                </div>
              </div>

              {/* Card 3: Email Assistant (NO STAR, NO PURPLE) */}
              <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group w-full">
                <div className="bg-[#EEF2F6] p-4 flex items-center justify-center h-36 w-full">
                  <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl shadow-2xs w-full max-w-[220px]">
                    <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-sm shadow-2xs">
                      ✉️
                    </div>
                    <span className="text-slate-400 text-xs font-bold">→</span>
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shadow-2xs font-bold">
                      AI
                    </div>
                    <span className="text-slate-400 text-xs font-bold">→</span>
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm shadow-2xs">
                      ✈️
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Email Assistant
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Draft and respond to emails professionally
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-slate-700 group-hover:text-black text-left transition-colors">
                    Use template
                  </button>
                </div>
              </div>

              {/* Card 4: Type "/" to add tools */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group w-full">
                <div className="bg-[#EBF3FF] flex items-center justify-center h-36 relative w-full overflow-hidden select-none">
                  {/* Decorative background cards */}
                  <div className="absolute w-20 h-24 bg-[#D5F5DE] border border-[#BCECCB] rounded-2xl rotate-[-14deg] translate-x-[-38px] shadow-xs" />
                  <div className="absolute w-20 h-24 bg-[#FEF6E6] border border-[#FDEAC4] rounded-2xl rotate-[16deg] translate-x-[42px] shadow-xs" />

                  {/* Floating Tool Cards */}
                  <div className="relative flex items-center justify-center gap-2.5 z-10">
                    <div className="w-13 h-15 bg-white rounded-xl shadow-sm border border-slate-200/90 flex flex-col items-center justify-center p-2 rotate-[-5deg] group-hover:rotate-[-2deg] transition-transform">
                      <SlackIcon className="w-7 h-7 shrink-0" />
                    </div>
                    <div className="w-13 h-15 bg-white rounded-xl shadow-md border border-slate-200/90 flex flex-col items-center justify-center p-2 rotate-[6deg] group-hover:rotate-[3deg] transition-transform">
                      <SheetsIcon className="w-7 h-7 shrink-0" />
                    </div>
                    <div className="w-10 h-11 bg-white rounded-lg shadow-xs border border-slate-200/80 flex items-center justify-center p-1.5 rotate-[16deg] translate-x-[-2px] translate-y-[-4px]">
                      <GmailIcon className="w-4 h-4 shrink-0" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Type "/" to add tools
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Connect services your agent can act on (e.g., Slack,
                      Google Sheets)
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-slate-700 group-hover:text-black text-left transition-colors">
                    Add tools
                  </button>
                </div>
              </div>

              {/* Card 5: Add knowledge (Zero Purple) */}
              <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group w-full">
                <div className="bg-[#F1F5F9] p-4 flex items-center justify-center h-36 relative w-full">
                  <div className="relative">
                    <div className="w-16 h-14 rounded-xl bg-slate-900 shadow-md flex items-center justify-center">
                      <div className="w-10 h-8 rounded-t-md bg-white opacity-90 border border-slate-700 transform -translate-y-2" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Add knowledge
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Upload documents or FAQs your agent can reference
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-slate-700 group-hover:text-black text-left transition-colors">
                    Add knowledge
                  </button>
                </div>
              </div>

              {/* Card 6: Set trigger */}
              <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group w-full">
                <div className="bg-[#D3EBD7] p-4 flex items-center justify-center h-36 w-full">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-xs">
                      ✉️
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-xs">
                      📄
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-xs">
                      📅
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-xs">
                      📊
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-xs">
                      ▲
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white shadow-2xs flex items-center justify-center text-xs">
                      📋
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-sm">
                      Set trigger
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Set when your agent runs (schedule, event, keyword)
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-slate-700 group-hover:text-black text-left transition-colors">
                    Set trigger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* RIGHT PARAMETERS / COPILOT DRAWER */}
        {rightDrawer === "parameters" && (
          <aside className="w-80 bg-white border-l border-slate-200/80 p-5 space-y-6 overflow-y-auto flex-shrink-0 animate-fadeIn">
            <div className="flex items-center justify-between text-slate-500">
              <button
                onClick={() => setRightDrawer("closed")}
                className="hover:text-slate-800"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRightDrawer("copilot")}
                className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
              >
                Switch to AI Copilot →
              </button>
            </div>

            {/* Triggers Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  Triggers{" "}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </h4>
                <button className="text-slate-500 hover:text-slate-800 text-sm font-bold">
                  +
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-center space-y-2">
                <div className="flex justify-center gap-1.5 text-xs">
                  <span>✉️</span> <span>💬</span> <span>⚡</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-snug">
                  Add triggers to automatically start your agent based on events
                  like emails, schedules, or webhooks.
                </p>
              </div>
            </div>

            {/* Tools Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  Tools <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </h4>
                <button className="text-slate-500 hover:text-slate-800 text-sm font-bold">
                  +
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-center space-y-2">
                <div className="flex justify-center gap-1.5 text-xs">
                  <span>🌐</span> <span>📁</span> <span>⚙️</span>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-snug">
                  Add tools to give your agents the ability to perform actions
                  or connect with integrations.
                </p>
              </div>
            </div>

            {/* Knowledge Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  Knowledge{" "}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </h4>
                <button className="text-slate-500 hover:text-slate-800 text-sm font-bold">
                  +
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-1 cursor-pointer hover:bg-slate-100/50 transition-colors">
                <UploadCloud className="w-5 h-5 text-slate-500 mx-auto" />
                <p className="text-xs font-semibold text-slate-800">
                  Drag & drop files
                </p>
                <p className="text-[10px] text-slate-600 font-medium">
                  Import data to teach your agents about new topics.
                </p>
              </div>
            </div>

            {/* Variables Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  Variables{" "}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </h4>
                <button className="text-slate-500 hover:text-slate-800 text-sm font-bold">
                  ⚙️
                </button>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 font-medium leading-relaxed">
                Want to reuse values throughout your agent? Turn them into a
                variable with{" "}
                <kbd className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono text-[10px] text-slate-700">
                  Ctrl + \
                </kbd>{" "}
                that you can access with{" "}
                <code className="font-mono text-slate-900 font-bold">
                  {"{{"}
                </code>
                .
              </div>
            </div>
          </aside>
        )}

        {/* AI COPILOT CHAT DRAWER */}
        {rightDrawer === "copilot" && (
          <aside className="w-80 bg-white border-l border-slate-200/80 p-5 flex flex-col justify-between flex-shrink-0 animate-fadeIn">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <button
                  onClick={() => setRightDrawer("parameters")}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900"
                >
                  ← History <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-2 text-slate-500">
                  <Maximize2 className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                  <X
                    className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800"
                    onClick={() => setRightDrawer("closed")}
                  />
                </div>
              </div>

              {/* Greeting graphic */}
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-sm">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="inline-block bg-slate-100 rounded-full px-4 py-2 text-xs font-semibold text-slate-800">
                  How can I help?
                </div>
              </div>

              {/* Quick Action Options */}
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 text-xs font-semibold text-slate-700 flex items-center justify-between group transition-all">
                  <span>Add test coverage</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 text-xs font-semibold text-slate-700 flex items-center justify-between group transition-all">
                  <span>Add production monitoring</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button className="w-full text-left p-3 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50 text-xs font-semibold text-slate-700 flex items-center justify-between group transition-all">
                  <span>Get detailed recommendations</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="space-y-2 pt-4 border-t border-slate-100">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Create with Invent..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-3 pr-10 py-2.5 text-xs text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-slate-900"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white transition-colors">
                  <Send className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-600 px-1 font-mono font-medium">
                <span>+ Allow GPT-5.4 Luna</span>
                <span>⚡ Connect</span>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
