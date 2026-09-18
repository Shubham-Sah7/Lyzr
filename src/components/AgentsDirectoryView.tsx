import React, { useState } from "react"
import {
  Search,
  Plus,
  Star,
  LayoutGrid,
  List,
  Play,
  Edit3,
  Wand2,
  Globe,
  Headphones,
  Mail,
  PieChart,
  Terminal,
  Calendar,
  Bot,
} from "lucide-react"

interface AgentsDirectoryViewProps {
  onOpenCreateModal: () => void
  onSelectAgent: (agentId: string) => void
  onOpenInventStudio: () => void
}

export const AgentsDirectoryView: React.FC<AgentsDirectoryViewProps> = ({
  onOpenCreateModal,
  onSelectAgent,
  onOpenInventStudio,
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const agentsList = [
    {
      id: "agent-1",
      name: "Research & Enricher",
      description:
        "Autonomous web scraper & prospect enrichment agent with real-time summary.",
      model: "GPT-5.4-mini",
      status: "Published",
      trigger: "API & Webhook",
      executions: "1,420",
      lastRun: "5 mins ago",
      isFavorite: true,
      category: "Sales & Ops",
      avatarColor: "bg-[#be4c3f] text-white",
      icon: Globe,
    },
    {
      id: "agent-2",
      name: "Support Triage Agent",
      description:
        "Categorizes incoming support tickets and drafts contextual resolution steps.",
      model: "Claude 3.5 Sonnet",
      status: "Published",
      trigger: "Auto-pilot Schedule",
      executions: "890",
      lastRun: "12 mins ago",
      isFavorite: true,
      category: "Customer Support",
      avatarColor: "bg-slate-900 text-white",
      icon: Headphones,
    },
    {
      id: "agent-3",
      name: "Lifecycle Marketer",
      description:
        "Generates personalized email copy and tracks user activation funnels.",
      model: "Lyzr Enterprise-v2",
      status: "Published",
      trigger: "Event Triggered",
      executions: "630",
      lastRun: "1 hour ago",
      isFavorite: false,
      category: "Marketing",
      avatarColor: "bg-emerald-500 text-white",
      icon: Mail,
    },
    {
      id: "agent-4",
      name: "Financial Audit Bot",
      description:
        "Parses PDFs, invoices, and bank receipts for automated compliance checks.",
      model: "GPT-5.4-mini",
      status: "Draft",
      trigger: "Manual Run",
      executions: "45",
      lastRun: "Yesterday",
      isFavorite: false,
      category: "Finance",
      avatarColor: "bg-amber-500 text-white",
      icon: PieChart,
    },
    {
      id: "agent-5",
      name: "DevOps Log Analyzer",
      description:
        "Monitors Kubernetes cluster logs for anomaly detection and alert summaries.",
      model: "Performance-optimized",
      status: "Published",
      trigger: "Cron Schedule (*/5m)",
      executions: "5,210",
      lastRun: "Just now",
      isFavorite: true,
      category: "Engineering",
      avatarColor: "bg-indigo-500 text-white",
      icon: Terminal,
    },
    {
      id: "agent-6",
      name: "Meeting Summarizer & Prepper",
      description:
        "Connects to Google Calendar and Zoom to prepare meeting briefs.",
      model: "Lyzr Core-v3",
      status: "Published",
      trigger: "Calendar Webhook",
      executions: "312",
      lastRun: "3 hours ago",
      isFavorite: false,
      category: "Productivity",
      avatarColor: "bg-pink-500 text-white",
      icon: Calendar,
    },
  ]

  const filteredAgents = agentsList.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    if (selectedFilter === "favorites") return matchesSearch && agent.isFavorite
    if (selectedFilter === "published")
      return matchesSearch && agent.status === "Published"
    if (selectedFilter === "draft")
      return matchesSearch && agent.status === "Draft"
    return matchesSearch
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header matching Image 1 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            All agents
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Manage, configure, and evaluate your autonomous AI agents
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenInventStudio}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs transition-all"
          >
            <Wand2 className="w-3.5 h-3.5 text-brand-500" />
            <span>Invent Studio</span>
          </button>
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create agent</span>
          </button>
        </div>
      </div>

      {/* Search Bar & Controls Row matching Image 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents by name, description, or category..."
            className="w-full bg-slate-50 border border-slate-200/70 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-500"
          />
        </div>

        {/* Filter Pills & View Toggles */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Favorite Toggle */}
          <button
            onClick={() =>
              setSelectedFilter(
                selectedFilter === "favorites" ? "all" : "favorites",
              )
            }
            className={`p-2 rounded-xl border transition-all ${
              selectedFilter === "favorites"
                ? "bg-amber-50 text-amber-600 border-amber-200 font-semibold"
                : "border-slate-200/80 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
            title="Filter Favorites"
          >
            <Star
              className={`w-4 h-4 ${
                selectedFilter === "favorites"
                  ? "fill-amber-400 text-amber-500"
                  : ""
              }`}
            />
          </button>

          {/* Status Filter */}
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All Status</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View of Agents */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent.id)}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md hover:border-brand-200 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon, Name & Options */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${agent.avatarColor} flex items-center justify-center font-bold text-sm shadow-2xs group-hover:scale-105 transition-transform`}
                    >
                      {agent.icon ? (
                        <agent.icon className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                        {agent.name}
                      </h3>
                      <span className="text-[10px] text-slate-600 font-mono font-medium">
                        {agent.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      className="text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          agent.isFavorite
                            ? "fill-amber-400 text-amber-400"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {agent.description}
                </p>

                {/* Tags & Metadata */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/60 font-mono">
                    {agent.model}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-100">
                    {agent.trigger}
                  </span>
                </div>
              </div>

              {/* Card Footer: Status & Execution Stats */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      agent.status === "Published"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                        : "bg-amber-50 text-amber-700 border border-amber-200/60"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        agent.status === "Published"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                    />
                    {agent.status}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono font-medium">
                    {agent.executions} runs
                  </span>
                </div>

                <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectAgent(agent.id)
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Edit Prompt & Instructions"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectAgent(agent.id)
                    }}
                    className="p-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                    title="Test Run"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent.id)}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-9 h-9 rounded-xl ${agent.avatarColor} flex items-center justify-center font-bold text-xs`}
                >
                  {agent.icon ? (
                    <agent.icon className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 text-xs group-hover:text-brand-600 transition-colors">
                      {agent.name}
                    </h3>
                    <span className="text-[10px] text-slate-600 font-mono font-medium">
                      ({agent.model})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 truncate max-w-md mt-0.5">
                    {agent.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-xs text-slate-600 font-mono font-medium">
                  {agent.executions} runs
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    agent.status === "Published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {agent.status}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectAgent(agent.id)
                  }}
                  className="p-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
