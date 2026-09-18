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
import FormattedChatMessage from "./FormattedChatMessage"

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
          <div className="w-7 h-7 rounded-lg bg-[#be4c3f] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 text-xs">
                Invent Copilot
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
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
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 items-start ${
              msg.sender === "user" ? "flex-row-reverse" : "flex-row"
            } group`}
          >
            {/* Avatar */}
            {msg.sender === "agent" ? (
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs ring-2 ring-slate-100 select-none sticky top-2">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-[#be4c3f] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-xs ring-2 ring-white select-none sticky top-2">
                SS
              </div>
            )}

            {/* Bubble & Contents */}
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
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-slate-900 text-white rounded-tr-xs shadow-xs font-normal whitespace-pre-wrap"
                    : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-xs space-y-2.5 w-full"
                }`}
              >
                {msg.sender === "user" ? (
                  msg.text
                ) : (
                  <FormattedChatMessage text={msg.text} />
                )}
              </div>

              {/* Code / Prompt snippet block if available */}
              {msg.suggestedPromptSnippet && (
                <div className="w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xs mt-1">
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
                        className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer"
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
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs cursor-pointer ${
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

              {/* Quick action buttons / suggestions */}
              {msg.quickActions && msg.quickActions.length > 0 && (
                <div className="flex flex-col gap-1 w-full mt-1">
                  {msg.quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(action)}
                      className="group flex items-center justify-between text-left text-xs px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-[#fdf2f0] border border-slate-200 hover:border-[#f5d0cb] text-slate-700 hover:text-[#be4c3f] transition-all shadow-2xs font-medium cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#be4c3f]" />
                        <span>{action}</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-[#be4c3f] group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Streaming Thinking State */}
        {isGenerating && (
          <div className="flex gap-3 items-start animate-fadeIn">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs ring-2 ring-slate-100">
              <Bot className="w-3.5 h-3.5 text-white animate-pulse" />
            </div>
            <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-xs border border-slate-200 shadow-xs flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 border-2 border-[#be4c3f] border-t-transparent rounded-full animate-spin shrink-0" />
              <span className="text-xs text-slate-700 font-medium">
                Synthesizing agent recommendations...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Footer */}
      <div className="p-3 border-t border-slate-200 bg-white shrink-0">
        <div className="border border-slate-200 focus-within:border-[#be4c3f] focus-within:ring-2 focus-within:ring-[#be4c3f]/15 rounded-2xl overflow-hidden transition-all shadow-sm bg-white">
          <div className="flex items-center px-3.5 py-2.5 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Invent Copilot or request improvements..."
              className="flex-1 text-xs text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              disabled={isGenerating}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isGenerating}
              className={`ml-2 px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                input.trim() && !isGenerating
                  ? "bg-[#be4c3f] hover:bg-[#a83e32] text-white shadow-xs"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
              <span className="text-slate-500">Connected to</span>
              <span className="font-semibold text-slate-800">GPT 5.6 Luna</span>
              <span className="text-[9px]">▾</span>
            </div>
            <button
              onClick={() =>
                handleSendMessage("Connect new tools and services")
              }
              className="font-semibold text-[#be4c3f] hover:underline cursor-pointer"
            >
              Connect Tools
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InventChatPanel
