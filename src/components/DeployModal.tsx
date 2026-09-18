import React, { useState } from "react"
import {
  X,
  Copy,
  Check,
  Terminal,
  Code2,
  Server,
  CheckCircle2,
} from "lucide-react"

interface DeployModalProps {
  isOpen: boolean
  onClose: () => void
  agentTitle?: string
  agentName?: string
}

export const DeployModal: React.FC<DeployModalProps> = ({
  isOpen,
  onClose,
  agentTitle,
  agentName,
}) => {
  if (!isOpen) return null
  const effectiveTitle = agentTitle || agentName || "Untitled agent"

  const [activeTab, setActiveTab] = useState<"curl" | "python" | "node">("curl")
  const [copied, setCopied] = useState(false)
  const endpoint = `https://api.lyzr.ai/v1/agents/agt_89f2a/execute`
  const apiKey = `lyzr_live_sk_948a27cf1190bc`

  const codeSnippets = {
    curl: `curl -X POST "${endpoint}" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": "Summarize customer inquiries from the last 24 hours",
    "stream": false
  }'`,
    python: `import requests

url = "${endpoint}"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
}
payload = {
    "input": "Summarize customer inquiries from the last 24 hours",
    "stream": False
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,
    node: `const response = await fetch("${endpoint}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    input: "Summarize customer inquiries from the last 24 hours",
    stream: false
  })
});
const data = await response.json();
console.log(data);`,
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-xl w-full p-5 shadow-xl border border-slate-200 relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 text-xs">
                  Deploy Agent to Production
                </h3>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200">
                  Live Endpoint
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                {effectiveTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Endpoint & Key */}
        <div className="space-y-2.5 mb-4">
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              Production Endpoint
            </label>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs text-slate-800">
              {endpoint}
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600 mb-1">
              API Key
            </label>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs text-slate-800 flex items-center justify-between">
              <span>{apiKey}</span>
              <span className="text-[10px] text-emerald-600 font-sans font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            </div>
          </div>
        </div>

        {/* Code Snippet Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md text-xs">
              {(["curl", "python", "node"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-1 rounded font-medium capitalize transition-all ${
                    activeTab === t
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {t === "node" ? "Node.js" : t}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-900 font-semibold hover:underline"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied Snippet!" : "Copy Code"}</span>
            </button>
          </div>

          <pre className="p-3.5 bg-slate-900 text-slate-200 font-mono text-xs rounded-md overflow-x-auto max-h-48 leading-relaxed">
            {codeSnippets[activeTab]}
          </pre>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">
            P99 Latency: ~820ms • Auto-scaling enabled
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-semibold rounded-md shadow-2xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
export default DeployModal
