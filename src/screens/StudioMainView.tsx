import React, { useState } from "react"
import ModelSelectionModal from "../components/ModelSelectionModal"
import ShareModal from "../components/ShareModal"
import DeployModal from "../components/DeployModal"
import AgentAvatarIcon from "../components/AgentAvatarIcon"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Share2,
  Send,
  MoreHorizontal,
  Pencil,
  Box,
  Wand2,
  GraduationCap,
  Layers,
  Play,
  HelpCircle,
  Wrench,
  FileText,
  FileSpreadsheet,
  Settings,
  BookOpen,
  PieChart,
  Monitor,
  Paperclip,
  Clock,
  AlertCircle,
  Lightbulb,
  X,
  Check,
  Plus,
  SlidersHorizontal,
  FileCode,
  Database,
  Brain,
  ShieldCheck,
  Zap,
  Calendar,
} from "lucide-react"

interface StudioMainViewProps {
  onNavigateTab?: (tab: "build" | "run" | "evaluate") => void
  onHomeClick?: () => void
  onOpenFolders?: () => void
  onOpenCopilot?: () => void
}

export default function StudioMainView({
  onNavigateTab,
  onHomeClick,
  onOpenFolders,
  onOpenCopilot,
}: StudioMainViewProps) {
  // Agent Info
  const [agentTitle, setAgentTitle] = useState("Untitled agent")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [agentPurpose, setAgentPurpose] = useState(
    "Give this agent a clear and specific purpose.",
  )

  // Model State
  const [selectedModel, setSelectedModel] = useState(
    "Performance-optimized Model",
  )
  const [isModelModalOpen, setIsModelModalOpen] = useState(false)

  // Inspector Fields
  const [goal, setGoal] = useState("")
  const [toolsNote, setToolsNote] = useState("")
  const [rules, setRules] = useState<string[]>([
    "Be clear and specific",
    "Use markdown for better formatting",
    "Include examples if helpful",
  ])
  const [newRule, setNewRule] = useState("")
  const [isAddingRule, setIsAddingRule] = useState(false)

  // Center Canvas State
  const [testTaskInput, setTestTaskInput] = useState("")
  const [creditsRemaining, setCreditsRemaining] = useState(0)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [isTaskRunning, setIsTaskRunning] = useState(false)

  // Modals & Banners
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isDeployOpen, setIsDeployOpen] = useState(false)
  const [isProTipVisible, setIsProTipVisible] = useState(true)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Right Configuration Panel States
  const [isModelSettingsOpen, setIsModelSettingsOpen] = useState(false)
  const [modelTemperature, setModelTemperature] = useState(0.7)
  const [modelMaxTokens, setModelMaxTokens] = useState(4096)
  const [modelThinking, setModelThinking] = useState(true)

  const [isOutputFormatOpen, setIsOutputFormatOpen] = useState(false)
  const [outputFormat, setOutputFormat] = useState("Markdown")

  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false)
  const [knowledgeSources, setKnowledgeSources] = useState([
    { id: "k1", name: "Product_Specs_v2.pdf", size: "2.4 MB" },
    { id: "k2", name: "Support_FAQ_Index.md", size: "480 KB" },
    { id: "k3", name: "Company_Notion_Sync", size: "Live Sync" },
  ])

  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [connectedTools, setConnectedTools] = useState([
    {
      id: "t1",
      name: "Web Search",
      desc: "Tavily real-time web index",
      enabled: true,
    },
    {
      id: "t2",
      name: "Gmail",
      desc: "Draft and inspect messages",
      enabled: true,
    },
    { id: "t3", name: "Slack", desc: "Channel alerts & DMs", enabled: true },
    {
      id: "t4",
      name: "Google Sheets",
      desc: "Read and append records",
      enabled: true,
    },
  ])

  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const [skills, setSkills] = useState([
    { id: "s1", name: "Deterministic Summarization", enabled: true },
    { id: "s2", name: "Ticket Classification & Triage", enabled: true },
  ])

  const [schedules, setSchedules] = useState([
    {
      id: "sch1",
      label: "Hourly Health Check",
      cron: "0 * * * *",
      active: true,
    },
  ])
  const [triggers, setTriggers] = useState([
    {
      id: "trig1",
      label: "Email Webhook",
      endpoint: "POST /webhook/email",
      active: true,
    },
  ])

  const [isMemoryEnabled, setIsMemoryEnabled] = useState(true)
  const [isDataQueryEnabled, setIsDataQueryEnabled] = useState(true)
  const [isResponsibleAIEnabled, setIsResponsibleAIEnabled] = useState(true)

  const getModelProvider = (name: string) => {
    if (name.includes("Claude")) return "Anthropic"
    if (name.includes("GPT")) return "OpenAI"
    if (name.includes("Gemini")) return "Google"
    return "Pick for me"
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRule.trim()) return
    setRules((prev) => [...prev, newRule.trim()])
    setNewRule("")
    setIsAddingRule(false)
    showToast("Added new guideline rule")
  }

  const handleExecuteTask = () => {
    if (!testTaskInput.trim() && creditsRemaining === 0) {
      showToast("Refilling test credits to start run...")
      setCreditsRemaining(2500)
      return
    }
    setIsTaskRunning(true)
    setTestResult(null)

    setTimeout(() => {
      setIsTaskRunning(false)
      setTestResult(
        `Agent execution finished successfully.\n• Model: ${selectedModel}\n• Status: 200 OK\n• Output: Generated verified plan matching operational constraints.`,
      )
      showToast("Task completed successfully!")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-sans antialiased text-slate-800 select-none">
      {/* ================= ROW 2 SUBHEADER MATCHING SCREENSHOT ================= */}
      <header className="bg-white border-b border-slate-200 px-5 py-2.5 flex items-center justify-between shrink-0 sticky top-0 z-30">
        {/* Left: Back button, Avatar, Title Dropdown, Unpublished Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={onHomeClick}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            title="Back to agents"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Agent Avatar in rounded square */}
          <div className="w-7 h-7 rounded-lg bg-[#be4c3f] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <AgentAvatarIcon className="w-4 h-4 text-white" />
          </div>

          {/* Title Dropdown */}
          <div className="flex items-center gap-1">
            {isEditingTitle ? (
              <input
                type="text"
                value={agentTitle}
                onChange={(e) => setAgentTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                autoFocus
                className="font-bold text-slate-900 text-base px-1 py-0.5 border border-[#be4c3f] rounded outline-none"
              />
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="flex items-center gap-1.5 font-bold text-slate-900 text-base hover:text-black py-0.5 px-1 rounded hover:bg-slate-100 transition-colors group"
              >
                <span>{agentTitle}</span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-800" />
              </button>
            )}
          </div>

          {/* Unpublished Pill - Solid filled */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Unpublished</span>
          </div>
        </div>

        {/* Center: Build, Run, Evaluate tabs */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => onNavigateTab && onNavigateTab("build")}
            className="px-4 py-1 rounded-md text-xs font-semibold bg-white text-[#be4c3f] shadow-xs border border-slate-200/80"
          >
            Build
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab("run")}
            className="px-4 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Run
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab("evaluate")}
            className="px-4 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Evaluate
          </button>
        </div>

        {/* Right Actions: Share, Save, Deploy split button, More */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share</span>
          </button>

          <button
            onClick={() => showToast("Changes saved successfully!")}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors shadow-2xs"
          >
            Save
          </button>

          <div className="flex items-center bg-[#be4c3f] hover:bg-[#a83e32] text-white rounded-lg overflow-hidden transition-colors shadow-2xs">
            <button
              onClick={() => setIsDeployOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold"
            >
              Deploy
            </button>
            <button
              onClick={() => setIsDeployOpen(true)}
              className="px-2 py-1.5 border-l border-white/20 hover:bg-white/10 transition-colors"
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

      {/* ================= 3-COLUMN MAIN CONTENT AREA MATCHING SCREENSHOT ================= */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden bg-white">
        {/* ================= COLUMN 1: LEFT INSPECTOR / DEFINITION PANEL (~270px) ================= */}
        <div className="w-[270px] shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-y-auto p-4 space-y-4">
          {/* Agent Title Card */}
          <div className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 bg-white shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-[#be4c3f] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <AgentAvatarIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm truncate">
                  {agentTitle}
                </span>
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="p-1 text-slate-500 hover:text-slate-800 rounded transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 leading-snug mt-0.5">
                {agentPurpose}
              </p>
            </div>
          </div>

          {/* Model Selector Button */}
          <button
            onClick={() => setIsModelModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-2 truncate">
              <Box className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#be4c3f] transition-colors" />
              <span className="font-semibold text-slate-800 truncate">
                {selectedModel}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800" />
          </button>

          {/* Refine with AI Button */}
          <button
            onClick={() => {
              if (onOpenCopilot) onOpenCopilot()
              else showToast("Refining instructions with Invent Copilot...")
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200 hover:border-[#f5d0cb] bg-white hover:bg-[#fdf2f0]/40 text-xs transition-all shadow-2xs group"
          >
            <div className="flex items-center gap-2">
              <Wand2 className="w-3.5 h-3.5 text-[#be4c3f]" />
              <span className="font-semibold text-slate-800 group-hover:text-[#be4c3f]">
                Refine with AI
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#be4c3f]" />
          </button>

          {/* Setup Cards & Run Evals Dual Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenFolders && onOpenFolders()}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>Workspace</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab("evaluate")}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 text-slate-500" />
              <span>Run Evals</span>
            </button>
          </div>

          {/* GOAL Section */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <span>Goal</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-white focus-within:border-[#be4c3f] transition-all">
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value.slice(0, 500))}
                placeholder="Describe what you want your agent to achieve..."
                rows={3}
                className="w-full p-2.5 text-xs text-slate-800 placeholder:text-slate-500 outline-none resize-none leading-relaxed"
              />
              <div className="px-2.5 py-1 text-right text-[10px] text-slate-500 font-medium bg-slate-50 border-t border-slate-200">
                {goal.length}/500
              </div>
            </div>
          </div>

          {/* TOOLS Section */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <span>Tools</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 leading-tight">
              Type '/' to mention tools in your instructions.
            </p>
            <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 flex items-start gap-2">
              <Wrench className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
              <input
                type="text"
                value={toolsNote}
                onChange={(e) => setToolsNote(e.target.value)}
                placeholder="Add any additional context, tools, or notes... (optional)"
                className="w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-500 outline-none"
              />
            </div>
          </div>

          {/* RULES Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
              <span>Rules</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="border border-slate-200 rounded-xl p-2.5 bg-white">
              <input
                type="text"
                placeholder="Set guidelines for how your agent should behave..."
                className="w-full text-xs text-slate-700 placeholder:text-slate-500 outline-none mb-2"
                onFocus={() => setIsAddingRule(true)}
              />

              <ul className="space-y-1 text-xs text-slate-700 pl-1">
                {rules.map((rule, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-slate-500 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>

              {isAddingRule ? (
                <form
                  onSubmit={handleAddRule}
                  className="mt-2 pt-2 border-t border-slate-100 flex gap-1.5"
                >
                  <input
                    type="text"
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    placeholder="Type new guideline..."
                    className="flex-1 text-xs text-slate-800 bg-slate-50 px-2 py-1 rounded border border-slate-200 outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-2 py-1 bg-[#be4c3f] text-white text-xs font-bold rounded shadow-2xs"
                  >
                    Add
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsAddingRule(true)}
                  className="mt-2 pt-1 text-[11px] font-semibold text-slate-500 hover:text-[#be4c3f] flex items-center gap-1 transition-colors"
                >
                  <span>+ Add another rule...</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ================= COLUMN 2: CENTER MAIN CANVAS ================= */}
        <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
          <div className="w-full max-w-[620px] mx-auto space-y-5">
            {/* Hero Section with Illustration & Title matching user screenshot */}
            <div className="flex flex-col items-center text-center pt-2">
              <img
                src="/studio-hero-robot.png"
                alt="Create your agent"
                className="h-28 w-auto object-contain mb-2 select-none pointer-events-none"
              />

              {/* Main Heading & Subheading */}
              <h1 className="text-[22px] font-bold text-slate-900 tracking-tight">
                Create your agent
              </h1>
              <p className="text-sm text-slate-600 max-w-[480px] leading-relaxed mt-1.5">
                Define what your agent should do, connect the right tools, and
                test it — all in one place.
              </p>
            </div>

            {/* 3 Stepper Feature Cards */}
            <div className="grid grid-cols-3 gap-3">
              {/* Card 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                <div className="w-6 h-6 rounded-lg bg-[#fdf2f0] flex items-center justify-center text-[#be4c3f]">
                  <FileText className="w-3.5 h-3.5 text-[#be4c3f]" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  1. Describe your agent
                </h3>
                <p className="text-xs text-slate-600 leading-snug">
                  Tell us the goal, instructions, and rules for your agent.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <Settings className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  2. Add tools & knowledge
                </h3>
                <p className="text-xs text-slate-600 leading-snug">
                  Connect the tools, data sources, and integrations your agent
                  can use.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  3. Test and iterate
                </h3>
                <p className="text-xs text-slate-600 leading-snug">
                  Run test tasks, refine the behavior, and publish when ready.
                </p>
              </div>
            </div>

            {/* Interactive Test Task Execution Box */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs focus-within:border-[#be4c3f] transition-all">
              <textarea
                value={testTaskInput}
                onChange={(e) => setTestTaskInput(e.target.value)}
                placeholder="Describe a task for your agent to work on..."
                rows={3}
                className="w-full p-3.5 text-xs text-slate-800 placeholder:text-slate-500 outline-none resize-none leading-relaxed"
              />

              <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                  <button
                    onClick={() => showToast("Attachment dialog ready")}
                    className="p-1 hover:text-slate-900 rounded transition-colors"
                    title="Attach document or dataset"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenCopilot && onOpenCopilot()}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Help</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setTestTaskInput(
                        "Triage support inquiries and generate executive status report",
                      )
                      showToast("Loaded sample task prompt")
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                  >
                    <Play className="w-3 h-3 text-[#be4c3f]" />
                    <span>Start a new task</span>
                  </button>

                  <button
                    onClick={handleExecuteTask}
                    disabled={isTaskRunning}
                    className="w-7 h-7 rounded-lg bg-[#be4c3f] hover:bg-[#a83e32] text-white flex items-center justify-center transition-colors shadow-2xs disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Test Execution Result */}
            {testResult && (
              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono leading-relaxed shadow-lg">
                <p className="whitespace-pre-wrap">{testResult}</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 3: RIGHT PANEL (CONFIGURATION & SECONDARY CARDS) (~320px) ================= */}
        <div className="w-[320px] shrink-0 border-l border-slate-200 bg-white flex flex-col overflow-y-auto p-4 space-y-3.5">
          {/* Top Row: Configuration Header & History Action */}
          <div className="flex items-center justify-between pb-0.5">
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              Configuration
            </span>
            <button
              onClick={() => showToast("Viewing previous runs history")}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#be4c3f] transition-colors py-0.5 group"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#be4c3f]" />
              <span>History</span>
              <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-[#be4c3f]" />
            </button>
          </div>

          {/* 1. MODEL — at the top, with current model name, provider, dropdown and model settings controls */}
          <div className="border border-slate-200 rounded-xl bg-white p-3 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Model
              </span>
              <button
                onClick={() => setIsModelSettingsOpen(!isModelSettingsOpen)}
                className={`p-1 rounded-md transition-colors ${
                  isModelSettingsOpen
                    ? "text-[#be4c3f] bg-[#fdf2f0]"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}
                title="Model Settings Controls"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Model Name, Provider & Dropdown Trigger */}
            <div
              onClick={() => setIsModelModalOpen(true)}
              className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-md bg-[#be4c3f] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Box className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate group-hover:text-[#be4c3f] transition-colors">
                    {selectedModel}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Provider:{" "}
                    <span className="text-slate-700 font-semibold">
                      {getModelProvider(selectedModel)}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700 shrink-0 ml-1" />
            </div>

            {/* Model Settings Controls Drawer */}
            {isModelSettingsOpen && (
              <div className="pt-2.5 border-t border-slate-100 space-y-2.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">
                      Temperature
                    </span>
                    <span className="text-slate-900 font-mono font-semibold">
                      {modelTemperature}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={modelTemperature}
                    onChange={(e) =>
                      setModelTemperature(parseFloat(e.target.value))
                    }
                    className="w-full accent-[#be4c3f] h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500 font-medium">
                    <span>Precise (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                  <span className="text-slate-600 font-medium">
                    Max Output Tokens
                  </span>
                  <select
                    value={modelMaxTokens}
                    onChange={(e) =>
                      setModelMaxTokens(parseInt(e.target.value))
                    }
                    className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-800 font-mono outline-none"
                  >
                    <option value={2048}>2,048</option>
                    <option value={4096}>4,096</option>
                    <option value={8192}>8,192</option>
                    <option value={16384}>16,384</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-600 font-medium">
                    Reasoning / Thinking
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={modelThinking}
                    onClick={() => setModelThinking(!modelThinking)}
                    className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      modelThinking ? "bg-[#be4c3f]" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        modelThinking ? "translate-x-3" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. OUTPUT FORMAT — collapsed row below Model */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => setIsOutputFormatOpen(!isOutputFormatOpen)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-50/60 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#be4c3f] transition-colors" />
                <span className="text-xs font-semibold text-slate-800">
                  Output Format
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 font-medium">
                  {outputFormat}
                </span>
              </div>
              {isOutputFormatOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700" />
              )}
            </button>

            {isOutputFormatOpen && (
              <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50 space-y-2">
                <div className="text-[11px] text-slate-500 pt-2">
                  Structured output specification:
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    "Markdown",
                    "JSON Schema",
                    "Plain Text",
                    "Structured XML",
                  ].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => {
                        setOutputFormat(fmt)
                        showToast(`Output format set to ${fmt}`)
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left transition-all ${
                        outputFormat === fmt
                          ? "bg-white border-[#be4c3f] text-[#be4c3f] shadow-2xs font-semibold"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. KNOWLEDGE — collapsed row with + to add sources */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between p-3 hover:bg-slate-50/60 transition-colors">
              <button
                onClick={() => setIsKnowledgeOpen(!isKnowledgeOpen)}
                className="flex-1 flex items-center gap-2 text-left group"
              >
                <Database className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#be4c3f] transition-colors" />
                <span className="text-xs font-semibold text-slate-800">
                  Knowledge
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 font-medium">
                  {knowledgeSources.length} Sources
                </span>
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsKnowledgeOpen(true)
                    const newDoc = {
                      id: `k${Date.now()}`,
                      name: `New_Knowledge_Doc_${knowledgeSources.length + 1}.pdf`,
                      size: "1.2 MB",
                    }
                    setKnowledgeSources((prev) => [...prev, newDoc])
                    showToast(`Added source: ${newDoc.name}`)
                  }}
                  className="p-1 rounded-md text-slate-500 hover:text-[#be4c3f] hover:bg-slate-100 transition-colors"
                  title="Add Knowledge Source"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsKnowledgeOpen(!isKnowledgeOpen)}
                  className="p-1 text-slate-500 hover:text-slate-700"
                >
                  {isKnowledgeOpen ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {isKnowledgeOpen && (
              <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50 space-y-2">
                <div className="space-y-1.5 pt-2">
                  {knowledgeSources.map((src) => (
                    <div
                      key={src.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-slate-800 font-medium truncate">
                          {src.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] text-slate-500 font-medium">
                          {src.size}
                        </span>
                        <button
                          onClick={() => {
                            setKnowledgeSources((prev) =>
                              prev.filter((k) => k.id !== src.id),
                            )
                            showToast(`Removed ${src.name}`)
                          }}
                          className="text-slate-500 hover:text-red-500 p-0.5 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const newDoc = {
                      id: `k${Date.now()}`,
                      name: `Document_${knowledgeSources.length + 1}.pdf`,
                      size: "850 KB",
                    }
                    setKnowledgeSources((prev) => [...prev, newDoc])
                    showToast("Uploaded new document to knowledge store")
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-[#be4c3f] bg-white hover:bg-[#fdf2f0] border border-dashed border-[#f5d0cb] rounded-lg transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Source (PDF, Doc, URL)</span>
                </button>
              </div>
            )}
          </div>

          {/* 4. TOOLS — collapsed row with + to connect tools */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between p-3 hover:bg-slate-50/60 transition-colors">
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="flex-1 flex items-center gap-2 text-left group"
              >
                <Wrench className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#be4c3f] transition-colors" />
                <span className="text-xs font-semibold text-slate-800">
                  Tools
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 font-medium">
                  {connectedTools.filter((t) => t.enabled).length} Connected
                </span>
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsToolsOpen(true)
                    showToast(
                      "Tool catalog opened: Select integrations to connect",
                    )
                  }}
                  className="p-1 rounded-md text-slate-500 hover:text-[#be4c3f] hover:bg-slate-100 transition-colors"
                  title="Connect Tool"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="p-1 text-slate-500 hover:text-slate-700"
                >
                  {isToolsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {isToolsOpen && (
              <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50 space-y-2">
                <div className="space-y-1.5 pt-2">
                  {connectedTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-slate-800 font-medium truncate">
                          {tool.name}
                        </div>
                        <div className="text-[10px] text-slate-600 truncate">
                          {tool.desc}
                        </div>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={tool.enabled}
                        onClick={() => {
                          setConnectedTools((prev) =>
                            prev.map((t) =>
                              t.id === tool.id
                                ? { ...t, enabled: !t.enabled }
                                : t,
                            ),
                          )
                          showToast(
                            `${tool.name} ${
                              tool.enabled ? "disconnected" : "connected"
                            }`,
                          )
                        }}
                        className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          tool.enabled ? "bg-[#be4c3f]" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            tool.enabled ? "translate-x-3" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => showToast("Opening tool catalog...")}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-[#be4c3f] bg-white hover:bg-[#fdf2f0] border border-dashed border-[#f5d0cb] rounded-lg transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Connect New Tool</span>
                </button>
              </div>
            )}
          </div>

          {/* 5. SKILLS — collapsed row with + */}
          <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between p-3 hover:bg-slate-50/60 transition-colors">
              <button
                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                className="flex-1 flex items-center gap-2 text-left group"
              >
                <GraduationCap className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#be4c3f] transition-colors" />
                <span className="text-xs font-semibold text-slate-800">
                  Skills
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-600 font-medium">
                  {skills.length} Added
                </span>
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSkillsOpen(true)
                    const newSkill = {
                      id: `s${Date.now()}`,
                      name: `Custom Workflow Skill ${skills.length + 1}`,
                      enabled: true,
                    }
                    setSkills((prev) => [...prev, newSkill])
                    showToast(`Added skill: ${newSkill.name}`)
                  }}
                  className="p-1 rounded-md text-slate-500 hover:text-[#be4c3f] hover:bg-slate-100 transition-colors"
                  title="Add Skill"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsSkillsOpen(!isSkillsOpen)}
                  className="p-1 text-slate-500 hover:text-slate-700"
                >
                  {isSkillsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {isSkillsOpen && (
              <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50 space-y-2">
                <div className="space-y-1.5 pt-2">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                    >
                      <span className="text-slate-800 font-medium truncate">
                        {skill.name}
                      </span>
                      <button
                        onClick={() => {
                          setSkills((prev) =>
                            prev.filter((s) => s.id !== skill.id),
                          )
                          showToast(`Removed ${skill.name}`)
                        }}
                        className="text-slate-500 hover:text-red-500 p-0.5 rounded ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const newSkill = {
                      id: `s${Date.now()}`,
                      name: `Workflow Skill ${skills.length + 1}`,
                      enabled: true,
                    }
                    setSkills((prev) => [...prev, newSkill])
                    showToast("Created new agent skill")
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-[#be4c3f] bg-white hover:bg-[#fdf2f0] border border-dashed border-[#f5d0cb] rounded-lg transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Skill</span>
                </button>
              </div>
            )}
          </div>

          {/* 6. AUTOMATION — add + Schedule and + Trigger */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <Zap className="w-4 h-4 text-slate-600" />
                <span>Automation</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {schedules.length + triggers.length} active
              </span>
            </div>

            {/* + Schedule and + Trigger Dual Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const newSch = {
                    id: `sch${Date.now()}`,
                    label: "Daily Summary Pulse",
                    cron: "0 9 * * *",
                    active: true,
                  }
                  setSchedules((prev) => [...prev, newSch])
                  showToast("Added schedule: Daily at 9:00 AM")
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors shadow-2xs group"
              >
                <Calendar className="w-3.5 h-3.5 text-[#be4c3f]" />
                <span>+ Schedule</span>
              </button>

              <button
                onClick={() => {
                  const newTrig = {
                    id: `trig${Date.now()}`,
                    label: "Slack Mention Webhook",
                    endpoint: "POST /events/slack",
                    active: true,
                  }
                  setTriggers((prev) => [...prev, newTrig])
                  showToast("Added trigger: Slack Mention Webhook")
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors shadow-2xs group"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>+ Trigger</span>
              </button>
            </div>

            {/* Active Automations List */}
            {(schedules.length > 0 || triggers.length > 0) && (
              <div className="space-y-1.5 pt-0.5">
                {schedules.map((sch) => (
                  <div
                    key={sch.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3 h-3 text-[#be4c3f] shrink-0" />
                      <span className="font-medium text-slate-800 truncate">
                        {sch.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      <span className="text-[10px] font-mono text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {sch.cron}
                      </span>
                      <button
                        onClick={() =>
                          setSchedules((prev) =>
                            prev.filter((s) => s.id !== sch.id),
                          )
                        }
                        className="text-slate-500 hover:text-red-500 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
                {triggers.map((trig) => (
                  <div
                    key={trig.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">
                        {trig.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      <span className="text-[10px] font-mono text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {trig.endpoint}
                      </span>
                      <button
                        onClick={() =>
                          setTriggers((prev) =>
                            prev.filter((t) => t.id !== trig.id),
                          )
                        }
                        className="text-slate-500 hover:text-red-500 p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 7. FEATURES — compact feature cards such as Memory, Data Query and Responsible AI */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">Features</span>
              <span className="text-xs text-slate-500 font-semibold">
                3 active
              </span>
            </div>

            <div className="space-y-2">
              {/* Memory Card */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-[#be4c3f] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Brain className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      Memory
                    </h4>
                    <p className="text-xs text-slate-500 leading-tight truncate mt-0.5">
                      Persistent context across sessions
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isMemoryEnabled}
                  onClick={() => {
                    setIsMemoryEnabled(!isMemoryEnabled)
                    showToast(
                      `Agent Memory ${
                        !isMemoryEnabled ? "enabled" : "disabled"
                      }`,
                    )
                  }}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ml-2 ${
                    isMemoryEnabled ? "bg-[#be4c3f]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isMemoryEnabled ? "translate-x-3" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Data Query Card */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Database className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      Data Query
                    </h4>
                    <p className="text-xs text-slate-500 leading-tight truncate mt-0.5">
                      Direct SQL & semantic vector retrieval
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isDataQueryEnabled}
                  onClick={() => {
                    setIsDataQueryEnabled(!isDataQueryEnabled)
                    showToast(
                      `Data Query ${
                        !isDataQueryEnabled ? "enabled" : "disabled"
                      }`,
                    )
                  }}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ml-2 ${
                    isDataQueryEnabled ? "bg-[#be4c3f]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isDataQueryEnabled ? "translate-x-3" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Responsible AI Card */}
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      Responsible AI
                    </h4>
                    <p className="text-xs text-slate-500 leading-tight truncate mt-0.5">
                      Guardrails, toxicity filters & PII masking
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isResponsibleAIEnabled}
                  onClick={() => {
                    setIsResponsibleAIEnabled(!isResponsibleAIEnabled)
                    showToast(
                      `Responsible AI guardrails ${
                        !isResponsibleAIEnabled ? "enabled" : "disabled"
                      }`,
                    )
                  }}
                  className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ml-2 ${
                    isResponsibleAIEnabled ? "bg-[#be4c3f]" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isResponsibleAIEnabled ? "translate-x-3" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 8. PRESERVED SECONDARY SECTIONS: Credit Warning Card, How can I help?, Pro Tip */}
          {/* Credit Warning Card - Solid Fill */}
          <div className="p-3.5 rounded-xl bg-[#be4c3f] text-white space-y-2.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-sm font-bold text-white">
              <AlertCircle className="w-4 h-4 text-white" />
              <span>You have no credits left</span>
            </div>
            <p className="text-xs text-white/90 leading-snug">
              You've used up all your credits. Upgrade or refill to continue
              running agent tasks.
            </p>
            <button
              onClick={() => {
                setCreditsRemaining(2500)
                showToast("Account credits upgraded (+2,500)")
              }}
              className="w-full flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-[#be4c3f] text-xs font-bold transition-colors shadow-xs"
            >
              <span>Upgrade your account</span>
              <span>→</span>
            </button>
          </div>

          {/* How can I help? Card */}
          <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <BookOpen className="w-4 h-4 text-[#be4c3f]" />
              <span>How can I help?</span>
            </div>

            <div className="space-y-1">
              {[
                "Add test coverage",
                "Add production monitoring",
                "Get detailed recommendations",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (onOpenCopilot) onOpenCopilot()
                    else showToast(`Copilot suggestion: ${item}`)
                  }}
                  className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 text-xs text-slate-700 hover:text-slate-900 transition-colors text-left group"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[10px] text-slate-500 font-bold">
                      ◇
                    </span>
                    <span className="truncate">{item}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-slate-800 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Pro Tip Card */}
          {isProTipVisible && (
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 relative space-y-1.5">
              <button
                onClick={() => setIsProTipVisible(false)}
                className="absolute top-2.5 right-2.5 text-slate-500 hover:text-slate-700 p-0.5 rounded transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Pro tip</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pr-3 font-normal">
                A well-defined goal and clear instructions help your agent
                perform better.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ModelSelectionModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        selectedModel={selectedModel}
        onSelectModel={(m) => {
          setSelectedModel(m)
          showToast(`Model set to ${m}`)
        }}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        agentName={agentTitle}
      />

      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        agentName={agentTitle}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#be4c3f]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
