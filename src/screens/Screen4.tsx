import React, { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Share2,
  MoreHorizontal,
  Send,
  Play,
  CheckCircle2,
  Clock,
  RotateCw,
  Copy,
  Check,
  Zap,
  Info,
  Trash2,
  Lightbulb,
  Search,
  Mail,
  TrendingUp,
  LayoutGrid,
  FileText,
  Wrench,
  BookOpen,
  CheckSquare,
  List,
  Settings,
  Plus,
  Globe,
  Bot,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Terminal,
  User,
} from "lucide-react"
import ShareModal from "../components/ShareModal"
import DeployModal from "../components/DeployModal"
import ModelSelectionModal from "../components/ModelSelectionModal"
import FormattedChatMessage from "../components/FormattedChatMessage"
import ExecutionTracesCard from "../components/ExecutionTracesCard"
import AiOrb from "../components/AiOrb"

interface Screen4Props {
  onNavigateTab?: (tab: "build" | "run" | "evaluate") => void
  onHomeClick?: () => void
}

interface StepTrace {
  name: string
  status: "running" | "completed" | "failed"
  latency: string
}

interface ChatMessage {
  id: string
  sender: "agent" | "user"
  text: string
  time: string
  steps?: StepTrace[]
}

// Authentic agent glyph icon matching reference screenshot exactly
function AgentAvatarIcon({
  className = "w-5 h-5 text-[#be4c3f]",
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

import {
  GmailIcon,
  SlackIcon,
  SheetsIcon,
  GlobeToolIcon,
} from "../components/ToolIcons"

export default function Screen4({ onNavigateTab, onHomeClick }: Screen4Props) {
  // Navigation & mode
  const [activeNav, setActiveNav] = useState("run")
  const [activeMode, setActiveMode] = useState<"chat" | "task">("chat")

  // Modals
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isDeployOpen, setIsDeployOpen] = useState(false)
  const [isModelModalOpen, setIsModelModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "agent",
      text: "Hello! I'm your live agent execution sandbox. Ask me any task or query to test my prompt instructions, tool integrations, and reasoning traces.",
      time: "10:42 AM",
      steps: [
        {
          name: "Environment initialized",
          status: "completed",
          latency: "140ms",
        },
        {
          name: "Loaded tools: Gmail, Slack, Sheets",
          status: "completed",
          latency: "210ms",
        },
        { name: "Agent ready", status: "completed", latency: "320ms" },
      ],
    },
  ])
  const [isTracesExpanded, setIsTracesExpanded] = useState(true)
  const [inputMessage, setInputMessage] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Example cards state
  const [exampleSetIndex, setExampleSetIndex] = useState(0)

  const exampleSets = [
    [
      {
        icon: Search,
        iconBg: "bg-blue-50 text-blue-600",
        text: "Research competitive pricing for AI agents",
      },
      {
        icon: Mail,
        iconBg: "bg-red-50 text-red-500",
        text: "Triage latest support emails and draft replies",
      },
      {
        icon: TrendingUp,
        iconBg: "bg-emerald-50 text-emerald-600",
        text: "Audit system uptime and create Slack report",
      },
    ],
    [
      {
        icon: Search,
        iconBg: "bg-purple-50 text-purple-600",
        text: "Synthesize Q3 customer NPS survey feedback",
      },
      {
        icon: Mail,
        iconBg: "bg-amber-50 text-amber-600",
        text: "Check high priority inbox and notify in Slack",
      },
      {
        icon: TrendingUp,
        iconBg: "bg-indigo-50 text-indigo-600",
        text: "Generate weekly revenue pipeline briefing",
      },
    ],
  ]

  const currentExamples = exampleSets[exampleSetIndex % exampleSets.length]

  // Sessions state
  const [activeSessionId, setActiveSessionId] = useState("s1")
  const [sessions, setSessions] = useState([
    { id: "s1", title: "New conversation", time: "10:42 AM", active: true },
    {
      id: "s2",
      title: "Research on AI agents",
      time: "9:15 AM",
      active: false,
    },
    {
      id: "s3",
      title: "Slack report generation",
      time: "Yesterday",
      active: false,
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isExecuting])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    showToast("Copied output to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim()
    if (!query || isExecuting) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputMessage("")
    setIsExecuting(true)

    setTimeout(() => {
      let replyText = ""
      const lower = query.toLowerCase()

      if (
        lower.includes("pricing") ||
        lower.includes("research") ||
        lower.includes("competitive")
      ) {
        replyText = `### Competitive Pricing Analysis Complete\n\n- **Target Category:** Enterprise AI Agent Frameworks\n- **Key Findings:** Identified market median at $0.03/1k tokens with tiered tool allowances. Premium tiers include SOC-2 compliance, unlimited webhook triggers, and private cloud VPC endpoints.\n- **Action Executed:** Formatted comparison table and exported data row to Google Sheets.`
      } else if (
        lower.includes("support") ||
        lower.includes("triage") ||
        lower.includes("email")
      ) {
        replyText = `### Inbound Support Triage Completed\n\n- **Processed:** 12 recent customer messages from Gmail integration.\n- **Status:**\n  • 7 Account access tickets resolved via auto-draft\n  • 3 Bug reports escalated to engineering Slack channel\n  • 2 Enterprise custom quotes flagged for Sales`
      } else if (
        lower.includes("uptime") ||
        lower.includes("slack") ||
        lower.includes("report")
      ) {
        replyText = `### System Uptime & Incident Audit\n\n- **Audit Period:** Past 72 hours\n- **Status:** 99.98% uptime across all cluster API endpoints.\n- **Notification Sent:** Posted executive overview to #ops-monitoring in Slack.`
      } else {
        replyText = `Instruction processed successfully with GPT-5.4 Luna:\n\n1. Validated prompt parameters and tool schema integrity.\n2. Invocated verified integrations (Gmail, Sheets, Slack).\n3. Verified output constraints with zero schema violations.`
      }

      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: replyText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        steps: [
          {
            name: "Verified runtime schema & tool credentials",
            status: "completed",
            latency: "110ms",
          },
          {
            name: "Invoked external tools (Gmail, Sheets, Slack)",
            status: "completed",
            latency: "240ms",
          },
          {
            name: "Model GPT-5.4 Luna generation",
            status: "completed",
            latency: "520ms",
          },
        ],
      }

      setMessages((prev) => [...prev, agentMsg])
      setIsExecuting(false)
    }, 850)
  }

  const handleClearSession = () => {
    setMessages([messages[0]])
    showToast("Session reset to initial state")
  }

  const handleMoreExamples = () => {
    setExampleSetIndex((prev) => prev + 1)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full bg-white font-sans antialiased text-slate-800 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= SUBHEADER BAR MATCHING REFERENCE EXACTLY ================= */}
      <div className="bg-white border-b border-slate-200 px-5 py-2.5 flex items-center justify-between shrink-0 sticky top-0 z-30">
        {/* Left: Back Arrow, 'A' avatar, Agent Title, Published pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onHomeClick) onHomeClick()
              else if (onNavigateTab) onNavigateTab("build")
            }}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Salmon coral square avatar with capital 'A' */}
          <div className="w-7 h-7 rounded-lg bg-[#fdf2f0] border border-[#f5d0cb] flex items-center justify-center text-[#be4c3f] font-bold text-xs shrink-0">
            A
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 text-xs tracking-tight">
              Research & Operations Agent
            </span>

            {/* Published Pill Dropdown */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 border border-emerald-200/80 text-emerald-700 cursor-pointer hover:bg-emerald-100/60 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Published</span>
              <ChevronDown className="w-3 h-3 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Center: Build / Run / Evaluate Tabs */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => onNavigateTab && onNavigateTab("build")}
            className="px-4 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Build
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab("run")}
            className="px-4 py-1 rounded-md text-xs font-semibold bg-[#fdf2f0] text-[#be4c3f] shadow-2xs"
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
      </div>

      {/* ================= MAIN 3-COLUMN LAYOUT ================= */}
      <div className="flex-1 flex min-h-0 bg-white overflow-hidden">
        {/* ================= COLUMN 1: LEFT NAVIGATION SIDEBAR (~200px) ================= */}
        <aside className="w-48 shrink-0 border-r border-slate-200 bg-white p-3 space-y-1 flex flex-col select-none overflow-y-auto">
          {[
            { id: "overview", label: "Overview", icon: LayoutGrid },
            { id: "prompt", label: "Prompt", icon: FileText },
            { id: "tools", label: "Tools", icon: Wrench },
            { id: "knowledge", label: "Knowledge", icon: BookOpen },
            { id: "triggers", label: "Triggers", icon: Zap },
            { id: "run", label: "Run", icon: Play },
            { id: "evaluations", label: "Evaluations", icon: CheckSquare },
            { id: "logs", label: "Logs", icon: List },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon
            const isSelected = activeNav === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id)
                  if (
                    item.id === "prompt" ||
                    item.id === "overview" ||
                    item.id === "tools" ||
                    item.id === "knowledge"
                  ) {
                    if (onNavigateTab) onNavigateTab("build")
                  } else if (item.id === "evaluations") {
                    if (onNavigateTab) onNavigateTab("evaluate")
                  }
                }}
                className={`relative w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[16px] transition-all text-left ${
                  isSelected
                    ? "text-[#be4c3f] font-semibold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
                }`}
              >
                {isSelected && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#be4c3f] rounded-r-full" />
                )}
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? "text-[#be4c3f]" : "text-slate-500"
                  }`}
                />
                <span>{item.label}</span>
              </button>
            )
          })}
        </aside>

        {/* ================= COLUMN 2: CENTER LIVE EXECUTION SANDBOX (FLEX-1) ================= */}
        <main className="flex-1 flex flex-col overflow-y-auto px-7 py-5 min-h-0">
          <div className="w-full flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-5">
              {/* TOP AGENT HEADER CARD */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                <div className="flex items-center gap-3.5">
                  {/* Agent Logo Box */}
                  <div className="w-10 h-10 rounded-xl bg-[#fdf2f0] border border-[#f5d0cb] flex items-center justify-center text-[#be4c3f] shrink-0">
                    <AgentAvatarIcon className="w-5 h-5 text-[#be4c3f]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-[16px] font-bold text-slate-900 tracking-tight">
                        Research & Operations Agent
                      </h1>
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Ready to Execute
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Connected to GPT-5.4 Luna • Tools: Web Search, Gmail,
                      Sheets, Slack
                    </p>
                  </div>
                </div>

                {/* Credits & Interactive / Task Runner Toggle */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs">
                    <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    <span className="font-bold text-slate-800">
                      2,450 / 2,500
                    </span>
                    <span className="text-slate-600 font-medium">credits</span>
                  </div>

                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setActiveMode("chat")}
                      className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        activeMode === "chat"
                          ? "bg-[#1e293b] text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Interactive Chat
                    </button>
                    <button
                      onClick={() => setActiveMode("task")}
                      className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                        activeMode === "task"
                          ? "bg-[#1e293b] text-white shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Task Runner
                    </button>
                  </div>
                </div>
              </div>

              {/* "TRY THESE EXAMPLES" SECTION */}
              <div className="space-y-2.5">
                <h2 className="text-sm font-bold text-slate-900">
                  Try these examples
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-stretch">
                  {currentExamples.map((ex, idx) => {
                    const IconComp = ex.icon
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(ex.text)}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs text-left flex items-center justify-between gap-3 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-7 h-7 rounded-lg ${ex.iconBg} flex items-center justify-center shrink-0`}
                          >
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs text-slate-700 font-medium leading-snug">
                            {ex.text}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-800 shrink-0" />
                      </button>
                    )
                  })}

                  {/* More Examples Button */}
                  <button
                    onClick={handleMoreExamples}
                    className="px-4 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>More examples</span>
                  </button>
                </div>
                {/* CHAT MESSAGES & LIVE STEP TRACES */}
                <div className="space-y-6 pt-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3.5 items-start ${
                        msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                      } group`}
                    >
                      {/* Message Avatar */}
                      {msg.sender === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-[#be4c3f] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ring-2 ring-white select-none sticky top-2">
                          SS
                        </div>
                      ) : (
                        <AiOrb
                          size="md"
                          animate={true}
                          className="shrink-0 select-none sticky top-2"
                        />
                      )}

                      {/* Message Body Column */}
                      {msg.sender === "user" ? (
                        <div className="flex flex-col gap-1 max-w-xl items-end">
                          <div className="flex items-center gap-1.5 px-1 text-[11px] text-slate-500 font-medium">
                            <span className="font-semibold text-slate-700">
                              You
                            </span>
                            <span>•</span>
                            <span>{msg.time}</span>
                          </div>
                          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl rounded-tr-xs text-xs leading-relaxed shadow-xs font-normal whitespace-pre-wrap">
                            {msg.text}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1.5 max-w-2xl items-start flex-1">
                          <div className="flex items-center gap-2 px-1 text-[11px] text-slate-500 font-medium">
                            <span className="font-bold text-slate-900">
                              Sandbox Agent
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                              GPT-5.4 Luna
                            </span>
                            <span>•</span>
                            <span>{msg.time}</span>
                          </div>

                          {/* Agent Bubble Card */}
                          <div className="w-full bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-4.5 shadow-xs text-xs space-y-3.5">
                            {/* Rich Formatted Output Text */}
                            <FormattedChatMessage text={msg.text} />

                            {/* Execution Step Traces card */}
                            {msg.steps && msg.steps.length > 0 && (
                              <ExecutionTracesCard
                                steps={msg.steps}
                                msgId={msg.id}
                                fullOutputText={msg.text}
                                defaultExpanded={isTracesExpanded}
                              />
                            )}

                            {/* Action Toolbar */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleCopy(msg.text, msg.id)}
                                  className="flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                  {copiedId === msg.id ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      <span className="text-emerald-600 font-semibold">
                                        Copied output
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                                      <span>Copy output</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => handleSendMessage(msg.text)}
                                  className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                                  title="Rerun instruction"
                                >
                                  <RotateCw className="w-3 h-3 text-slate-500" />
                                  <span>Rerun</span>
                                </button>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() =>
                                    showToast("Thanks for the feedback!")
                                  }
                                  className="p-1 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors cursor-pointer"
                                  title="Helpful response"
                                >
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => showToast("Feedback recorded")}
                                  className="p-1 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors cursor-pointer"
                                  title="Report issue"
                                >
                                  <ThumbsDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isExecuting && (
                    <div className="flex gap-3.5 items-start animate-fadeIn">
                      <AiOrb
                        size="md"
                        animate={true}
                        isThinking={true}
                        className="shrink-0"
                      />
                      <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-xs text-xs text-slate-700 flex items-center gap-3 shadow-xs">
                        <div className="w-4 h-4 border-2 border-[#be4c3f] border-t-transparent rounded-full animate-spin shrink-0" />
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-900">
                            Reasoning with GPT-5.4 Luna...
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Evaluating runtime schemas & calling external tools
                            (Gmail, Sheets, Slack)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* BOTTOM PROMPT INPUT BAR */}
              <div className="pt-4 sticky bottom-0 bg-white/95 backdrop-blur-xs">
                <div className="border border-slate-200 focus-within:border-[#be4c3f] focus-within:ring-2 focus-within:ring-[#be4c3f]/15 rounded-2xl p-3.5 bg-white shadow-sm transition-all space-y-2.5">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (
                        (e.key === "Enter" && (e.metaKey || e.ctrlKey)) ||
                        (e.key === "Enter" && !e.shiftKey)
                      ) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Type a message or instruction to test your agent live... (Enter to send, Shift+Enter for newline)"
                    className="w-full text-xs text-slate-800 placeholder:text-slate-400 outline-none resize-none bg-transparent min-h-[48px] leading-relaxed"
                    disabled={isExecuting}
                  />

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    {/* Left tool chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => showToast("Add attachment or dataset")}
                        className="w-7 h-7 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-2xs cursor-pointer"
                        title="Add attachment"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setIsModelModalOpen(true)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Wrench className="w-3.5 h-3.5 text-[#be4c3f]" />
                        <span>Tools (3 active)</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setIsModelModalOpen(true)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>GPT-5.4 Luna</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </button>

                      <button
                        onClick={handleClearSession}
                        className="px-2 py-1 rounded-lg hover:bg-slate-100 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Reset conversation"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reset</span>
                      </button>
                    </div>

                    {/* Right send button & shortcut */}
                    <div className="flex items-center gap-2.5">
                      <kbd className="hidden md:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500 bg-slate-100 border border-slate-200 rounded select-none">
                        ⌘↵ to run
                      </kbd>

                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputMessage.trim() || isExecuting}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                          inputMessage.trim() && !isExecuting
                            ? "bg-[#be4c3f] hover:bg-[#a83e32] text-white"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <span>Run</span>
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ================= COLUMN 3: RIGHT AGENT CONTEXT SIDEBAR (~280px) ================= */}
        <aside className="w-72 shrink-0 border-l border-slate-200 bg-white p-5 space-y-6 flex flex-col justify-between overflow-y-auto select-none">
          <div className="space-y-6">
            {/* Header: Agent Context */}
            <div className="flex items-center justify-between pb-1">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Agent Context</span>
                <Info className="w-3.5 h-3.5 text-slate-500" />
              </h3>
            </div>

            {/* Model Card */}
            <div
              onClick={() => setIsModelModalOpen(true)}
              className="border border-slate-200 rounded-xl p-3 bg-white hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                  <AgentAvatarIcon className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-medium leading-none">
                    Model
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    GPT-5.4 Luna
                  </div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>

            {/* Available Tools */}
            <div className="space-y-3">
              <h4 className="text-[17px] font-semibold text-slate-800 tracking-tight">
                Available Tools
              </h4>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => setIsModelModalOpen(true)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center p-2 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer shrink-0"
                  title="Gmail Integration"
                >
                  <GmailIcon className="w-5 h-5 shrink-0" />
                </div>

                <div
                  onClick={() => setIsModelModalOpen(true)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center p-2 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer shrink-0"
                  title="Slack Workspace"
                >
                  <SlackIcon className="w-5 h-5 shrink-0" />
                </div>

                <div
                  onClick={() => setIsModelModalOpen(true)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center p-2 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer shrink-0"
                  title="Google Sheets"
                >
                  <SheetsIcon className="w-5 h-5 shrink-0" />
                </div>

                <div
                  onClick={() => setIsModelModalOpen(true)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center p-2 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer text-slate-700 shrink-0"
                  title="Web Search"
                >
                  <GlobeToolIcon className="w-5 h-5 text-slate-700 shrink-0" />
                </div>

                <div
                  onClick={() => setIsModelModalOpen(true)}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 hover:shadow-xs cursor-pointer transition-all shrink-0"
                  title="3 more tools configured"
                >
                  +3
                </div>
              </div>
            </div>

            {/* Session History */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Session</h4>
                <button
                  onClick={handleClearSession}
                  className="text-[11px] font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3 text-slate-500" />
                  <span>Clear</span>
                </button>
              </div>

              <span className="text-[11px] font-semibold text-slate-500 block pt-1">
                Today
              </span>

              <div className="space-y-1">
                {sessions.map((sess) => {
                  const isActive = activeSessionId === sess.id
                  return (
                    <div
                      key={sess.id}
                      onClick={() => setActiveSessionId(sess.id)}
                      className={`px-3 py-2 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-all ${
                        isActive
                          ? "bg-[#fdf2f0] border border-[#f5d0cb] font-medium text-[#be4c3f]"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className="truncate">{sess.title}</span>
                      <span className="text-[11px] text-slate-500 font-mono shrink-0 ml-2">
                        {sess.time}
                      </span>
                    </div>
                  )
                })}
              </div>

              <div
                onClick={() =>
                  showToast("Opening full execution session history...")
                }
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 pt-1.5 transition-colors cursor-pointer"
              >
                <span>View all history</span>
                <span className="text-xs">→</span>
              </div>
            </div>
          </div>

          {/* Bottom Pro Tip Card */}
          <div className="bg-[#fdf8f7] border border-[#f5d0cb] rounded-xl p-3.5 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Lightbulb className="w-4 h-4 text-[#be4c3f]" />
              <span>Pro tip</span>
            </div>
            <p className="text-[12px] text-slate-700 leading-relaxed font-normal">
              Try using natural language. The agent will use the configured
              tools and knowledge automatically.
            </p>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        agentTitle="Research & Operations Agent"
      />

      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        agentTitle="Research & Operations Agent"
      />

      <ModelSelectionModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        currentModel="GPT-5.4 Luna"
        onSelectModel={(m) => {
          showToast(`Selected model: ${m}`)
          setIsModelModalOpen(false)
        }}
      />
    </div>
  )
}
