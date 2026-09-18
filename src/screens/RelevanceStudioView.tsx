import React, { useState, useRef, useEffect } from "react"
import ModelSelectionModal from "../components/ModelSelectionModal"
import ShareModal from "../components/ShareModal"
import DeployModal from "../components/DeployModal"
import {
  Wrench,
  Database,
  Send,
  Check,
  X,
  UploadCloud,
  ChevronRight,
  Monitor,
  Terminal,
  HelpCircle,
  FileText,
  Bot,
  Wand2,
} from "lucide-react"
import FormattedChatMessage from "../components/FormattedChatMessage"
import AiOrb from "../components/AiOrb"

const a = "/assets"

interface RelevanceStudioViewProps {
  onNavigateTab?: (tab: "build" | "run" | "evaluate") => void
  onHomeClick?: () => void
}

interface ChatMessage {
  id: string
  sender: "copilot" | "user"
  text: string
  time: string
}

export default function RelevanceStudioView({
  onNavigateTab,
  onHomeClick,
}: RelevanceStudioViewProps) {
  const avatarImg = `${a}/4105f.svg`

  // Core Agent State
  const [agentTitle, setAgentTitle] = useState("Untitled agent")
  const [agentDescription, setAgentDescription] = useState(
    "Give this agent a short description...",
  )
  const [selectedModel, setSelectedModel] = useState(
    "Performance-optimized Model",
  )
  const [isSaved, setIsSaved] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Center Mode: 'test' (Screenshots 1, 2, 3) or 'setup' (Screenshot 4)
  const [centerMode, setCenterMode] = useState<"test" | "setup">("test")

  // Right Drawer: open or closed (Screenshot 1 vs Screenshot 3)
  const [isCopilotOpen, setIsCopilotOpen] = useState(true)

  // Prompt / Goal & Rules State
  const [goalText, setGoalText] = useState(
    "Edit this text to describe how your agent should work...",
  )
  const [rules, setRules] = useState<string[]>([
    "Always respond using markdown formatting.",
    "Make sure you always...",
    "Make sure you never...",
  ])
  const [newRuleInput, setNewRuleInput] = useState("")

  // Test Runner State
  const [testPrompt, setTestPrompt] = useState("")
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [testCredits, setTestCredits] = useState(0) // 0/0 credits as in reference

  // Copilot Chat State
  const [copilotMessages, setCopilotMessages] = useState<ChatMessage[]>([])
  const [copilotInput, setCopilotInput] = useState("")
  const [isCopilotThinking, setIsCopilotThinking] = useState(false)
  const copilotEndRef = useRef<HTMLDivElement>(null)

  // Modals State
  const [isModelModalOpen, setIsModelModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [activeConfigModal, setActiveConfigModal] =
    useState<"triggers" | "tools" | "knowledge" | "variables" | null>(null)

  // Tools & Integrations State
  const [toolsList, setToolsList] = useState([
    {
      name: "Google Drive",
      desc: "Read and create docs & sheets",
      enabled: true,
      icon: "📁",
    },
    {
      name: "Slack",
      desc: "Send channel messages and direct alerts",
      enabled: true,
      icon: "💬",
    },
    {
      name: "Microsoft Office 365",
      desc: "Sync emails and outlook calendar",
      enabled: true,
      icon: "🏢",
    },
    {
      name: "Web Search",
      desc: "Real-time web browsing & scraping",
      enabled: false,
      icon: "🔍",
    },
  ])

  // Knowledge Documents
  const [documents, setDocuments] = useState([
    {
      name: "Product_FAQ_and_Capabilities.pdf",
      size: "1.4 MB",
      status: "Indexed",
    },
    { name: "Sales_Enablement_Guide.md", size: "320 KB", status: "Indexed" },
  ])

  // Triggers
  const [triggers, setTriggers] = useState([
    {
      name: "Inbound Email Trigger",
      type: "Gmail / Office",
      detail: "When email received matching keyword [Urgent]",
      active: true,
    },
    {
      name: "Scheduled Daily Digest",
      type: "Cron Pulse",
      detail: "Runs every morning at 09:00 AM EST",
      active: true,
    },
  ])

  // Variables
  const [variables, setVariables] = useState([
    { key: "COMPANY_NAME", val: "Acme Enterprise" },
    { key: "SUPPORT_EMAIL", val: "support@acme.com" },
  ])
  const [newVarKey, setNewVarKey] = useState("")
  const [newVarVal, setNewVarVal] = useState("")

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleSave = () => {
    setIsSaved(true)
    showToast("Changes saved successfully")
    setTimeout(() => setIsSaved(false), 2000)
  }

  // Run Test Task in Center Panel
  const handleExecuteTestTask = () => {
    if (!testPrompt.trim() && testCredits === 0) {
      setIsUpgradeModalOpen(true)
      return
    }
    setIsTestRunning(true)
    setTestResult(null)

    setTimeout(() => {
      setTestResult(
        `### Agent Test Execution Complete\n\n- Model: ${selectedModel}\n- Instructions Enforced: ${rules.length} markdown constraints verified\n- Output Status: Task completed with zero schema violations.`,
      )
      setIsTestRunning(false)
    }, 1100)
  }

  // Send Copilot Message
  const handleSendCopilot = (textToSend?: string) => {
    const text = (textToSend || copilotInput).trim()
    if (!text || isCopilotThinking) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setCopilotMessages((prev) => [...prev, userMsg])
    if (!textToSend) setCopilotInput("")
    setIsCopilotThinking(true)

    setTimeout(() => {
      let reply = ""
      if (text.toLowerCase().includes("test coverage")) {
        reply =
          "Recommended 4 test assertions added: tone consistency check, JSON schema conformance, and PII protection for email bodies."
      } else if (text.toLowerCase().includes("production monitoring")) {
        reply =
          "Configured SLA alerting rule: Slack notification will trigger if latency exceeds 2,500ms or error rate breaches 5%."
      } else {
        reply = `Analyzed instructions for ${selectedModel}. System prompt calibrated for deterministic tool execution and reduced hallucination risk.`
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "copilot",
        text: reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      setCopilotMessages((prev) => [...prev, botMsg])
      setIsCopilotThinking(false)
    }, 900)
  }

  useEffect(() => {
    copilotEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [copilotMessages, isCopilotThinking])

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-800 antialiased select-none">
      {/* ================= 1. TOP GLOBAL HEADER ================= */}
      <header className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Logo, Divider, Avatar, Title, Unpublished badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onHomeClick}
            className="flex items-center hover:opacity-80 transition-opacity"
            title="All Agents Directory"
          >
            <img
              src="/Logo.webp"
              alt="Logo"
              className="h-5 w-auto object-contain"
            />
          </button>
          <div className="h-3.5 w-px bg-slate-200" />

          {/* Rounded light-blue square with pixel art avatar */}
          <div className="w-7 h-7 rounded-md bg-[#DBE5FF] flex items-center justify-center overflow-hidden border border-slate-300/80 shrink-0">
            <img
              src={avatarImg}
              alt="Agent Avatar"
              className="w-4 h-4 object-contain"
            />
          </div>

          <input
            type="text"
            value={agentTitle}
            onChange={(e) => setAgentTitle(e.target.value)}
            className="font-semibold text-slate-900 text-xs bg-transparent border border-transparent hover:border-slate-200 focus:border-slate-900 focus:bg-white rounded px-1.5 py-0.5 outline-none transition-all"
          />

          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-200 bg-white text-[11px] text-slate-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Unpublished</span>
          </div>
        </div>

        {/* Center: Build / Run / Evaluate segmented control */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
          <button
            onClick={() => onNavigateTab && onNavigateTab("build")}
            className="px-4 py-1 rounded text-xs font-semibold bg-white text-slate-900 shadow-2xs transition-all"
          >
            Build
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab("run")}
            className="px-4 py-1 rounded text-xs font-medium text-slate-600 hover:text-slate-900 transition-all"
          >
            Run
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab("evaluate")}
            className="px-4 py-1 rounded text-xs font-medium text-slate-600 hover:text-slate-900 transition-all"
          >
            Evaluate
          </button>
        </div>

        {/* Right: Share, Save, Publish */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md border border-transparent hover:border-slate-200 transition-colors"
          >
            Share
          </button>

          <button
            onClick={handleSave}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md border border-transparent hover:border-slate-200 transition-colors"
          >
            {isSaved ? "Saved ✓" : "Save"}
          </button>

          <button
            onClick={() => setIsDeployModalOpen(true)}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#be4c3f] hover:bg-[#a83e32] rounded-md transition-colors shadow-2xs"
          >
            Publish
          </button>
        </div>
      </header>

      {/* ================= 2. MAIN 3-PANEL BODY ================= */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* ================= LEFT PANEL: AGENT PROMPT & DEFINITION ================= */}
        <div className="w-[320px] lg:w-[350px] shrink-0 border-r border-slate-200 bg-white flex flex-col overflow-y-auto p-5 space-y-5">
          {/* Agent Identity Card */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-[#DBE5FF] flex items-center justify-center overflow-hidden border border-slate-300/80 shrink-0">
              <img
                src={avatarImg}
                alt="Avatar"
                className="w-6 h-6 object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-slate-900 text-xs tracking-tight">
                {agentTitle}
              </h2>
              <input
                type="text"
                value={agentDescription}
                onChange={(e) => setAgentDescription(e.target.value)}
                placeholder="Give this agent a short description..."
                className="w-full text-xs text-slate-700 placeholder:text-slate-500 bg-transparent outline-none border-b border-transparent hover:border-slate-200 focus:border-slate-900 py-0.5 mt-0.5"
              />
            </div>
          </div>

          {/* Quick Action Buttons Row matching reference */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setIsModelModalOpen(true)}
              className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium hover:border-slate-300 transition-colors"
            >
              {selectedModel}
            </button>

            <button
              onClick={() => setIsCopilotOpen(true)}
              className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium hover:border-slate-300 transition-colors"
            >
              Refine with AI
            </button>

            <button
              onClick={() =>
                setCenterMode(centerMode === "test" ? "setup" : "test")
              }
              className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                centerMode === "test"
                  ? "bg-slate-100 text-slate-900 border-slate-300 font-semibold"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
              }`}
            >
              {centerMode === "test" ? "Setup Cards" : "Test agent"}
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab("evaluate")}
              className="px-2.5 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium hover:border-slate-300 transition-colors"
            >
              Run Evals
            </button>
          </div>

          {/* Section: Goal */}
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-xs">Goal</h3>
            <textarea
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              className="w-full text-xs text-slate-800 leading-relaxed outline-none border border-slate-200 hover:border-slate-300 focus:border-slate-900 rounded-md p-2.5 resize-none min-h-[65px] bg-white transition-colors"
              placeholder="Edit this text to describe how your agent should work..."
            />
          </div>

          {/* Section: Tools */}
          <div className="space-y-1.5">
            <h3 className="font-semibold text-slate-900 text-xs">Tools</h3>
            <p className="text-xs text-slate-600">
              Type '/' to mention tools in your instructions.
            </p>

            {/* Comment callout block */}
            <div className="p-3 rounded-md border border-slate-200 bg-slate-50/50 text-xs text-slate-600 italic">
              You can also add comments like this that don't get sent to the
              agent.
            </div>
          </div>

          {/* Section: Rules */}
          <div className="space-y-2">
            <h3 className="font-semibold text-slate-900 text-xs">Rules</h3>

            {/* Guidance callout block */}
            <div className="p-3 rounded-md border border-slate-200 bg-slate-50/50 text-xs text-slate-600 italic">
              If your agent isn't working like you want it to, prompting is how
              can you guide it!
            </div>

            {/* Bulleted rules list */}
            <div className="space-y-1.5 text-xs text-slate-700">
              {rules.map((r, idx) => (
                <div key={idx} className="flex items-start gap-2 group">
                  <span className="text-slate-500 font-bold">•</span>
                  <input
                    type="text"
                    value={r}
                    onChange={(e) => {
                      const val = e.target.value
                      setRules((prev) =>
                        prev.map((item, i) => (i === idx ? val : item)),
                      )
                    }}
                    className="flex-1 bg-transparent outline-none border-b border-transparent hover:border-slate-200 focus:border-slate-900"
                  />
                  <button
                    onClick={() =>
                      setRules((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-600 p-0.5 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              {/* Add rule input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!newRuleInput.trim()) return
                  setRules((prev) => [...prev, newRuleInput.trim()])
                  setNewRuleInput("")
                  showToast("Added new rule")
                }}
                className="flex items-center gap-2 pt-0.5"
              >
                <span className="text-slate-500 font-bold">•</span>
                <input
                  type="text"
                  value={newRuleInput}
                  onChange={(e) => setNewRuleInput(e.target.value)}
                  placeholder="Add another rule..."
                  className="flex-1 text-xs bg-transparent outline-none placeholder:text-slate-500"
                />
              </form>
            </div>
          </div>
        </div>

        {/* ================= CENTER PANEL: DUAL MODE ================= */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-white p-8 min-w-0">
          {centerMode === "setup" ? (
            /* ============ MODE A: SETUP CARDS (Matching Screenshot 4) ============ */
            <div className="w-full max-w-2xl mx-auto space-y-3.5">
              {/* 1. Triggers Card */}
              <div
                onClick={() => setActiveConfigModal("triggers")}
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 text-xs">
                    Triggers
                  </h3>
                  <div className="flex items-center gap-2 text-base">
                    <span>✉️</span>
                    <span>💬</span>
                    <span>📁</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add triggers to automatically start your agent based on events
                  like emails, schedules, or webhooks.
                </p>
              </div>

              {/* 2. Tools Card */}
              <div
                onClick={() => setActiveConfigModal("tools")}
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 text-xs">
                    Tools
                  </h3>
                  <div className="flex items-center gap-2 text-base">
                    <span>📁</span>
                    <span>💬</span>
                    <span>🏢</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Add tools to give your agents the ability to perform actions
                  or connect with integrations.
                </p>
              </div>

              {/* 3. Knowledge Card */}
              <div
                onClick={() => setActiveConfigModal("knowledge")}
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group space-y-2.5"
              >
                <h3 className="font-semibold text-slate-900 text-xs">
                  Knowledge
                </h3>
                <div className="border border-dashed border-slate-200 rounded-md p-5 text-center bg-slate-50/50">
                  <p className="text-xs font-semibold text-slate-700">
                    Drag & drop files
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Import data to teach your agents about new topics.
                  </p>
                </div>
              </div>

              {/* 4. Variables Card */}
              <div
                onClick={() => setActiveConfigModal("variables")}
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer group space-y-2.5"
              >
                <h3 className="font-semibold text-slate-900 text-xs">
                  Variables
                </h3>
                <div className="border border-slate-200 rounded-md p-3.5 bg-slate-50/40 text-xs text-slate-600 flex items-center justify-between">
                  <span>
                    Want to reuse values throughout your agent? Turn them into a
                    variable with
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                    <span>⌘ + \</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ============ MODE B: LIVE TEST RUNNER (Matching Screenshots 1, 2, 3) ============ */
            <div className="w-full max-w-2xl mx-auto space-y-5">
              {/* Agent Title & Prompting sub-header */}
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-10 h-10 rounded-md bg-[#DBE5FF] flex items-center justify-center overflow-hidden border border-slate-300/80">
                  <img
                    src={avatarImg}
                    alt="Agent Avatar"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <h2 className="font-bold text-slate-900 text-sm">
                  {agentTitle}
                </h2>
                <p className="text-xs text-slate-600">
                  Try sending a test task to this agent...
                </p>
              </div>

              {/* Describe task interactive input card */}
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-white focus-within:border-slate-400 transition-colors">
                <textarea
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  placeholder={`Describe task for ${agentTitle} to work on`}
                  className="w-full p-3.5 text-xs text-slate-800 placeholder:text-slate-500 leading-relaxed outline-none min-h-[90px] resize-none"
                />

                <div className="px-3.5 py-2 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button className="text-slate-600 hover:text-slate-900 text-[11px] font-medium">
                    Help
                  </button>

                  <button
                    onClick={handleExecuteTestTask}
                    disabled={isTestRunning}
                    className="px-3 py-1.5 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors"
                  >
                    {isTestRunning ? "Running task..." : "Start a new task"}
                  </button>
                </div>
              </div>

              {/* Task Result */}
              {testResult && (
                <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                  {testResult}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL: INVENT COPILOT DRAWER ================= */}
        {isCopilotOpen ? (
          <div className="w-[320px] lg:w-[350px] shrink-0 border-l border-slate-200 bg-white flex flex-col justify-between overflow-hidden transition-all relative">
            {/* Top Header */}
            <div>
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <span className="font-semibold text-slate-900 text-xs">
                  History
                </span>
                <button
                  onClick={() => setIsCopilotOpen(false)}
                  className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                  title="Collapse panel"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Red credit alert box */}
              <div className="m-3.5 p-3.5 rounded-lg bg-rose-50 border border-rose-200/80 space-y-1.5">
                <h4 className="font-semibold text-rose-900 text-xs">
                  You have no credits left
                </h4>
                <p className="text-[11px] text-rose-700 leading-relaxed">
                  You've used up all your credits. Upgrade or purchase more
                  credits to continue running tasks.
                </p>
                <button
                  onClick={() => {
                    setTestCredits(2500)
                    showToast("Account credits refilled")
                  }}
                  className="px-3 py-1.5 rounded-md bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-medium transition-colors mt-1 shadow-2xs"
                >
                  Upgrade your account
                </button>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {/* How can I help? Speech bubble with Bot icon */}
              <div className="flex items-start gap-2.5 mt-2">
                <AiOrb size="sm" animate={true} className="shrink-0" />
                <div className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800">
                  How can I help?
                </div>
              </div>

              {/* Suggestion Options List (Plain text rows, no pill buttons) */}
              <div className="space-y-1 pl-9">
                {[
                  "Add test coverage",
                  "Add production monitoring",
                  "Get detailed recommendations",
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSendCopilot(chip)}
                    className="block text-left text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-2 py-1.5 rounded-md transition-colors font-medium w-full truncate"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Messages list */}
              {copilotMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-start ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  {msg.sender === "copilot" ? (
                    <AiOrb
                      size="sm"
                      animate={true}
                      className="shrink-0 select-none mt-0.5"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#be4c3f] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-xs ring-2 ring-white select-none">
                      SS
                    </div>
                  )}

                  <div
                    className={`flex flex-col gap-1 max-w-[85%] ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 px-1 text-[10px] text-slate-500 font-medium">
                      <span className="font-semibold text-slate-700">
                        {msg.sender === "user" ? "You" : "Invent Copilot"}
                      </span>
                      <span>•</span>
                      <span>{msg.time}</span>
                    </div>

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-slate-900 text-white rounded-tr-xs shadow-xs font-normal whitespace-pre-wrap"
                          : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs space-y-2 w-full"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        msg.text
                      ) : (
                        <>
                          <FormattedChatMessage text={msg.text} />
                          <button
                            onClick={() => {
                              setGoalText(
                                (prev) =>
                                  `${prev}\n\n- Verified strict schema checks\n- Validated external source references`,
                              )
                              showToast("Applied recommendations to Goal")
                            }}
                            className="mt-2 text-[11px] font-semibold text-white bg-[#be4c3f] hover:bg-[#a83e32] px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                          >
                            <Wand2 className="w-3 h-3" />
                            <span>Apply to Agent Instructions</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isCopilotThinking && (
                <div className="flex gap-2.5 items-center pl-1 text-xs text-slate-600 font-medium animate-fadeIn">
                  <AiOrb
                    size="sm"
                    animate={true}
                    isThinking={true}
                    className="shrink-0"
                  />
                  <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-[11px] text-slate-600 flex items-center gap-2 shadow-xs">
                    <div className="w-2.5 h-2.5 border-2 border-[#be4c3f] border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>Synthesizing response...</span>
                  </div>
                </div>
              )}
              <div ref={copilotEndRef} />
            </div>

            {/* Bottom input area matching reference */}
            <div className="p-3 border-t border-slate-200 bg-white space-y-2">
              <div className="border border-slate-200 focus-within:border-[#be4c3f] focus-within:ring-2 focus-within:ring-[#be4c3f]/15 rounded-xl flex items-center px-3 py-2 bg-white shadow-xs transition-all">
                <input
                  type="text"
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSendCopilot()
                  }
                  placeholder="Create with Invent..."
                  className="flex-1 text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
                />
                <button
                  onClick={() => handleSendCopilot()}
                  disabled={!copilotInput.trim()}
                  className="p-1 text-slate-500 hover:text-[#be4c3f] disabled:text-slate-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
                <span>Allow GPT 5.6 Luna</span>
                <button className="text-[#be4c3f] font-semibold hover:underline cursor-pointer">
                  Connect
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Collapsed toggle handle */
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="w-4 bg-slate-50 hover:bg-slate-100 border-l border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
            title="Open Invent Copilot"
          >
            <span className="text-[10px] font-mono select-none">||</span>
          </button>
        )}
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#be4c3f] text-white px-3.5 py-2 rounded-md text-xs font-medium shadow-md animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= MODALS ================= */}
      <ModelSelectionModal
        isOpen={isModelModalOpen}
        onClose={() => setIsModelModalOpen(false)}
        selectedModelName={selectedModel}
        onSelectModel={(name) => {
          setSelectedModel(name)
          showToast(`Agent model updated to ${name}`)
        }}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        agentTitle={agentTitle}
      />

      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        agentTitle={agentTitle}
      />

      {/* Configuration Modals (Clean, flat enterprise modals) */}
      {activeConfigModal === "tools" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-semibold text-slate-900 text-xs">
                Agent Tools & Integrations
              </h3>
              <button
                onClick={() => setActiveConfigModal(null)}
                className="p-1 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 mb-3.5">
              {toolsList.map((t, idx) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between p-3 rounded-md border border-slate-200 bg-white"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{t.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">
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
                        showToast(`${t.name} toggled`)
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-7 h-4 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-slate-900"></div>
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveConfigModal(null)}
              className="w-full py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-medium rounded-md shadow-2xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {activeConfigModal === "triggers" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-semibold text-slate-900 text-xs">
                Autonomous Triggers
              </h3>
              <button
                onClick={() => setActiveConfigModal(null)}
                className="p-1 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 mb-3.5">
              {triggers.map((trg, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-md border border-slate-200 bg-white space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-xs">
                      {trg.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {trg.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{trg.detail}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveConfigModal(null)}
              className="w-full py-1.5 bg-white border border-slate-300 text-slate-800 text-xs font-medium rounded-md hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {activeConfigModal === "knowledge" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-semibold text-slate-900 text-xs">
                Knowledge Base & Files
              </h3>
              <button
                onClick={() => setActiveConfigModal(null)}
                className="p-1 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <label className="border border-dashed border-slate-300 hover:border-slate-400 rounded-md p-5 flex flex-col items-center justify-center cursor-pointer text-center bg-slate-50/50 mb-3">
              <UploadCloud className="w-5 h-5 text-slate-500 mb-1" />
              <span className="text-xs font-semibold text-slate-800">
                Click or drop documents
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 font-medium">
                PDF, DOCX, Markdown, JSON
              </span>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const f = e.target.files[0]
                    setDocuments((prev) => [
                      ...prev,
                      {
                        name: f.name,
                        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
                        status: "Indexed",
                      },
                    ])
                    showToast(`Indexed ${f.name}`)
                  }
                }}
                className="hidden"
              />
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto mb-3">
              {documents.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded border border-slate-200 bg-white text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Database className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{doc.name}</span>
                  </div>
                  <button
                    onClick={() =>
                      setDocuments((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="text-slate-500 hover:text-rose-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveConfigModal(null)}
              className="w-full py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-medium rounded-md shadow-2xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {activeConfigModal === "variables" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-semibold text-slate-900 text-xs">
                Environment Variables
              </h3>
              <button
                onClick={() => setActiveConfigModal(null)}
                className="p-1 text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!newVarKey.trim()) return
                setVariables((prev) => [
                  ...prev,
                  {
                    key: newVarKey.trim().toUpperCase(),
                    val: newVarVal.trim(),
                  },
                ])
                setNewVarKey("")
                setNewVarVal("")
                showToast("Variable added")
              }}
              className="flex gap-2 mb-3"
            >
              <input
                type="text"
                value={newVarKey}
                onChange={(e) => setNewVarKey(e.target.value)}
                placeholder="KEY"
                className="w-1/2 text-xs px-2.5 py-1.5 border border-slate-200 rounded outline-none font-mono uppercase focus:border-slate-900"
              />
              <input
                type="text"
                value={newVarVal}
                onChange={(e) => setNewVarVal(e.target.value)}
                placeholder="Value"
                className="w-1/2 text-xs px-2.5 py-1.5 border border-slate-200 rounded outline-none focus:border-slate-900"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-medium rounded shadow-2xs"
              >
                Add
              </button>
            </form>
            <div className="space-y-1.5 max-h-48 overflow-y-auto mb-3">
              {variables.map((v, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50/50 text-xs font-mono"
                >
                  <span className="font-semibold text-slate-800">{v.key}</span>
                  <span className="text-slate-500">{v.val}</span>
                  <button
                    onClick={() =>
                      setVariables((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="text-slate-500 hover:text-rose-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveConfigModal(null)}
              className="w-full py-1.5 bg-white border border-slate-300 text-slate-800 text-xs font-medium rounded hover:bg-slate-50"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
