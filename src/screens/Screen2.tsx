import React, { useState } from "react"
import Header from "../components/Header"
import TemplateCards from "../components/TemplateCards"
import InventChatPanel from "../components/InventChatPanel"
import { renderToolIcon } from "../components/ToolIcons"
import {
  Bot,
  Wand2,
  GraduationCap,
  Wrench,
  Database,
  Code2,
  Check,
  Bell,
  Brain,
  Sliders,
  HelpCircle,
  Plus,
  Trash2,
  UploadCloud,
  X,
  Zap,
  ExternalLink,
  Play,
  Eye,
  Pencil,
  FileText,
  Info,
  Box,
  ChevronDown,
  ChevronRight,
  FileCode,
  SlidersHorizontal,
  Calendar,
  ShieldCheck,
  AlertCircle,
} from "lucide-react"

const a = "/assets"

interface Screen2Props {
  onNavigateTab?: (tab: "build" | "run" | "evaluate") => void
  onOpenCopilot?: () => void
  onHomeClick?: () => void
}

export default function Screen2({
  onNavigateTab,
  onOpenCopilot,
  onHomeClick,
}: Screen2Props) {
  const avatarMask = `${a}/05871.svg`
  const avatarImg = `${a}/d46a9.svg`

  // Active folder tab in left sidebar
  const [activeTab, setActiveTab] =
    useState<"prompt" | "tools" | "knowledge" | "triggers" | "alarms" | "memory" | "variables" | "advanced" | "help">(
      "prompt",
    )

  // Agent State
  const [agentTitle, setAgentTitle] = useState("Research & Operations Agent")
  const [instructions, setInstructions] = useState(
    "You are an autonomous operations assistant. Monitor incoming email triggers and categorize support requests with high confidence.",
  )
  const [isSaved, setIsSaved] = useState(false)
  // Default to null so center has full spacious breathing room and is NOT crowded!
  const [showRightDrawer, setShowRightDrawer] =
    useState<"copilot" | "summary" | null>(null)

  // Tools state
  const [toolsList, setToolsList] = useState([
    {
      name: "Web Search",
      desc: "Live web scraper & search",
      enabled: true,
      icon: "🌐",
    },
    {
      name: "Gmail",
      desc: "Send, read, and draft emails",
      enabled: true,
      icon: "✉️",
    },
    {
      name: "Slack",
      desc: "Post to channels and threads",
      enabled: true,
      icon: "💬",
    },
    {
      name: "Google Sheets",
      desc: "Read and append spreadsheet rows",
      enabled: true,
      icon: "📊",
    },
    {
      name: "Linear",
      desc: "Issue tracking and project tasks",
      enabled: false,
      icon: "📐",
    },
    {
      name: "Postgres DB",
      desc: "Direct SQL query execution",
      enabled: false,
      icon: "🗄️",
    },
  ])

  // Knowledge docs state
  interface KnowledgeDocItem {
    id: string
    name: string
    size: string
    chunks?: string
    status?: string
    type?: string
  }

  const [documents, setDocuments] = useState<KnowledgeDocItem[]>([
    {
      id: "k1",
      name: "Enterprise_SOP_2026.pdf",
      size: "2.4 MB",
      chunks: "48 Chunks",
      status: "Indexed",
      type: "PDF",
    },
    {
      id: "k2",
      name: "Support_FAQ_Handbook.md",
      size: "840 KB",
      chunks: "18 Chunks",
      status: "Indexed",
      type: "MD",
    },
    {
      id: "k3",
      name: "API_Schema_v3.json",
      size: "320 KB",
      chunks: "8 Chunks",
      status: "Indexed",
      type: "JSON",
    },
  ])

  // Triggers state
  interface TriggerItem {
    id: string
    name: string
    type: string
    detail: string
    active: boolean
  }

  const [triggersList, setTriggersList] = useState<TriggerItem[]>([
    {
      id: "t1",
      name: "Inbound Email Trigger",
      type: "Gmail Event",
      detail: "Subject matches [Urgent] or [Escalation]",
      active: true,
    },
    {
      id: "t2",
      name: "Daily Standup Cron",
      type: "Scheduled Pulse",
      detail: "Runs weekdays at 09:00 AM UTC",
      active: true,
    },
    {
      id: "t3",
      name: "Customer Webhook",
      type: "POST /webhook/agent",
      detail: "Payload validated with HMAC-SHA256",
      active: false,
    },
  ])

  // Variables state
  const [variables, setVariables] = useState([
    { key: "COMPANY_DOMAIN", val: "lyzr.ai", isSecret: false },
    { key: "MAX_RETRIES", val: "3", isSecret: false },
    { key: "SLACK_ALERT_CHANNEL", val: "#agent-ops", isSecret: false },
    { key: "INTERNAL_API_KEY", val: "••••••••••••••••", isSecret: true },
  ])
  const [newVarKey, setNewVarKey] = useState("")
  const [newVarVal, setNewVarVal] = useState("")

  // Memory state
  const [memoryMode, setMemoryMode] = useState<"vector" | "session">("vector")
  const [memoryItems, setMemoryItems] = useState([
    "User prefers succinct Markdown bullet points without greetings",
    "Primary reporting channel is #agent-feed in Slack",
    "Flag any query mentioning SOC2 or GDPR to compliance officer",
  ])
  const [newMemoryText, setNewMemoryText] = useState("")

  // Alarms state
  const [errorThreshold, setErrorThreshold] = useState(5)
  const [latencyThreshold, setLatencyThreshold] = useState(2500)

  // Advanced model state
  const [selectedModel, setSelectedModel] = useState(
    "Performance-optimized Model",
  )
  const [temperature, setTemperature] = useState(0.2)
  const [maxTokens, setMaxTokens] = useState(4096)
  const [isModelSettingsOpen, setIsModelSettingsOpen] = useState(false)
  const [modelThinking, setModelThinking] = useState(true)

  // Missing Configuration options state matching reference
  const [outputFormat, setOutputFormat] = useState("Markdown")
  const [isOutputFormatOpen, setIsOutputFormatOpen] = useState(false)
  const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false)
  const [isToolsOpen, setIsToolsOpen] = useState(false)
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  const [skillsList, setSkillsList] = useState([
    { id: "s1", name: "Data Extraction & Enrichment", enabled: true },
    { id: "s2", name: "Executive Report Synthesizer", enabled: true },
  ])
  const [schedulesList, setSchedulesList] = useState([
    {
      id: "sch1",
      label: "Hourly Health Check",
      cron: "0 * * * *",
      active: true,
    },
  ])
  const [isMemoryEnabled, setIsMemoryEnabled] = useState(true)
  const [isDataQueryEnabled, setIsDataQueryEnabled] = useState(true)
  const [isResponsibleAIEnabled, setIsResponsibleAIEnabled] = useState(true)

  const [selectedTemplateTitle, setSelectedTemplateTitle] =
    useState("Web Researcher")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Modals
  const [modalOpen, setModalOpen] =
    useState<"addTool" | "addTrigger" | "editTrigger" | null>(null)
  const [newToolName, setNewToolName] = useState("")
  const [newToolDesc, setNewToolDesc] = useState("")
  const [newToolIcon, setNewToolIcon] = useState("⚡")

  const [newTrgName, setNewTrgName] = useState("")
  const [newTrgType, setNewTrgType] = useState("Webhook")
  const [newTrgDetail, setNewTrgDetail] = useState("")

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleSave = () => {
    setIsSaved(true)
    showToast("Changes saved successfully!")
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleApplyInstructions = (text: string) => {
    setInstructions(text)
    showToast("Instructions updated from Copilot!")
    handleSave()
  }

  const handleTemplateSelect = (tmpl: {
    title: string
    prompt: string
    tools: string[]
  }) => {
    setSelectedTemplateTitle(tmpl.title)
    setAgentTitle(tmpl.title)
    setInstructions(tmpl.prompt)
    setToolsList((prev) =>
      prev.map((t) => ({ ...t, enabled: tmpl.tools.includes(t.name) })),
    )
    showToast(
      `Applied "${tmpl.title}" template with verified instructions and active tools!`,
    )
    handleSave()
  }

  const handleCreateCustomTool = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newToolName.trim()) return
    setToolsList((prev) => [
      ...prev,
      {
        name: newToolName.trim(),
        desc: newToolDesc.trim() || "Custom user tool",
        enabled: true,
        icon: newToolIcon || "⚡",
      },
    ])
    setNewToolName("")
    setNewToolDesc("")
    setModalOpen(null)
    showToast(`Added custom tool: ${newToolName}`)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const newDoc: KnowledgeDocItem = {
        id: `k${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        chunks: "12 Chunks",
        status: "Indexed",
      }
      setDocuments((prev) => [newDoc, ...prev])
      showToast(`Uploaded & indexed "${file.name}"!`)
      handleSave()
    }
  }

  const handleCreateTrigger = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTrgName.trim()) return
    setTriggersList((prev) => [
      ...prev,
      {
        id: `t${Date.now()}`,
        name: newTrgName.trim(),
        type: newTrgType,
        detail: newTrgDetail.trim() || "Active trigger rule",
        active: true,
      },
    ])
    setNewTrgName("")
    setNewTrgDetail("")
    setModalOpen(null)
    showToast(`Added trigger: ${newTrgName}`)
  }

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMemoryText.trim()) return
    setMemoryItems((prev) => [...prev, newMemoryText.trim()])
    setNewMemoryText("")
    showToast("Added persistent context rule")
  }

  const handleAddVariable = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVarKey.trim()) return
    setVariables((prev) => [
      ...prev,
      {
        key: newVarKey.trim().toUpperCase(),
        val: newVarVal.trim(),
        isSecret: false,
      },
    ])
    setNewVarKey("")
    setNewVarVal("")
  }

  const leftNavItems = [
    {
      id: "prompt",
      label: "Prompt",
      desc: "Agent instructions & persona",
      icon: FileText,
    },
    {
      id: "tools",
      label: "Tools",
      desc: "Connect apps & services",
      icon: Wrench,
      count: 4,
      badgeStyle: "bg-slate-100 text-slate-700",
    },
    {
      id: "knowledge",
      label: "Knowledge",
      desc: "Docs & data sources",
      icon: Database,
      count: 3,
      badgeStyle: "bg-[#fceceb] text-[#be4c3f]",
    },
    {
      id: "triggers",
      label: "Triggers",
      desc: "Automate agent runs",
      icon: Zap,
      count: 2,
      badgeStyle: "bg-[#fef3e9] text-[#e06d28]",
    },
    {
      id: "alarms",
      label: "Alarms",
      desc: "Alerts & notifications",
      icon: Bell,
    },
    {
      id: "memory",
      label: "Memory",
      desc: "Persistent context & history",
      icon: Brain,
    },
    {
      id: "variables",
      label: "Variables",
      desc: "Dynamic values & parameters",
      icon: Code2,
      count: 4,
      badgeStyle: "bg-[#fceceb] text-[#be4c3f]",
    },
  ]

  return (
    <div className="bg-white flex flex-col min-h-screen w-full font-sans antialiased text-slate-800">
      <Header
        activeTab="build"
        avatarMask={avatarMask}
        avatarImg={avatarImg}
        agentTitle={agentTitle}
        onTabChange={onNavigateTab}
        onHomeClick={onHomeClick}
      />

      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {/* ================= COMPACT SLEEK LEFT SIDEBAR (240px) ================= */}
        <div className="shrink-0 w-[240px] border-r border-slate-200 bg-white flex flex-col overflow-y-auto select-none">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center text-white text-xs shadow-2xs">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-[14px] tracking-tight">
                Agent Workspace
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#fceceb] text-[#be4c3f] font-semibold border border-[#f5d0cb] flex items-center gap-0.5">
              v2.4 <span className="text-[9px]">▾</span>
            </span>
          </div>

          {/* Main Navigation Folders */}
          <div className="p-2 space-y-1">
            {leftNavItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? "text-[#be4c3f] font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
                  }`}
                >
                  {/* Small vertical line indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#be4c3f] rounded-r-full" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-[18px] h-[18px] shrink-0 ${
                        isActive ? "text-[#be4c3f]" : "text-slate-500"
                      }`}
                    />
                    <span
                      className={`text-[16px] tracking-tight ${
                        isActive
                          ? "font-semibold text-[#be4c3f]"
                          : "font-medium text-slate-800"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {item.count !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold shrink-0 ml-1.5 ${
                        item.badgeStyle ||
                        (isActive
                          ? "bg-[#fceceb] text-[#be4c3f]"
                          : "bg-slate-100 text-slate-600")
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mx-3 border-t border-slate-100 my-1.5" />

          {/* Bottom Nav: Advanced & Help */}
          <div className="p-2 space-y-1">
            <button
              onClick={() => setActiveTab("advanced")}
              className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[16px] text-left transition-all ${
                activeTab === "advanced"
                  ? "text-[#be4c3f] font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
              }`}
            >
              {activeTab === "advanced" && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#be4c3f] rounded-r-full" />
              )}
              <Sliders
                className={`w-[18px] h-[18px] shrink-0 ${
                  activeTab === "advanced" ? "text-[#be4c3f]" : "text-slate-500"
                }`}
              />
              <span>Model Parameters</span>
            </button>

            <button
              onClick={() => setActiveTab("help")}
              className={`relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[16px] text-left transition-all ${
                activeTab === "help"
                  ? "text-[#be4c3f] font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-medium"
              }`}
            >
              {activeTab === "help" && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#be4c3f] rounded-r-full" />
              )}
              <HelpCircle
                className={`w-[18px] h-[18px] shrink-0 ${
                  activeTab === "help" ? "text-[#be4c3f]" : "text-slate-500"
                }`}
              />
              <span>Need help?</span>
            </button>
          </div>

          {/* Agent info bottom card matching reference */}
          <div className="mt-auto p-3 border-t border-slate-100 bg-white">
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-white shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#fceceb] text-[#be4c3f] flex items-center justify-center font-bold text-xs shrink-0 border border-[#f5d0cb]">
                  R&O
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Research & Operations
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Agent • v1.0.0
                  </p>
                </div>
              </div>
              <Bot className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </div>
            <div className="flex items-center gap-1.5 mt-2 px-1 text-[11px] text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Last saved 2 min ago</span>
            </div>
          </div>
        </div>

        {/* ================= CENTER DYNAMIC WORKSPACE (SPACIOUS & UNCLUTTERED) ================= */}
        <div className="flex flex-1 flex-col overflow-y-auto py-7 px-8 min-w-0 bg-white">
          <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* 3-Step Workflow Banner (Define • Connect • Test) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden group">
              <div className="flex items-center gap-5 min-w-0">
                <img
                  src="/robot-workflow-banner.png"
                  alt="Define, Connect, Test Agent Workflow"
                  className="h-20 w-auto object-contain shrink-0 drop-shadow-xs"
                />
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">
                      Agent Development Pipeline
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#be4c3f] text-white">
                      Interactive Guide
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Follow the 3-step loop: define system instructions, connect
                    APIs & knowledge tools, and run live sandbox tests.
                  </p>
                  <div className="flex items-center gap-2 pt-0.5 flex-wrap text-xs">
                    <button
                      onClick={() => setActiveTab("prompt")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === "prompt"
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span>1. Define Prompt</span>
                    </button>
                    <span className="text-slate-400">→</span>
                    <button
                      onClick={() => setActiveTab("tools")}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeTab === "tools" || activeTab === "knowledge"
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <span>2. Connect Tools</span>
                    </button>
                    <span className="text-slate-400">→</span>
                    <button
                      onClick={() => onNavigateTab && onNavigateTab("run")}
                      className="px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white transition-all cursor-pointer shadow-xs"
                    >
                      <span>3. Test Sandbox ▶</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. PROMPT VIEW */}
            {activeTab === "prompt" && (
              <div className="space-y-6">
                {/* Agent Header matching reference */}
                <div className="flex items-start justify-between gap-6 pb-1">
                  <div className="flex flex-col space-y-1 max-w-xl">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#be4c3f]">
                      BUILD YOUR AGENT
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={agentTitle}
                        onChange={(e) => setAgentTitle(e.target.value)}
                        className="font-bold text-slate-900 text-2xl tracking-tight bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#be4c3f] outline-none py-0.5 rounded transition-all w-[400px]"
                      />
                      <button
                        className="text-slate-500 hover:text-slate-700"
                        title="Rename agent"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Describe what your agent should do, or load a production
                      template below.
                    </p>
                  </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setActiveTab("tools")}
                      className="flex items-center gap-1.5 bg-white border border-slate-200/90 hover:border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
                    >
                      <Wrench className="w-3.5 h-3.5 text-[#be4c3f]" />
                      <span>
                        Tools ({toolsList.filter((t) => t.enabled).length})
                      </span>
                    </button>
                    <button
                      onClick={() => setActiveTab("knowledge")}
                      className="flex items-center gap-1.5 bg-white border border-slate-200/90 hover:border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
                    >
                      <Database className="w-3.5 h-3.5 text-[#be4c3f]" />
                      <span>Knowledge ({documents.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("variables")}
                      className="flex items-center gap-1.5 bg-white border border-slate-200/90 hover:border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800 transition-colors shadow-2xs"
                    >
                      <Code2 className="w-3.5 h-3.5 text-[#be4c3f]" />
                      <span>Variables ({variables.length})</span>
                    </button>
                  </div>

                  {/* Right inspector / Copilot controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setShowRightDrawer(
                          showRightDrawer === "summary" ? null : "summary",
                        )
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        showRightDrawer === "summary"
                          ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                          : "bg-white text-slate-800 border-slate-200/90 hover:bg-slate-50 shadow-2xs"
                      }`}
                    >
                      <Sliders className="w-3.5 h-3.5 text-[#be4c3f]" />
                      <span>
                        {showRightDrawer === "summary"
                          ? "Hide Inspector"
                          : "Inspector"}
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        setShowRightDrawer(
                          showRightDrawer === "copilot" ? null : "copilot",
                        )
                      }
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        showRightDrawer === "copilot"
                          ? "bg-[#be4c3f] text-white border-[#be4c3f] shadow-2xs"
                          : "border-[#f5d0cb] text-[#be4c3f] bg-white hover:bg-[#fdf2f0] shadow-2xs"
                      }`}
                    >
                      <Wand2 className="w-3.5 h-3.5 text-[#be4c3f]" />
                      <span>Use Copilot</span>
                    </button>
                  </div>
                </div>

                {/* Instructions editor with primary CTA Save Changes */}
                <div className="border border-slate-200/90 rounded-xl bg-white shadow-2xs focus-within:border-[#be4c3f] focus-within:ring-2 focus-within:ring-[#be4c3f]/10 transition-all p-4 space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-[16px]">
                        System Prompt & Instructions
                      </span>
                      <Info className="w-3.5 h-3.5 text-[#be4c3f] cursor-help" />
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 cursor-pointer shadow-2xs">
                      <span>Deterministic Markdown</span>
                      <span className="text-[10px] text-slate-500">▼</span>
                    </div>
                  </div>

                  <div className="border border-slate-200/80 rounded-lg p-3.5 bg-white">
                    <textarea
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full text-xs font-mono text-slate-800 leading-relaxed outline-none min-h-[85px] resize-none bg-transparent placeholder:text-slate-500"
                      placeholder="Describe instructions, tone, constraints, and tool usage..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-xs text-slate-500 font-medium">
                      {instructions.length.toLocaleString()} / 10,000 characters
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowRightDrawer("summary")}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#be4c3f] bg-white border border-slate-200 hover:bg-[#fdf2f0] rounded-lg transition-colors shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#be4c3f]" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>
                          {isSaved ? "Saved Changes ✓" : "Save Changes"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Templates */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-900 text-[16px]">
                      Start from a Template
                    </h3>
                    <button
                      onClick={() => onNavigateTab && onNavigateTab("build")}
                      className="text-xs font-semibold text-[#be4c3f] hover:underline flex items-center gap-1"
                    >
                      <span>Browse all templates</span>
                      <span className="text-xs">→</span>
                    </button>
                  </div>
                  <TemplateCards
                    selectedTitle={selectedTemplateTitle}
                    onSelectTemplate={handleTemplateSelect}
                    onAddTools={() => setModalOpen("addTool")}
                    onAddKnowledge={() => setActiveTab("knowledge")}
                    onAddTriggers={() => setModalOpen("addTrigger")}
                  />
                </div>
              </div>
            )}

            {/* 2. TOOLS VIEW */}
            {activeTab === "tools" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h2 className="text-[16px] font-bold text-slate-900">
                      Connected Agent Tools
                    </h2>
                    <p className="text-xs text-slate-500">
                      Select which apps and capabilities this agent can execute.
                    </p>
                  </div>
                  <button
                    onClick={() => setModalOpen("addTool")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Custom Tool</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {toolsList.map((t, idx) => (
                    <div
                      key={t.name}
                      className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center shadow-2xs shrink-0">
                          {renderToolIcon(t.name, "w-4 h-4")}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">
                            {t.name}
                          </p>
                          <p className="text-[11px] text-slate-500">{t.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={t.enabled}
                          onChange={() => {
                            setToolsList((prev) =>
                              prev.map((item, i) =>
                                i === idx
                                  ? { ...item, enabled: !item.enabled }
                                  : item,
                              ),
                            )
                            handleSave()
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#be4c3f]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. KNOWLEDGE VIEW */}
            {activeTab === "knowledge" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-200">
                  <h2 className="text-[16px] font-bold text-slate-900">
                    Knowledge Base & RAG Index
                  </h2>
                  <p className="text-xs text-slate-500">
                    Vector search documents to ground the agent in verified
                    facts.
                  </p>
                </div>

                {/* Upload box */}
                <label className="border-2 border-dashed border-slate-300 hover:border-[#be4c3f] bg-slate-50/50 hover:bg-[#fdf2f0]/30 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all">
                  <UploadCloud className="w-7 h-7 text-slate-700 mb-1.5" />
                  <p className="text-xs font-semibold text-slate-800">
                    Click to upload files (PDF, Markdown, JSON, CSV)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Maximum file size 50 MB
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {/* Document list */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Indexed Documents ({documents.length})
                  </h4>
                  {documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Database className="w-4 h-4 text-slate-700" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {doc.size} • {doc.chunks}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          {doc.status}
                        </span>
                        <button
                          onClick={() =>
                            setDocuments((prev) =>
                              prev.filter((_, i) => i !== idx),
                            )
                          }
                          className="p-1 text-slate-500 hover:text-rose-600 rounded-md"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. TRIGGERS VIEW */}
            {activeTab === "triggers" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h2 className="text-[16px] font-bold text-slate-900">
                      Autonomous Triggers
                    </h2>
                    <p className="text-xs text-slate-500">
                      Configure schedules, webhooks, or app events to trigger
                      this agent.
                    </p>
                  </div>
                  <button
                    onClick={() => setModalOpen("addTrigger")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Trigger</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {triggersList.map((trg, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-slate-700" />
                          <h4 className="text-xs font-bold text-slate-900">
                            {trg.name}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 font-mono text-slate-600">
                            {trg.type}
                          </span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={trg.active}
                            onChange={() => {
                              setTriggersList((prev) =>
                                prev.map((t, i) =>
                                  i === idx ? { ...t, active: !t.active } : t,
                                ),
                              )
                              handleSave()
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#be4c3f]"></div>
                        </label>
                      </div>
                      <p className="text-[11px] text-slate-500">{trg.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. ALARMS VIEW */}
            {activeTab === "alarms" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-200">
                  <h2 className="text-[16px] font-bold text-slate-900">
                    Alerts & SLA Alarms
                  </h2>
                  <p className="text-xs text-slate-500">
                    Notify your team immediately when execution thresholds are
                    breached.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Error Rate Alert Threshold
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {errorThreshold}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={errorThreshold}
                      onChange={(e) =>
                        setErrorThreshold(Number(e.target.value))
                      }
                      className="w-full accent-slate-900"
                    />
                    <p className="text-[11px] text-slate-500">
                      Alert Slack when error rate exceeds {errorThreshold}% in a
                      5-minute rolling window.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Latency SLA Cap
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {latencyThreshold} ms
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="5000"
                      step="100"
                      value={latencyThreshold}
                      onChange={(e) =>
                        setLatencyThreshold(Number(e.target.value))
                      }
                      className="w-full accent-slate-900"
                    />
                    <p className="text-[11px] text-slate-500">
                      Trigger warnings if round-trip model generation exceeds{" "}
                      {latencyThreshold}ms.
                    </p>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        handleSave()
                        showToast(
                          `SLA Alarms saved: ${errorThreshold}% error cap, ${latencyThreshold}ms latency!`,
                        )
                      }}
                      className="px-4 py-2 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                    >
                      Save SLA Rules
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 6. MEMORY VIEW */}
            {activeTab === "memory" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-200">
                  <h2 className="text-[16px] font-bold text-slate-900">
                    Persistent Agent Memory
                  </h2>
                  <p className="text-xs text-slate-500">
                    Configure how this agent retains context across multi-turn
                    sessions.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => {
                      setMemoryMode("vector")
                      showToast("Switched to Episodic Vector Store (Long-term)")
                    }}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      memoryMode === "vector"
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600"
                    }`}
                  >
                    Episodic Vector Store (Long-term)
                  </button>
                  <button
                    onClick={() => {
                      setMemoryMode("session")
                      showToast("Switched to Session Ephemeral (Short-term)")
                    }}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      memoryMode === "session"
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-600"
                    }`}
                  >
                    Session Ephemeral (Short-term)
                  </button>
                </div>

                {/* Add memory rule form */}
                <form onSubmit={handleAddMemory} className="flex gap-2">
                  <input
                    type="text"
                    value={newMemoryText}
                    onChange={(e) => setNewMemoryText(e.target.value)}
                    placeholder="Add user rule or persistent fact (e.g. Always reply in English)..."
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg shrink-0 transition-colors shadow-2xs"
                  >
                    Add Context
                  </button>
                </form>

                <div className="space-y-1.5">
                  <h4 className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Learned User Context ({memoryItems.length})
                  </h4>
                  {memoryItems.map((mem, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-700 shadow-2xs"
                    >
                      <span>{mem}</span>
                      <button
                        onClick={() => {
                          setMemoryItems((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                          showToast("Context rule removed")
                        }}
                        className="text-slate-500 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. VARIABLES VIEW */}
            {activeTab === "variables" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-200">
                  <h2 className="text-[16px] font-bold text-slate-900">
                    Environment Variables
                  </h2>
                  <p className="text-xs text-slate-500">
                    Inject dynamic runtime values or sensitive secrets into
                    agent tools.
                  </p>
                </div>

                <form onSubmit={handleAddVariable} className="flex gap-2">
                  <input
                    type="text"
                    value={newVarKey}
                    onChange={(e) => setNewVarKey(e.target.value)}
                    placeholder="VARIABLE_NAME"
                    className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono uppercase outline-none focus:border-slate-900"
                  />
                  <input
                    type="text"
                    value={newVarVal}
                    onChange={(e) => setNewVarVal(e.target.value)}
                    placeholder="Value"
                    className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg shrink-0"
                  >
                    Add
                  </button>
                </form>

                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-left">
                      <tr>
                        <th className="p-3">Variable</th>
                        <th className="p-3">Value</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {variables.map((v, i) => (
                        <tr key={i}>
                          <td className="p-3 font-mono font-bold text-slate-800">
                            {v.key}
                          </td>
                          <td className="p-3 font-mono text-slate-500">
                            {v.val}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => {
                                setVariables((prev) =>
                                  prev.filter((_, idx) => idx !== i),
                                )
                                showToast(`Deleted ${v.key}`)
                              }}
                              className="text-slate-500 hover:text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. ADVANCED VIEW */}
            {activeTab === "advanced" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-200">
                  <h2 className="text-[16px] font-bold text-slate-900">
                    Model Parameters & Runtime Guardrails
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fine-tune model sampling and temperature.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 block">
                      Foundation Model
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => {
                        setSelectedModel(e.target.value)
                        showToast(`Switched to ${e.target.value}`)
                      }}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none"
                    >
                      <option>GPT-5.4 Luna (Recommended)</option>
                      <option>Claude 3.5 Sonnet</option>
                      <option>Lyzr Enterprise v2</option>
                      <option>Llama 3.3 70B</option>
                    </select>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Sampling Temperature
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {temperature}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.0"
                      max="1.0"
                      step="0.05"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full accent-[#be4c3f]"
                    />
                    <p className="text-[11px] text-slate-500">
                      Lower values produce deterministic, precise answers.
                      Higher values increase creativity.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Max Token Limit
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {maxTokens}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="512"
                      max="8192"
                      step="256"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(Number(e.target.value))}
                      className="w-full accent-[#be4c3f]"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        handleSave()
                        showToast(
                          `Saved: ${selectedModel} (Temp: ${temperature}, MaxTokens: ${maxTokens})`,
                        )
                      }}
                      className="px-4 py-2 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                    >
                      Save Parameters
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 9. NEED HELP VIEW */}
            {activeTab === "help" && (
              <div className="space-y-3">
                <div className="pb-3 border-b border-slate-200">
                  <h2 className="text-[16px] font-bold text-slate-900">
                    Developer Documentation & Quickstart
                  </h2>
                  <p className="text-xs text-slate-500">
                    Guides, video walkthroughs, and code samples.
                  </p>
                </div>
                {[
                  {
                    title: "Building Autonomous Agent Pipelines",
                    time: "4 min read",
                    tag: "Guide",
                  },
                  {
                    title: "Connecting OAuth Tools: Slack, Gmail, Linear",
                    time: "6 min read",
                    tag: "Integrations",
                  },
                  {
                    title: "Deterministic RAG & Vector Chunk Optimization",
                    time: "5 min read",
                    tag: "Architecture",
                  },
                ].map((doc, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      showToast(`Opening documentation: "${doc.title}"`)
                    }
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/50 transition-all flex items-center justify-between shadow-2xs cursor-pointer group"
                  >
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold mb-1 inline-block border border-slate-200">
                        {doc.tag}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-black transition-colors">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {doc.time}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-black" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= OPTIONAL COLLAPSIBLE RIGHT DRAWER ================= */}
        {showRightDrawer === "copilot" && (
          <div className="shrink-0 w-[420px] border-l border-slate-200 flex flex-col bg-white shadow-xl transition-all">
            <InventChatPanel
              onClose={() => setShowRightDrawer(null)}
              onApplyInstructions={handleApplyInstructions}
              currentInstructions={instructions}
              agentName={agentTitle}
            />
          </div>
        )}

        {showRightDrawer === "summary" && (
          <div className="shrink-0 w-[320px] border-l border-slate-200 flex flex-col overflow-y-auto bg-white p-4 space-y-3.5 select-none">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                Configuration
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowRightDrawer("copilot")}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold border border-slate-200 transition-colors"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#be4c3f]" />
                  <span>Copilot</span>
                </button>
                <button
                  onClick={() => setShowRightDrawer(null)}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 1. MODEL — keep it at top with model name, provider, dropdown & settings */}
            <div className="border border-slate-200 rounded-xl bg-white p-3 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Model
                </span>
                <button
                  onClick={() => setIsModelSettingsOpen(!isModelSettingsOpen)}
                  className={`p-1 rounded-md transition-colors ${
                    isModelSettingsOpen
                      ? "text-[#be4c3f] bg-[#fdf2f0]"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                  }`}
                  title="Model Settings Controls"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Model Name, Provider & Dropdown Trigger */}
              <div className="flex items-center justify-between p-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 cursor-pointer transition-all group">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-[#fdf2f0] border border-[#f5d0cb] flex items-center justify-center text-[#be4c3f] shrink-0">
                    <Box className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate group-hover:text-[#be4c3f] transition-colors">
                      {selectedModel}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      Provider:{" "}
                      <span className="text-slate-700 font-semibold">
                        Pick for me
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700 shrink-0 ml-1" />
              </div>

              {/* Model Settings Controls */}
              {isModelSettingsOpen && (
                <div className="pt-2.5 border-t border-slate-100 space-y-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 font-medium">
                        Temperature
                      </span>
                      <span className="text-slate-900 font-mono font-semibold">
                        {temperature}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={temperature}
                      onChange={(e) =>
                        setTemperature(parseFloat(e.target.value))
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
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value))}
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
                <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-2">
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
                    {documents.length} Sources
                  </span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsKnowledgeOpen(true)
                      const newDoc: KnowledgeDocItem = {
                        id: `k${Date.now()}`,
                        name: `New_Source_${documents.length + 1}.pdf`,
                        size: "1.2 MB",
                        chunks: "12 Chunks",
                        status: "Indexed",
                        type: "PDF",
                      }
                      setDocuments((prev) => [...prev, newDoc])
                      showToast(`Added knowledge source: ${newDoc.name}`)
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
                <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-2">
                  <div className="space-y-1.5 pt-2">
                    {documents.map((src) => (
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
                              setDocuments((prev) =>
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
                    onClick={() => setActiveTab("knowledge")}
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-[#be4c3f] bg-white hover:bg-[#fdf2f0] border border-dashed border-[#f5d0cb] rounded-lg transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Manage Knowledge Store</span>
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
                    {toolsList.filter((t) => t.enabled).length} Connected
                  </span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsToolsOpen(true)
                      setModalOpen("addTool")
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
                <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-2">
                  <div className="space-y-1.5 pt-2">
                    {toolsList.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-slate-800 font-medium truncate flex items-center gap-2">
                            <span className="shrink-0 flex items-center justify-center">
                              {renderToolIcon(tool.name, "w-3.5 h-3.5")}
                            </span>
                            <span>{tool.name}</span>
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
                            setToolsList((prev) =>
                              prev.map((t) =>
                                t.name === tool.name
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
                    onClick={() => setModalOpen("addTool")}
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
                    {skillsList.length} Added
                  </span>
                </button>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsSkillsOpen(true)
                      const newSkill = {
                        id: `s${Date.now()}`,
                        name: `Workflow Skill ${skillsList.length + 1}`,
                        enabled: true,
                      }
                      setSkillsList((prev) => [...prev, newSkill])
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
                <div className="p-3 pt-0 border-t border-slate-100 bg-slate-50/40 space-y-2">
                  <div className="space-y-1.5 pt-2">
                    {skillsList.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                      >
                        <span className="text-slate-800 font-medium truncate">
                          {skill.name}
                        </span>
                        <button
                          onClick={() => {
                            setSkillsList((prev) =>
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
                        name: `Workflow Skill ${skillsList.length + 1}`,
                        enabled: true,
                      }
                      setSkillsList((prev) => [...prev, newSkill])
                      showToast("Created new skill")
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
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Zap className="w-3.5 h-3.5 text-slate-500" />
                  <span>Automation</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {schedulesList.length + triggersList.length} active
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
                    setSchedulesList((prev) => [...prev, newSch])
                    showToast("Added schedule: Daily at 9:00 AM")
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors shadow-2xs group"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#be4c3f]" />
                  <span>+ Schedule</span>
                </button>

                <button
                  onClick={() => setModalOpen("addTrigger")}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-xs font-semibold text-slate-700 transition-colors shadow-2xs group"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>+ Trigger</span>
                </button>
              </div>

              {/* Active Automations List */}
              <div className="space-y-1.5 pt-0.5">
                {schedulesList.map((sch) => (
                  <div
                    key={sch.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-200 text-xs"
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
                          setSchedulesList((prev) =>
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
                {triggersList.map((trig) => (
                  <div
                    key={trig.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-medium text-slate-800 truncate">
                        {trig.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-1">
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                        Active
                      </span>
                      <button
                        onClick={() =>
                          setTriggersList((prev) =>
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
            </div>

            {/* 7. FEATURES — compact feature cards such as Memory, Data Query and Responsible AI */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Features
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  3 active
                </span>
              </div>

              <div className="space-y-2">
                {/* Memory Card */}
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#fdf2f0] border border-[#f5d0cb] flex items-center justify-center text-[#be4c3f] shrink-0">
                      <Brain className="w-3.5 h-3.5 text-[#be4c3f]" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        Memory
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight truncate">
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
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        Data Query
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight truncate">
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
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        Responsible AI
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight truncate">
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
                        isResponsibleAIEnabled
                          ? "translate-x-3"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Fast Test Action */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => onNavigateTab && onNavigateTab("run")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold shadow-2xs transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Test & Run Live Agent</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#be4c3f] text-white px-4 py-2.5 rounded-lg shadow-2xl text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Add Custom Tool Modal */}
      {modalOpen === "addTool" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Add Custom API Tool
              </h3>
              <button
                onClick={() => setModalOpen(null)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateCustomTool} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tool Name
                </label>
                <input
                  type="text"
                  required
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  placeholder="e.g. Jira Issue Creator"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={newToolIcon}
                  onChange={(e) => setNewToolIcon(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newToolDesc}
                  onChange={(e) => setNewToolDesc(e.target.value)}
                  placeholder="What this tool does and when to invoke it"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg"
                >
                  Create Tool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Trigger Modal */}
      {modalOpen === "addTrigger" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Configure Autonomous Trigger
              </h3>
              <button
                onClick={() => setModalOpen(null)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTrigger} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trigger Name
                </label>
                <input
                  type="text"
                  required
                  value={newTrgName}
                  onChange={(e) => setNewTrgName(e.target.value)}
                  placeholder="e.g. GitHub Pull Request Opened"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trigger Type
                </label>
                <select
                  value={newTrgType}
                  onChange={(e) => setNewTrgType(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none"
                >
                  <option>Webhook (HTTP POST)</option>
                  <option>Scheduled Cron</option>
                  <option>Gmail Inbound Event</option>
                  <option>Slack Channel Event</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trigger Details / Schedule
                </label>
                <input
                  type="text"
                  value={newTrgDetail}
                  onChange={(e) => setNewTrgDetail(e.target.value)}
                  placeholder="e.g. Every hour on the hour, or webhook payload filter"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:border-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg"
                >
                  Save Trigger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Trigger Modal */}
      {modalOpen === "editTrigger" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Active Trigger: Gmail Inbound
              </h3>
              <button
                onClick={() => setModalOpen(null)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs text-slate-700">
              <p>
                <strong>Filter Subject:</strong> <code>[Urgent]</code>,{" "}
                <code>[Escalation]</code>
              </p>
              <p>
                <strong>Connected Account:</strong> ops-bot@company.com (OAuth
                2.0 Active)
              </p>
              <p>
                <strong>Action:</strong> Dispatches agent execution with email
                body and sender metadata.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-[11px] text-slate-600">
                Webhook Status: Healthy (200 OK) • 14 events handled in last 24h
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 mt-3">
              <button
                onClick={() => setModalOpen(null)}
                className="px-4 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
