import React, { useState } from "react"
import { X, Search, SlidersHorizontal, Check, ChevronDown } from "lucide-react"

export interface AIModel {
  id: string
  name: string
  provider: string
  badge?: string
  tokens: string
  consumption: "Low credit consumption" | "Moderate credit consumption" | "High credit consumption"
  inputCredits: string
  outputCredits: string
  contextWindow: string
  outputLimit: string
  inputFiles: string
  thinking: string
  description: string
}

const MODELS: AIModel[] = [
  {
    id: "perf-opt",
    name: "Performance-optimized Model",
    provider: "Pick for me",
    badge: "Pick for me",
    tokens: "1,050,000 tokens",
    consumption: "Moderate credit consumption",
    inputCredits: "1.25 credits / 1k input tokens",
    outputCredits: "7.50 credits / 1k output tokens",
    contextWindow: "1,050,000 tokens",
    outputLimit: "128,000 tokens",
    inputFiles: "pdf, jpg, jpeg, gif, webp, png",
    thinking: "Supported",
    description:
      "Relevance AI will automatically select the most appropriate model to ensure you get the best results available -- no action needed. Current Model: GPT 5.4",
  },
  {
    id: "cost-opt",
    name: "Cost-optimized Model",
    provider: "Pick for me",
    badge: "Pick for me",
    tokens: "400,000 tokens",
    consumption: "Low credit consumption",
    inputCredits: "0.25 credits / 1k input tokens",
    outputCredits: "1.00 credits / 1k output tokens",
    contextWindow: "400,000 tokens",
    outputLimit: "64,000 tokens",
    inputFiles: "pdf, txt, markdown",
    thinking: "Supported",
    description:
      "Engineered for high-throughput, low-latency tasks such as batch categorization, filtering, and data extraction at minimal cost.",
  },
  {
    id: "claude-fable-5",
    name: "Claude Fable 5",
    provider: "Anthropic",
    tokens: "1,000,000 tokens",
    consumption: "High credit consumption",
    inputCredits: "3.00 credits / 1k input tokens",
    outputCredits: "15.00 credits / 1k output tokens",
    contextWindow: "1,000,000 tokens",
    outputLimit: "128,000 tokens",
    inputFiles: "pdf, jpg, jpeg, gif, webp, png",
    thinking: "Supported",
    description:
      "Anthropic's cutting-edge reasoning model optimized for deep narrative generation, long-form code refactoring, and multi-file synthesis.",
  },
  {
    id: "gpt-5-5",
    name: "GPT 5.5",
    provider: "OpenAI",
    tokens: "1,050,000 tokens",
    consumption: "High credit consumption",
    inputCredits: "2.50 credits / 1k input tokens",
    outputCredits: "10.00 credits / 1k output tokens",
    contextWindow: "1,050,000 tokens",
    outputLimit: "128,000 tokens",
    inputFiles: "pdf, docx, jpg, png, audio",
    thinking: "Supported",
    description:
      "State of the art multimodal generalist from OpenAI. Superb zero-shot instruction following with built-in mathematical verification.",
  },
  {
    id: "gpt-5-6",
    name: "GPT 5.6",
    provider: "OpenAI",
    tokens: "1,050,000 tokens",
    consumption: "High credit consumption",
    inputCredits: "3.50 credits / 1k input tokens",
    outputCredits: "14.00 credits / 1k output tokens",
    contextWindow: "1,050,000 tokens",
    outputLimit: "128,000 tokens",
    inputFiles: "all media formats",
    thinking: "Supported",
    description:
      "Maximum performance model capable of extended autonomous tool execution sequences and complex API workflows.",
  },
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    provider: "Anthropic",
    tokens: "1,000,000 tokens",
    consumption: "High credit consumption",
    inputCredits: "3.00 credits / 1k input tokens",
    outputCredits: "15.00 credits / 1k output tokens",
    contextWindow: "1,000,000 tokens",
    outputLimit: "128,000 tokens",
    inputFiles: "pdf, jpg, jpeg, gif, webp, png",
    thinking: "Supported",
    description:
      "High-intelligence Opus model delivering deterministic logic, nuanced tone calibration, and enterprise compliance adherence.",
  },
  {
    id: "claude-opus-5",
    name: "Claude Opus 5",
    provider: "Anthropic",
    tokens: "1,000,000 tokens",
    consumption: "High credit consumption",
    inputCredits: "4.00 credits / 1k input tokens",
    outputCredits: "18.00 credits / 1k output tokens",
    contextWindow: "1,000,000 tokens",
    outputLimit: "128,000 tokens",
    inputFiles: "all document & vision formats",
    thinking: "Supported",
    description:
      "Next-generation flagship architecture featuring exhaustive tree-of-thought exploration and self-correcting validation traces.",
  },
]

interface ModelSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedModelName?: string
  selectedModel?: string
  currentModel?: string
  onSelectModel: (modelName: string) => void
}

