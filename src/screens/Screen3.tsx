import React, { useState } from "react"
import Header from "../components/Header"
import InventChatPanel from "../components/InventChatPanel"
import {
  Wrench,
  Database,
  Code2,
  Check,
  Bell,
  Brain,
  Sliders,
  HelpCircle,
  Plus,
  Zap,
  Eye,
  FileText,
  Bot,
  Wand2,
  Columns,
  Maximize2,
  Info,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

const a = "/assets"

interface Screen3Props {
  onNavigateTab?: (tab: "build" | "run" | "evaluate") => void
  onHomeClick?: () => void
}

export default function Screen3({ onNavigateTab, onHomeClick }: Screen3Props) {
  const avatarMask = `${a}/05871.svg`
  const avatarImg = `${a}/d46a9.svg`

  // Active folder tab in left sidebar matching Folder Workspace
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
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // View Layout Mode: 'split' (Context on left, Chat on right) or 'full' (Chat takes full center)
  const [viewMode, setViewMode] = useState<"split" | "full">("split")

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
  const [documents] = useState([
    {
      name: "Enterprise_SOP_2026.pdf",
      size: "2.4 MB",
      chunks: "48 Chunks",
      status: "Indexed",
    },
    {
      name: "Support_FAQ_Handbook.md",
      size: "840 KB",
      chunks: "18 Chunks",
      status: "Indexed",
    },
    {
      name: "API_Schema_v3.json",
      size: "320 KB",
      chunks: "8 Chunks",
      status: "Indexed",
    },
  ])

  // Triggers state
  const [triggersList] = useState([
    {
      name: "Inbound Email Trigger",
      type: "Gmail Event",
      detail: "Subject matches [Urgent] or [Escalation]",
      active: true,
    },
    {
      name: "Daily Standup Cron",
      type: "Scheduled Pulse",
      detail: "Runs weekdays at 09:00 AM UTC",
      active: true,
    },
    {
      name: "Customer Webhook",
      type: "POST /webhook/agent",
      detail: "Payload validated with HMAC-SHA256",
      active: false,
    },
  ])

  // Variables state
  const [variables] = useState([
    { key: "COMPANY_DOMAIN", val: "lyzr.ai" },
    { key: "MAX_RETRIES", val: "3" },
    { key: "SLACK_ALERT_CHANNEL", val: "#agent-ops" },
    { key: "INTERNAL_API_KEY", val: "••••••••••••••••" },
  ])

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

  const toggleTool = (name: string) => {
    setToolsList((prev) =>
      prev.map((t) => (t.name === name ? { ...t, enabled: !t.enabled } : t)),
    )
    showToast(`Updated ${name} status`)
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
      {/* ================= 1. SUBHEADER (ROW 2) MATCHING FOLDER WORKSPACE ================= */}
      <Header
        activeTab="build"
        avatarMask={avatarMask}
        avatarImg={avatarImg}
        agentTitle={agentTitle}
        onTabChange={onNavigateTab}
        onHomeClick={onHomeClick}
      />

      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {/* ================= 2. EXACT 240px LEFT SIDEBAR MATCHING FOLDER WORKSPACE ================= */}
        <div className="shrink-0 w-[240px] border-r border-slate-200 bg-white flex flex-col overflow-y-auto select-none">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#be4c3f] flex items-center justify-center text-white text-xs shadow-2xs">
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

          {/* Bottom Nav: Model Parameters & Help */}
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

          {/* Bottom Agent Profile Card */}
          <div className="mt-auto p-3 border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
              <div className="w-7 h-7 rounded-md bg-[#DBE5FF] flex items-center justify-center border border-slate-300/80 shrink-0">
                <img
                  src={avatarImg}
                  alt="Agent"
                  className="w-4 h-4 object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-slate-900 truncate leading-tight">
                  {agentTitle}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  v2.4.1 • Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. MAIN WORKSPACE WITH VIEW TOGGLE & COPILOT CHAT ================= */}
        <div className="flex flex-1 min-h-0 overflow-hidden bg-white">
          {/* Left Context Column (Visible in 'split' mode) */}
          {viewMode === "split" && (
            <div className="w-1/2 border-r border-slate-200 flex flex-col overflow-y-auto bg-slate-50/30">
              {/* Context Header Bar */}
              <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Active Context
                  </span>
                  <span className="text-xs font-bold text-slate-900 capitalize">
                    / {activeTab}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#fdf2f0] text-[#be4c3f] border border-[#f5d0cb] flex items-center gap-1">
                    <Wand2 className="w-3 h-3 text-[#be4c3f]" />
                    Synced with Copilot
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("full")}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                    title="Expand Copilot to full width"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Focus Chat</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Context Body */}
              <div className="p-5 space-y-4">
                {/* PROMPT CONTEXT */}
                {activeTab === "prompt" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#be4c3f]" />
                          <h3 className="text-xs font-bold text-slate-900">
                            System Prompt & Instructions
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 font-medium">
                          {instructions.length} / 10,000 chars
                        </span>
                      </div>

                      <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        rows={8}
                        className="w-full text-xs font-mono text-slate-800 placeholder:text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#be4c3f] focus:bg-white transition-all leading-relaxed"
                        placeholder="Enter agent persona, guardrails, and deterministic rules..."
                      />

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                          <Info className="w-3.5 h-3.5 text-slate-500" />
                          Edits update Copilot context in real-time
                        </span>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{isSaved ? "Saved ✓" : "Save Changes"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Guardrails Card */}
                    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs">
                      <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Enforced Operational Guardrails</span>
                      </h4>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                        <li>
                          Strict JSON output verification for external tool
                          payloads.
                        </li>
                        <li>
                          Automated PII scrubbing for incoming support tickets.
                        </li>
                        <li>
                          Confidence threshold must exceed 85% for autonomous
                          actions.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* TOOLS CONTEXT */}
                {activeTab === "tools" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900">
                        Connected Agent Tools
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {toolsList.filter((t) => t.enabled).length} Active
                      </span>
                    </div>

                    <div className="space-y-2">
                      {toolsList.map((t) => (
                        <div
                          key={t.name}
                          className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg">{t.icon}</span>
                            <div>
                              <p className="font-bold text-slate-900 text-xs">
                                {t.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {t.desc}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleTool(t.name)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                              t.enabled
                                ? "bg-[#fdf2f0] text-[#be4c3f] border border-[#f5d0cb]"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                          >
                            {t.enabled ? "Active" : "Disabled"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* KNOWLEDGE CONTEXT */}
                {activeTab === "knowledge" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900">
                        Indexed Knowledge Documents
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        3 Files
                      </span>
                    </div>

                    <div className="space-y-2">
                      {documents.map((doc) => (
                        <div
                          key={doc.name}
                          className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <Database className="w-4 h-4 text-[#be4c3f]" />
                            <div>
                              <p className="font-bold text-slate-900 text-xs">
                                {doc.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {doc.size} • {doc.chunks}
                              </p>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[10px] border border-emerald-200">
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TRIGGERS CONTEXT */}
                {activeTab === "triggers" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900">
                        Automation Triggers
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        2 Active
                      </span>
                    </div>

                    <div className="space-y-2">
                      {triggersList.map((trg) => (
                        <div
                          key={trg.name}
                          className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <div>
                              <p className="font-bold text-slate-900 text-xs">
                                {trg.name}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {trg.detail}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full font-semibold text-[10px] border ${
                              trg.active
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}
                          >
                            {trg.active ? "Running" : "Paused"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* VARIABLES CONTEXT */}
                {activeTab === "variables" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900">
                        Environment Variables
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        4 Variables
                      </span>
                    </div>

                    <div className="space-y-2">
                      {variables.map((v) => (
                        <div
                          key={v.key}
                          className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-2xs"
                        >
                          <span className="font-mono text-xs font-bold text-slate-800">
                            {v.key}
                          </span>
                          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {v.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ADVANCED / MODEL CONTEXT */}
                {activeTab === "advanced" && (
                  <div className="space-y-3">
                    <div className="pb-2 border-b border-slate-200">
                      <h3 className="text-xs font-bold text-slate-900">
                        Model Parameters
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Configured runtime inference settings.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">
                          Primary Model
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#fdf2f0] text-[#be4c3f] font-bold text-xs border border-[#f5d0cb]">
                          GPT 5.6 Luna
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">
                          Temperature
                        </span>
                        <span className="font-mono text-xs text-slate-600">
                          0.20 (Deterministic)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700">
                          Max Token Limit
                        </span>
                        <span className="font-mono text-xs text-slate-600">
                          4,096 tokens
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* NEED HELP */}
                {activeTab === "help" && (
                  <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3">
                    <h3 className="text-xs font-bold text-slate-900">
                      Copilot Assistance & Documentation
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ask Copilot on the right anything about writing
                      high-performance prompts, setting up Gmail/Slack triggers,
                      or configuring continuous testing.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() =>
                          handleApplyInstructions(
                            "You are an autonomous operations assistant trained on Enterprise SOPs.",
                          )
                        }
                        className="text-xs font-semibold text-[#be4c3f] hover:underline flex items-center gap-1"
                      >
                        <span>Load standard enterprise SOP template</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Right Column: Copilot Chat Workspace */}
          <div
            className={`${
              viewMode === "split" ? "w-1/2" : "w-full"
            } flex flex-col h-full bg-white relative`}
          >
            {/* If in full mode, provide button to return to split view */}
            {viewMode === "full" && (
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5 text-[#be4c3f]" />
                  Full Copilot Chat Mode
                </span>
                <button
                  onClick={() => setViewMode("split")}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <Columns className="w-3.5 h-3.5 text-[#be4c3f]" />
                  <span>Split View with Workspace Context</span>
                </button>
              </div>
            )}

            {/* InventChatPanel is the core Copilot Chat Engine */}
            <InventChatPanel
              onApplyInstructions={handleApplyInstructions}
              currentInstructions={instructions}
              agentName={agentTitle}
            />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#be4c3f]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
