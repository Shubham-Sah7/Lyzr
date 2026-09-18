import React, { useState } from "react"
import Header from "./Header"
import {
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  BarChart3,
  ShieldCheck,
  Zap,
  Clock,
  AlertTriangle,
  Sliders,
  Filter,
} from "lucide-react"

interface EvaluationViewProps {
  onNavigateTab?: (tab: "build" | "run" | "evaluate") => void
  onHomeClick?: () => void
}

export const EvaluationView: React.FC<EvaluationViewProps> = ({
  onNavigateTab,
  onHomeClick,
}) => {
  const [isRunningEval, setIsRunningEval] = useState(false)
  const [evalProgress, setEvalProgress] = useState(100)
  const [testCases, setTestCases] = useState([
    {
      id: "tc-1",
      name: "Customer Triage: Urgent Billing Request",
      category: "Accuracy",
      status: "Passed",
      latency: "340ms",
      tokens: 412,
      assertion: "assert response.category == 'billing_urgent'",
    },
    {
      id: "tc-2",
      name: "Security Guard: PII Redaction in Emails",
      category: "Safety",
      status: "Passed",
      latency: "210ms",
      tokens: 280,
      assertion: "assert not contains_ssn_or_credit_card(body)",
    },
    {
      id: "tc-3",
      name: "Tool Calling: Google Sheets Row Append",
      category: "Tools",
      status: "Passed",
      latency: "490ms",
      tokens: 520,
      assertion: "assert tool_calls[0].name == 'append_row'",
    },
    {
      id: "tc-4",
      name: "Hallucination Check: Product FAQ Pricing",
      category: "RAG Quality",
      status: "Passed",
      latency: "610ms",
      tokens: 690,
      assertion: "assert response.facts in vector_knowledge_store",
    },
    {
      id: "tc-5",
      name: "Edge Case: Multi-lingual Spanish Query",
      category: "Robustness",
      status: "Passed",
      latency: "430ms",
      tokens: 480,
      assertion: "assert detect_language(response) == 'es'",
    },
  ])

  const handleRunEvaluation = () => {
    setIsRunningEval(true)
    setEvalProgress(0)

    const interval = setInterval(() => {
      setEvalProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsRunningEval(false)
          return 100
        }
        return prev + 20
      })
    }, 300)
  }

  return (
    <div className="bg-white flex flex-col min-h-screen w-full font-sans antialiased text-slate-800">
      <Header
        activeTab="evaluate"
        agentTitle="Research & Operations Agent"
        onTabChange={onNavigateTab}
        onHomeClick={onHomeClick}
      />

      <div className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6">
        {/* Top summary card */}
        {/* Top summary card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-lg border border-slate-200 bg-white shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                Evaluation Score: 98.4%
              </span>
              <span className="text-xs text-slate-600 font-medium">
                • 5/5 assertions verified
              </span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
              Production Quality Benchmark
            </h2>
            <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
              Automated regression suite tests prompt instructions, schema
              conformity, and deterministic tool execution.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunEvaluation}
              disabled={isRunningEval}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-medium transition-all shadow-2xs ${
                isRunningEval
                  ? "bg-slate-200 text-slate-600 cursor-not-allowed"
                  : "bg-[#be4c3f] hover:bg-[#a83e32] text-white"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>
                {isRunningEval
                  ? `Running Suite (${evalProgress}%)`
                  : "Run Full Benchmark"}
              </span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-2xs">
            <div className="flex items-center justify-between text-slate-600 mb-1.5">
              <span className="text-xs font-medium">Average Latency (P50)</span>
              <Clock className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-2xl font-semibold text-slate-900 tracking-tight">
              416 ms
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              ↓ 18% faster than baseline
            </span>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-2xs">
            <div className="flex items-center justify-between text-slate-600 mb-1.5">
              <span className="text-xs font-medium">
                Safety & Guardrail Pass
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-semibold text-slate-900 tracking-tight">
              100.0%
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              0 safety or PII violations
            </span>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-2xs">
            <div className="flex items-center justify-between text-slate-600 mb-1.5">
              <span className="text-xs font-medium">Average Token Usage</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-semibold text-slate-900 tracking-tight">
              476 tokens
            </div>
            <span className="text-[11px] text-slate-600 font-medium">
              ~$0.0014 per execution
            </span>
          </div>
        </div>

        {/* Test Cases Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-xs">
                Automated Test Assertions
              </h3>
              <p className="text-[11px] text-slate-600">
                Run continuously on every agent edit or deployment
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                5 Total Tests
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {testCases.map((tc) => (
              <div
                key={tc.id}
                className="px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900 text-xs">
                        {tc.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
                        {tc.category}
                      </span>
                    </div>
                    <code className="text-[11px] text-slate-600 font-mono mt-0.5 block">
                      {tc.assertion}
                    </code>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="font-mono text-slate-600 font-medium">
                    {tc.latency}
                  </span>
                  <span className="font-mono text-slate-600 font-medium">
                    {tc.tokens} tokens
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Passed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default EvaluationView