export const ModelSelectionModal: React.FC<ModelSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedModelName,
  selectedModel,
  currentModel,
  onSelectModel,
}) => {
  if (!isOpen) return null

  const effectiveModelName =
    selectedModelName || currentModel || selectedModel || ""
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string>(
    () => MODELS.find((m) => m.name === effectiveModelName)?.id || "perf-opt",
  )

  // Filters
  const [creditsLimit, setCreditsLimit] = useState(91.0)
  const [contextLimit, setContextLimit] = useState(10000000)
  const [outputTokensLimit, setOutputTokensLimit] = useState(10000000)
  const [providers, setProviders] = useState<Record<string, boolean>>({
    "AWS Bedrock": false,
    Anthropic: true,
    "Azure OpenAI": false,
    Google: true,
    "Google Cloud Vertex AI": false,
    OpenAI: true,
    OpenRouter: true,
  })

  const toggleProvider = (p: string) => {
    setProviders((prev) => ({ ...prev, [p]: !prev[p] }))
  }

  const filteredModels = MODELS.filter((m) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        m.name.toLowerCase().includes(q) || m.provider.toLowerCase().includes(q)
      )
    }
    return true
  })

  const activeModel = MODELS.find((m) => m.id === selectedId) || MODELS[0]

  const handleApply = () => {
    onSelectModel(activeModel.name)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-fadeIn select-none">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-10 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">
            Select your Agent's AI Model
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Column Body */}
        <div className="flex-1 grid grid-cols-12 min-h-0 overflow-hidden divide-x divide-slate-200">
          {/* Column 1: Filters (2.5 cols) */}
          <div className="col-span-3 p-5 overflow-y-auto space-y-6 text-xs bg-slate-50/40">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Filters</span>
              <button
                onClick={() => {
                  setCreditsLimit(91.0)
                  setContextLimit(10000000)
                  setOutputTokensLimit(10000000)
                }}
                className="text-slate-600 hover:text-slate-900 font-medium text-xs"
              >
                Reset (1)
              </button>
            </div>

            {/* Credits per 1k tokens */}
            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block">
                Credits per 1K tokens
              </span>
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono font-medium">
                <span>0.0</span>
                <span>{creditsLimit.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="91"
                step="0.5"
                value={creditsLimit}
                onChange={(e) => setCreditsLimit(parseFloat(e.target.value))}
                className="w-full accent-slate-900"
              />
            </div>

            {/* Context Window */}
            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block">
                Context Window
              </span>
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono font-medium">
                <span>4,000</span>
                <span>{contextLimit.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="10000000"
                step="10000"
                value={contextLimit}
                onChange={(e) => setContextLimit(parseInt(e.target.value))}
                className="w-full accent-slate-900"
              />
            </div>

            {/* Max Output Tokens */}
            <div className="space-y-2">
              <span className="font-semibold text-slate-800 block">
                Max Output Tokens
              </span>
              <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono font-medium">
                <span>4,096</span>
                <span>{outputTokensLimit.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4096"
                max="10000000"
                step="10000"
                value={outputTokensLimit}
                onChange={(e) => setOutputTokensLimit(parseInt(e.target.value))}
                className="w-full accent-slate-900"
              />
            </div>

            {/* Model Provider checkboxes */}
            <div className="space-y-2.5">
              <span className="font-semibold text-slate-800 block">
                Model Provider
              </span>
              <div className="space-y-2">
                {Object.keys(providers).map((prov) => (
                  <label
                    key={prov}
                    className="flex items-center gap-2 text-slate-700 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={providers[prov]}
                      onChange={() => toggleProvider(prov)}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5 accent-slate-900"
                    />
                    <span className="text-xs">{prov}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Models List (5.5 cols) */}
          <div className="col-span-5 flex flex-col min-h-0 bg-white">
            {/* Search & Sort bar */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-slate-900 placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-700 font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 cursor-pointer hover:bg-slate-100">
                <span>Sort: Recommended</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </div>
            </div>

            {/* Models list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {filteredModels.map((m) => {
                const isSelected = m.id === selectedId
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900 shadow-2xs"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-[10px] mt-0.5 shrink-0 font-bold">
                          {m.provider === "OpenAI"
                            ? "OA"
                            : m.provider === "Anthropic"
                              ? "AN"
                              : "MI"}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-xs">
                              {m.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 block">
                            {m.provider}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-mono text-slate-700 block font-medium">
                          {m.tokens}
                        </span>
                        <span
                          className={`text-[10px] block font-medium ${
                            m.consumption === "Low credit consumption"
                              ? "text-emerald-600"
                              : m.consumption === "Moderate credit consumption"
                                ? "text-amber-600"
                                : "text-slate-500"
                          }`}
                        >
                          {m.consumption}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Column 3: Selected Model Details (4 cols) */}
          <div className="col-span-4 p-6 overflow-y-auto bg-slate-50/30 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                    ⚡
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {activeModel.name}
                  </h3>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200">
                  {activeModel.consumption}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="space-y-3 text-xs divide-y divide-slate-100">
                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">
                    Credit usage
                  </span>
                  <div className="text-right font-mono text-[11px] text-slate-800 font-medium">
                    <div>{activeModel.inputCredits}</div>
                    <div>{activeModel.outputCredits}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">
                    Context window
                  </span>
                  <span className="font-mono text-slate-900 font-semibold text-[11px]">
                    {activeModel.contextWindow}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">
                    Output limit
                  </span>
                  <span className="font-mono text-slate-900 font-semibold text-[11px]">
                    {activeModel.outputLimit}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">
                    Input files
                  </span>
                  <span className="font-mono text-slate-900 font-semibold text-[11px]">
                    {activeModel.inputFiles}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-slate-600 font-medium">Thinking</span>
                  <span className="text-emerald-700 font-semibold text-[11px]">
                    {activeModel.thinking}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-3.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                {activeModel.description}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-black rounded-md shadow-2xs transition-colors"
          >
            Select Model
          </button>
        </div>
      </div>
    </div>
  )
}
export default ModelSelectionModal
