import React, { useState } from "react"
import {
  Send,
  Terminal,
  Bot,
  User,
  CheckCircle2,
  RefreshCw,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react"
import FormattedChatMessage from "./FormattedChatMessage"
import ExecutionTracesCard, { TraceStep } from "./ExecutionTracesCard"
import AiOrb from "./AiOrb"

interface Message {
  id: string
  sender: "agent" | "user"
  text: string
  time: string
  steps?: TraceStep[]
}

interface AgentTesterViewProps {
  onBackToBuilder: () => void
}

export const AgentTesterView: React.FC<AgentTesterViewProps> = ({
  onBackToBuilder,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      text: "Hello! I am Research & Enricher Agent powered by Lyzr Studio. Enter a company domain or topic to initiate automated research.",
      time: "10:42 AM",
      steps: [],
    },
  ])
  const [inputMessage, setInputMessage] = useState(
    "Research lyzr.ai and give me a summary",
  )
  const [isExecuting, setIsExecuting] = useState(false)

  const handleRunAgent = () => {
    if (!inputMessage.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      steps: [],
    }

    setMessages((prev) => [...prev, userMsg])
    setInputMessage("")
    setIsExecuting(true)

    // Simulate Agent Step Tracing
    setTimeout(() => {
      const agentReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: `### Research Summary for lyzr.ai
        
**Company:** Lyzr AI Inc.
**Tagline:** Enterprise-grade Agent Architecture & SDKs
**Core Capabilities:**
- **Lyzr Agent Studio:** Low-code builder for autonomous agent teams.
- **Privacy First:** 100% data privacy with local deployment support.
- **Multi-Agent Orchestration:** Agent-to-Agent (A2A) execution pipelines.

*Status:* All checks verified against live web data.`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        steps: [
          {
            name: "Tool Invoked: Web Researcher",
            status: "Completed",
            latency: "320ms",
          },
          {
            name: "Querying https://lyzr.ai/ docs & metadata",
            status: "Completed",
            latency: "450ms",
          },
          {
            name: "Synthesizing with GPT-5.4-mini",
            status: "Completed",
            latency: "890ms",
          },
        ],
      }
      setMessages((prev) => [...prev, agentReply])
      setIsExecuting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-fadeIn">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToBuilder}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-brand-500" />
              Live Execution Sandbox & Playground
            </h2>
            <p className="text-[11px] text-slate-600 font-medium">
              Test agent response, tool execution traces, and memory context
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Sandbox Connected
          </span>
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs flex items-center gap-1"
            title="Clear Chat History"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Split Layout: Left Chat Console, Right Execution Trace */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-6 gap-6 overflow-hidden">
        {/* Chat Console */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col overflow-hidden">
          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3.5 items-start ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                } group`}
              >
                {/* Avatar */}
                {msg.sender === "agent" ? (
                  <AiOrb
                    size="md"
                    animate={true}
                    className="shrink-0 select-none mt-0.5"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#be4c3f] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-white shrink-0 select-none">
                    SS
                  </div>
                )}

                <div
                  className={`max-w-xl space-y-1.5 ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex items-center gap-1.5 px-1 text-[11px] text-slate-500 font-medium">
                    <span className="font-semibold text-slate-700">
                      {msg.sender === "user" ? "You" : "Test Runner Agent"}
                    </span>
                    <span>•</span>
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-slate-900 text-white font-normal rounded-tr-xs shadow-xs whitespace-pre-wrap"
                        : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs space-y-3"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      msg.text
                    ) : (
                      <>
                        <FormattedChatMessage text={msg.text} />
                        {msg.steps && msg.steps.length > 0 && (
                          <ExecutionTracesCard
                            steps={msg.steps}
                            fullOutputText={msg.text}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isExecuting && (
              <div className="flex items-center gap-3 text-xs text-slate-600 animate-fadeIn">
                <AiOrb
                  size="md"
                  animate={true}
                  isThinking={true}
                  className="shrink-0"
                />
                <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-xs font-mono text-[11px] shadow-xs">
                  Agent is thinking & fetching web context...
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-center gap-2 bg-white border border-slate-200 focus-within:border-[#be4c3f] focus-within:ring-2 focus-within:ring-[#be4c3f]/15 rounded-2xl p-2 shadow-sm transition-all">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRunAgent()}
                placeholder="Type a test query or run command..."
                className="flex-1 text-xs text-slate-800 bg-transparent px-3 py-1.5 focus:outline-none placeholder:text-slate-400"
              />
              <button
                onClick={handleRunAgent}
                disabled={isExecuting || !inputMessage.trim()}
                className="px-4 py-2 bg-[#be4c3f] hover:bg-[#a83e32] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Run</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Execution Context Drawer */}
        <div className="w-80 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4 flex-shrink-0">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-500" />
            Runtime State & Memory
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase">
                Active Model
              </span>
              <p className="text-xs font-semibold font-mono text-slate-800">
                OpenAI / gpt-5.4-mini
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase">
                Connected Tools
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#fdf2f0] text-[#be4c3f] border border-[#f5d0cb] font-medium">
                  Web Researcher
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium">
                  Memory Store
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase">
                Session Tokens
              </span>
              <p className="text-xs font-mono text-slate-800 font-bold">
                1,240 / 128,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
