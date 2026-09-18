import React from "react"
import {
  Plus,
  Wand2,
  Settings2,
  Play,
  Bot,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"

interface DashboardViewProps {
  onOpenCreateModal: () => void
  onSelectAgent: (agentId: string) => void
  onOpenInventStudio: () => void
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenCreateModal,
  onSelectAgent,
  onOpenInventStudio,
}) => {
  // Sample performance sparkline data
  const sparklineData1 = [
    { v: 12 },
    { v: 18 },
    { v: 15 },
    { v: 28 },
    { v: 35 },
    { v: 42 },
    { v: 38 },
    { v: 54 },
    { v: 62 },
    { v: 75 },
  ]
  const sparklineData2 = [
    { v: 45 },
    { v: 40 },
    { v: 52 },
    { v: 48 },
    { v: 60 },
    { v: 58 },
    { v: 70 },
    { v: 65 },
    { v: 80 },
    { v: 88 },
  ]
  const sparklineData3 = [
    { v: 20 },
    { v: 25 },
    { v: 22 },
    { v: 30 },
    { v: 35 },
    { v: 32 },
    { v: 45 },
    { v: 50 },
    { v: 48 },
    { v: 65 },
  ]

  const assets = [
    {
      id: "agent-1",
      name: "Research & Enricher",
      type: "Autonomous Agent",
      model: "GPT-5.4-mini",
      tasks: 1420,
      tasksTrend: "+24%",
      status: "Active",
      sparkline: sparklineData1,
      color: "#be4c3f",
      iconBg: "bg-[#fdf2f0] text-[#be4c3f]",
    },
    {
      id: "agent-2",
      name: "Support Triage",
      type: "Workflow Agent",
      model: "Claude 3.5 Sonnet",
      tasks: 890,
      tasksTrend: "+12%",
      status: "Active",
      sparkline: sparklineData2,
      color: "#0F172A",
      iconBg: "bg-slate-100 text-slate-800",
    },
    {
      id: "agent-3",
      name: "Lifecycle Marketer",
      type: "Multi-Agent Workforce",
      model: "Lyzr Enterprise-v2",
      tasks: 630,
      tasksTrend: "+18%",
      status: "Active",
      sparkline: sparklineData3,
      color: "#10B981",
      iconBg: "bg-emerald-100 text-emerald-700",
    },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Hero Header Section matching Image 3 & 4 */}
      <div className="text-center py-6 space-y-4">
        {/* Pixel Character Header Illustration */}
        <div className="relative inline-block">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-slate-100 p-3 flex items-center justify-center border border-slate-200 shadow-inner">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl">
              💻
            </div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-500 border-2 border-white" />
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Good afternoon, Sagar
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Your agents are running smoothly across all connected workflows.
          </p>
        </div>

        {/* Action Buttons matching Image 3 & 4 */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create...</span>
          </button>

          <button
            onClick={onOpenInventStudio}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-200/90 shadow-2xs transition-all hover:border-slate-300"
          >
            <Wand2 className="w-4 h-4 text-brand-500" />
            <span>Build with Invent</span>
          </button>
        </div>
      </div>

      {/* Main Assets & Performance Table Card matching Image 3 & 4 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Table Header Controls */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#be4c3f]" />
            <h2 className="font-semibold text-slate-900 text-sm">
              Active Agents & Workforces
            </h2>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-600">
              3 active
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-1.5 rounded-lg hover:text-slate-800 hover:bg-slate-100 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg hover:text-slate-800 hover:bg-slate-100 transition-colors">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Structure */}
        <div className="divide-y divide-slate-100">
          {/* Table Headers */}
          <div className="px-6 py-3 grid grid-cols-12 gap-4 text-[11px] font-semibold text-slate-600 uppercase tracking-wider bg-slate-50/50">
            <div className="col-span-4">Asset Name</div>
            <div className="col-span-3">Executions & Tasks</div>
            <div className="col-span-3">Performance (7d)</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Rows */}
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50/80 transition-colors group cursor-pointer"
              onClick={() => onSelectAgent(asset.id)}
            >
              {/* Asset Name & Badge */}
              <div className="col-span-4 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl ${asset.iconBg} flex items-center justify-center font-bold text-sm shadow-2xs group-hover:scale-105 transition-transform`}
                >
                  {asset.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-xs group-hover:text-brand-600 transition-colors">
                      {asset.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-600 font-mono">
                      {asset.model}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[10px] text-slate-600 font-medium">
                      {asset.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tasks Bar Visualization */}
              <div className="col-span-3 flex items-center gap-3">
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 font-mono">
                      {asset.tasks.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">
                      {asset.tasksTrend}
                    </span>
                  </div>
                  {/* Vertical mini progress bars matching screenshot */}
                  <div className="flex items-end gap-1 h-3">
                    {[6, 8, 5, 10, 12, 14, 11, 16, 18, 20].map((h, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 bg-slate-200 rounded-full group-hover:bg-brand-500/80 transition-colors"
                        style={{ height: `${(h / 20) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Sparkline */}
              <div className="col-span-3 h-9">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={asset.sparkline}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={asset.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectAgent(asset.id)
                  }}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 transition-colors"
                  title="Open Agent Studio"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectAgent(asset.id)
                  }}
                  className="p-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                  title="Run Agent"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Templates Banner */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Optional extras to make your agent smarter and more useful
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Instant pre-built workflow templates you can add with one click
            </p>
          </div>
          <button
            onClick={onOpenInventStudio}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            Explore all templates <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={onOpenInventStudio}
            className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              Web Researcher
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              Searches Google, Bing, and custom domains to extract structured
              insights.
            </p>
            <span className="text-[11px] font-semibold text-slate-900 mt-3 block group-hover:translate-x-1 transition-transform">
              Use template →
            </span>
          </div>

          <div
            onClick={onOpenInventStudio}
            className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-slate-700" />
              Meeting Prepper
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              Prepares briefing documents by pulling attendee history and past
              calendar notes.
            </p>
            <span className="text-[11px] font-semibold text-slate-900 mt-3 block group-hover:translate-x-1 transition-transform">
              Use template →
            </span>
          </div>

          <div
            onClick={onOpenInventStudio}
            className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-slate-900" />
              Email Assistant
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              Drafts personalized replies and auto-triages inbound customer
              support tickets.
            </p>
            <span className="text-[11px] font-semibold text-brand-600 mt-3 block group-hover:translate-x-1 transition-transform">
              Use template →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
