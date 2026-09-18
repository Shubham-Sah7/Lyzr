import React, { useState, useRef, useEffect } from "react"
import {
  Send,
  X,
  RotateCcw,
  Check,
  Copy,
  ArrowRight,
  Wand2,
  ShieldCheck,
  Activity,
  Lightbulb,
  Bot,
  FileCode,
  CheckCircle2,
} from "lucide-react"

export interface ChatMessage {
  id: string
  sender: "agent" | "user"
  text: string
  time: string
  suggestedPromptSnippet?: string
  quickActions?: string[]
  type?: "standard" | "code" | "plan"
}

interface InventChatPanelProps {
  onClose?: () => void
  onApplyInstructions?: (instructions: string) => void
  currentInstructions?: string
  agentName?: string
}

export const InventChatPanel: React.FC<InventChatPanelProps> = ({
  onClose,
  onApplyInstructions,
  currentInstructions = "",
  agentName = "Untitled agent",
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "agent",
      text: "How can I help you build and refine your agent today? I can write production prompts, connect API tools, or set up evaluation tests.",
      time: "Just now",
      quickActions: [
        "Generate full agent prompt",
        "Add test coverage",
        "Add production monitoring",
        "Get detailed recommendations",
      ],
    },
  ])

  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [appliedId, setAppliedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isGenerating])

  const generateResponse = (userText: string) => {
    const lower = userText.toLowerCase()
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

    // 1. Prompt writing request
    if (
      lower.includes("prompt") ||
      lower.includes("generate") ||
      lower.includes("write") ||
      lower.includes("support") ||
      lower.includes("create")
    ) {
      return {
        id: Date.now().toString(),
        sender: "agent" as const,
        text: `Here is an enterprise-grade agent prompt customized for **${agentName}**. It defines strict guardrails, structured thinking, and deterministic tool usage:`,
        time: timeStr,
        suggestedPromptSnippet: `You are an elite Autonomous Operations & Research Specialist for ${agentName}.

### Objectives:
1. Process inbound events and tickets with high contextual accuracy.
2. Execute tool calls (Gmail, Slack, Google Sheets) idempotently.
3. If uncertainty is above 15%, request human approval with a concise summary.

### Output Constraints:
- Use markdown formatting with bullet points.
- Always include an executive summary followed by actionable next steps.
- Do not disclose system internals or raw API keys.`,
        quickActions: [
          "Add edge-case error handling",
          "Connect Gmail & Slack triggers",
          "Run test benchmark",
        ],
      }
    }

    // 2. Test coverage request
    if (
      lower.includes("test") ||
      lower.includes("coverage") ||
      lower.includes("eval")
    ) {
      return {
        id: Date.now().toString(),
        sender: "agent" as const,
        text: `I've prepared an automated regression test suite for **${agentName}** with 4 critical evaluation criteria:\n\n1. **Format Validation**: Ensures valid JSON schema responses.\n2. **Tool Call Verification**: Checks parameters for Gmail & Linear endpoints.\n3. **Hallucination Guard**: Cross-references against internal vector knowledge.\n4. **Latency Budget**: Asserts round-trip generation completes in < 1,200ms.`,
        time: timeStr,
        suggestedPromptSnippet: `[Evaluation Assertions]
- test_email_triage: assert response.category in ["urgent", "normal", "spam"]
- test_pii_redaction: assert not contains_ssn(response.body)
- test_token_limit: assert response.usage.completion_tokens < 600`,
        quickActions: [
          "Deploy test suite to Run tab",
          "Simulate 50 sample runs",
        ],
      }
    }

    // 3. Production monitoring request
    if (
      lower.includes("monitor") ||
      lower.includes("prod") ||
      lower.includes("metrics") ||
      lower.includes("trigger")
    ) {
      return {
        id: Date.now().toString(),
        sender: "agent" as const,
        text: `Production telemetry configuration enabled for **${agentName}**:\n\n- **Live Healthcheck**: Pinging execution webhook every 60s.\n- **Error Alerting**: Slack channel #agent-alerts notified on 5xx status codes.\n- **Cost Tracker**: Token consumption threshold capped at $50.00 / day.\n- **Fallback Model**: Automatic failover to Claude 3.5 Sonnet if primary model latency exceeds 2.5s.`,
        time: timeStr,
        quickActions: ["Configure webhook endpoint", "Set up Slack alerts"],
      }
    }

    // 4. Default / General recommendation response
    return {
      id: Date.now().toString(),
      sender: "agent" as const,
      text: `I've analyzed your current agent settings. Here are 3 key recommendations to elevate performance:\n\n• **Add Structured Triggers**: Wire up an automated event listener (e.g. new email received or spreadsheet row added).\n• **Enable Knowledge Grounding**: Connect your internal PDF/Notion documentation so the agent doesn't guess.\n• **Specify Few-Shot Examples**: Add 2-3 sample inputs and outputs in the instructions textarea.`,
      time: timeStr,
      quickActions: [
        "Generate few-shot examples",
        "Add Google Sheets tool",
        "Review agent schema",
      ],
    }
  }

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query) return

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
    if (!textToSend) setInput("")
    setIsGenerating(true)

    setTimeout(() => {
      const response = generateResponse(query)
      setMessages((prev) => [...prev, response])
      setIsGenerating(false)
    }, 650)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleApply = (snippet: string, msgId: string) => {
    if (onApplyInstructions) {
      onApplyInstructions(snippet)
      setAppliedId(msgId)
      setTimeout(() => setAppliedId(null), 3000)
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "agent",
        text: "Conversation refreshed. How can I assist you with your agent build?",
        time: "Just now",
        quickActions: [
          "Generate full agent prompt",
          "Add test coverage",
          "Add production monitoring",
          "Get detailed recommendations",
        ],
      },
    ])
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-slate-200 select-text">
      {/* Header matching reference */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#fdf2f0] border border-[#f5d0cb] flex items-center justify-center text-[#be4c3f]">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-xs">
                Invent Copilot
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#fdf2f0] text-[#be4c3f] border border-[#f5d0cb]">
                GPT 5.6 Luna
              </span>
            </div>
            <p className="text-[10px] text-slate-600 font-medium">
              Autonomous Assistant & Prompt Engineer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3 h-3" />
            <span>History</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="Close panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            {msg.sender === "agent" ? (
              <div className="w-6 h-6 rounded-md bg-[#fdf2f0] border border-[#f5d0cb] text-[#be4c3f] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md bg-[#be4c3f] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-2xs">
                SS
              </div>
            )}

            {/* Bubble & Contents */}
            <div
              className={`flex flex-col gap-1.5 max-w-[85%] ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-xl leading-relaxed whitespace-pre-wrap text-xs ${
                  msg.sender === "user"
                    ? "bg-[#fdf2f0] text-slate-900 border border-[#f5d0cb] font-medium shadow-2xs"
                    : "bg-slate-50 text-slate-800 border border-slate-200/90 shadow-2xs"
                }`}
              >
                {msg.text}
              </div>

              {/* Code / Prompt snippet block if available */}
              {msg.suggestedPromptSnippet && (
                <div className="w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xs">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b border-slate-700 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                      <FileCode className="w-3.5 h-3.5 text-[#be4c3f]" />
                      Generated Instruction Block
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopy(msg.suggestedPromptSnippet!, msg.id)
                        }
                        className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="p-3 text-[11px] font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
                    {msg.suggestedPromptSnippet}
                  </pre>
                  {onApplyInstructions && (
                    <div className="p-2 bg-slate-800/60 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() =>
                          handleApply(msg.suggestedPromptSnippet!, msg.id)
                        }
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
                          appliedId === msg.id
                            ? "bg-emerald-600 text-white"
                            : "bg-[#be4c3f] hover:bg-[#a83e32] text-white"
                        }`}
                      >
                        {appliedId === msg.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Applied to Instructions!</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-3.5 h-3.5" />
                            <span>Apply to Agent Instructions</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Quick action buttons / suggestions matching reference */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div className="flex flex-col gap-1 w-full mt-1">
                  {msg.quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(action)}
                      className="group flex items-center justify-between text-left text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-[#fdf2f0] border border-slate-200 hover:border-[#f5d0cb] text-slate-700 hover:text-[#be4c3f] transition-all shadow-2xs"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#be4c3f]" />
                        <span className="font-medium">{action}</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-[#be4c3f] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-slate-500 font-medium px-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {/* Streaming Thinking State */}
        {isGenerating && (
          <div className="flex gap-2.5 items-start">
            <div className="w-6 h-6 rounded-md bg-[#fdf2f0] border border-[#f5d0cb] text-[#be4c3f] flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-[#be4c3f] border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-slate-600 font-medium">
                Synthesizing suggestions...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer matching reference */}
      <div className="p-3 border-t border-slate-200 bg-white shrink-0">
        <div className="border border-slate-200 focus-within:border-[#be4c3f] focus-within:ring-1 focus-within:ring-[#be4c3f]/20 rounded-xl overflow-hidden transition-all shadow-2xs">
          <div className="flex items-center px-3 py-2 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Create with Invent..."
              className="flex-1 text-xs text-slate-800 placeholder:text-slate-500 outline-none bg-transparent"
              disabled={isGenerating}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isGenerating}
              className={`ml-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                input.trim() && !isGenerating
                  ? "bg-[#be4c3f] hover:bg-[#a83e32] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50/80 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
              <span>Allow</span>
              <span className="font-semibold text-slate-800">GPT 5.6 Luna</span>
              <span className="text-[9px]">▾</span>
            </div>
            <button
              onClick={() =>
                handleSendMessage("Connect new tools and services")
              }
              className="font-semibold text-[#be4c3f] hover:underline cursor-pointer"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InventChatPanel
