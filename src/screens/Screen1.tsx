import React, { useState } from "react"
import Header from "../components/Header"
import TemplateCards from "../components/TemplateCards"
import AgentAvatarIcon from "../components/AgentAvatarIcon"
import {
  Bot,
  Wand2,
  Wrench,
  Database,
  Code2,
  Check,
  X,
  Plus,
  Trash2,
  UploadCloud,
  Zap,
} from "lucide-react"

const a = "/assets"

interface Screen1Props {
  onNavigateTab?: (tab: "build" | "run" | "evaluate") => void
  onOpenCopilot?: () => void
  onHomeClick?: () => void
}

export default function Screen1({
  onNavigateTab,
  onOpenCopilot,
  onHomeClick,
}: Screen1Props) {
  const avatarMask = `${a}/05871.svg`
  const avatarImg = `${a}/24f7b.svg`

  const [agentTitle, setAgentTitle] = useState("Research & Operations Agent")
  const [instructions, setInstructions] = useState(
    "You are an autonomous operations assistant. Monitor incoming email triggers and categorize support requests with high confidence.",
  )
  const [isSaved, setIsSaved] = useState(false)
  const [selectedTemplateTitle, setSelectedTemplateTitle] =
    useState("Web Researcher")
  const [modalOpen, setModalOpen] =
    useState<"tools" | "knowledge" | "variables" | "triggers" | null>(null)

  const [tools, setTools] = useState([
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
  ])

  const [documents, setDocuments] = useState([
    { name: "Enterprise_SOP_2026.pdf", size: "2.4 MB", status: "Indexed" },
    { name: "Support_Handbook.md", size: "840 KB", status: "Indexed" },
  ])

  const [variables, setVariables] = useState([
    { key: "COMPANY_DOMAIN", val: "lyzr.ai" },
    { key: "MAX_RETRIES", val: "3" },
  ])

  const [newToolName, setNewToolName] = useState("")
  const [newVarKey, setNewVarKey] = useState("")
  const [newVarVal, setNewVarVal] = useState("")
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleSave = () => {
    setIsSaved(true)
    showToast("Instructions saved successfully!")
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleSelectTemplate = (tmpl: {
    title: string
    prompt: string
    tools: string[]
  }) => {
    setSelectedTemplateTitle(tmpl.title)
    setAgentTitle(tmpl.title)
    setInstructions(tmpl.prompt)
    setTools((prev) =>
      prev.map((t) => ({ ...t, enabled: tmpl.tools.includes(t.name) })),
    )
    showToast(`Loaded ${tmpl.title} template!`)
    handleSave()
  }

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newToolName.trim()) return
    setTools((prev) => [
      ...prev,
      {
        name: newToolName.trim(),
        desc: "Custom user tool",
        enabled: true,
        icon: "⚡",
      },
    ])
    setNewToolName("")
    showToast(`Added ${newToolName}`)
  }

  const handleAddVariable = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVarKey.trim()) return
    setVariables((prev) => [
      ...prev,
      { key: newVarKey.trim().toUpperCase(), val: newVarVal.trim() },
    ])
    setNewVarKey("")
    setNewVarVal("")
    showToast("Added variable")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setDocuments((prev) => [
        {
          name: file.name,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          status: "Indexed",
        },
        ...prev,
      ])
      showToast(`Uploaded & indexed ${file.name}`)
    }
  }

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

      <div className="flex flex-1 min-h-0 w-full">
        {/* Left spacer (48px icon strip - collapsed) */}
        <div className="shrink-0 w-12 border-r border-slate-200 bg-slate-50/50 flex flex-col items-center pt-3 gap-2.5">
          <button
            onClick={onOpenCopilot}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
            title="Open Invent Copilot"
          >
            <Bot className="w-4 h-4" />
          </button>
          <button
            onClick={() => setModalOpen("tools")}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Tools"
          >
            <Wrench className="w-4 h-4" />
          </button>
          <button
            onClick={() => setModalOpen("knowledge")}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Knowledge Base"
          >
            <Database className="w-4 h-4" />
          </button>
          <button
            onClick={() => setModalOpen("variables")}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Variables"
          >
            <Code2 className="w-4 h-4" />
          </button>
        </div>

        {/* Center content */}
        <div className="flex flex-1 flex-col items-center overflow-y-auto py-8 px-6 bg-white">
          <div className="w-full max-w-4xl mx-auto">
            {/* Agent avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#be4c3f] flex items-center justify-center text-white text-xl mb-2 shadow-xs">
                <AgentAvatarIcon className="w-6 h-6 text-white" />
              </div>
              <input
                type="text"
                value={agentTitle}
                onChange={(e) => setAgentTitle(e.target.value)}
                className="font-bold text-slate-900 text-2xl tracking-tight mb-1 text-center bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#be4c3f] outline-none px-2 py-0.5 rounded transition-all"
              />
              <p className="text-slate-500 text-xs leading-5 text-center max-w-[440px]">
                Describe what your agent should do, or start from a verified
                template below.
              </p>
            </div>

            {/* Toolbar row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setModalOpen("tools")}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                >
                  <Wrench className="w-3.5 h-3.5 text-slate-500" />
                  <span>Tools ({tools.filter((t) => t.enabled).length})</span>
                </button>
                <button
                  onClick={() => setModalOpen("knowledge")}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                >
                  <Database className="w-3.5 h-3.5 text-slate-500" />
                  <span>Knowledge ({documents.length})</span>
                </button>
                <button
                  onClick={() => setModalOpen("variables")}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                >
                  <Code2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Variables ({variables.length})</span>
                </button>
              </div>

              {onOpenCopilot && (
                <button
                  onClick={onOpenCopilot}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fdf2f0] hover:bg-[#fceceb] text-[#be4c3f] text-xs font-semibold border border-[#f5d0cb] transition-all shadow-2xs"
                >
                  <Wand2 className="w-3.5 h-3.5 text-[#be4c3f]" />
                  <span>Open Copilot Chat</span>
                </button>
              )}
            </div>

            {/* Instructions textarea */}
            <div className="w-full border border-slate-200 rounded-xl mb-6 overflow-hidden bg-white shadow-2xs focus-within:ring-2 focus-within:ring-[#be4c3f]/10 focus-within:border-[#be4c3f] transition-all">
              <div className="px-4 py-2 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  System Instructions & Tool Behavior
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Markdown supported
                </span>
              </div>
              <textarea
                className="w-full resize-none p-4 text-xs text-slate-800 leading-relaxed outline-none bg-transparent min-h-[160px] font-mono"
                placeholder="Describe your agent's instructions, tone, and tool usage constraints…"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
                <p className="text-xs text-slate-500 font-medium">
                  {instructions.length.toLocaleString()} / 10,000
                </p>
                <div className="flex items-center gap-2">
                  {isSaved && (
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                  <button
                    onClick={handleSave}
                    className="bg-[#be4c3f] hover:bg-[#a83e32] px-4 py-1.5 rounded-lg text-xs font-semibold text-white shadow-2xs transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Template cards section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-slate-900 text-sm tracking-tight">
                  Start from a template
                </p>
                <span className="text-xs text-slate-500 font-medium">
                  Click any card to load configuration
                </span>
              </div>
              <TemplateCards
                selectedTitle={selectedTemplateTitle}
                onSelectTemplate={handleSelectTemplate}
                onAddTools={() => setModalOpen("tools")}
                onAddKnowledge={() => setModalOpen("knowledge")}
                onAddTriggers={() => setModalOpen("triggers")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#be4c3f] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tools Modal */}
      {modalOpen === "tools" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Agent Tools Manager
              </h3>
              <button
                onClick={() => setModalOpen(null)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {tools.map((t, idx) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg">{t.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {t.name}
                      </p>
                      <p className="text-[10px] text-slate-500">{t.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={t.enabled}
                      onChange={() => {
                        setTools((prev) =>
                          prev.map((item, i) =>
                            i === idx
                              ? { ...item, enabled: !item.enabled }
                              : item,
                          ),
                        )
                        showToast(`${t.name} toggled!`)
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#be4c3f]"></div>
                  </label>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddTool} className="flex gap-2">
              <input
                type="text"
                value={newToolName}
                onChange={(e) => setNewToolName(e.target.value)}
                placeholder="New Tool Name..."
                className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#be4c3f]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-xl"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Knowledge Modal */}
      {modalOpen === "knowledge" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Knowledge Base & RAG Index
              </h3>
              <button
                onClick={() => setModalOpen(null)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <label className="border-2 border-dashed border-slate-300 hover:border-[#be4c3f] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center bg-slate-50/50 hover:bg-[#fdf2f0]/30 mb-4">
              <UploadCloud className="w-7 h-7 text-[#be4c3f] mb-1.5" />
              <span className="text-xs font-semibold text-slate-800">
                Click to upload files
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                PDF, DOCX, Markdown, JSON
              </span>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#be4c3f] shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800 truncate max-w-[200px]">
                        {doc.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {doc.size} • {doc.status}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setDocuments((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="text-slate-500 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Variables Modal */}
      {modalOpen === "variables" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Environment Variables
              </h3>
              <button
                onClick={() => setModalOpen(null)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddVariable} className="flex gap-2 mb-4">
              <input
                type="text"
                value={newVarKey}
                onChange={(e) => setNewVarKey(e.target.value)}
                placeholder="NAME"
                className="w-1/2 text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none font-mono uppercase focus:border-[#be4c3f]"
              />
              <input
                type="text"
                value={newVarVal}
                onChange={(e) => setNewVarVal(e.target.value)}
                placeholder="Value"
                className="w-1/2 text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#be4c3f]"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-xl"
              >
                Add
              </button>
            </form>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {variables.map((v, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs"
                >
                  <span className="font-mono font-bold text-slate-800">
                    {v.key}
                  </span>
                  <span className="font-mono text-slate-500">{v.val}</span>
                  <button
                    onClick={() =>
                      setVariables((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="text-slate-500 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Triggers Modal */}
      {modalOpen === "triggers" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-sm">
                Agent Event Triggers
              </h3>
              <button
                onClick={() => setModalOpen(null)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-slate-700" />
                    Inbound Gmail: Subject [Urgent]
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Auto-routes incoming high priority customer requests
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-slate-700" />
                    Slack Mention: @agent-support
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                    Standby
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Listens in #help channel for questions
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
