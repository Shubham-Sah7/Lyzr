import React from "react"
import { Logo } from "./Logo"
import {
  LayoutDashboard,
  Bot,
  Wand2,
  Inbox,
  TrendingUp,
  CreditCard,
  Settings,
  ChevronDown,
  Lock,
  Headphones,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
}) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "agents", label: "Agents", icon: Bot, count: "6" },
    { id: "builder", label: "Invent Studio", icon: Wand2, highlight: true },
    { id: "desk", label: "Desk", icon: Inbox, locked: true },
    { id: "usage", label: "Usage", icon: TrendingUp },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 bg-[#F4F4F6] border-r border-slate-200/80 transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Header & Workspace Switcher */}
      <div className="p-3.5 space-y-3">
        {/* Brand & Collapse toggle */}
        <div className="flex items-center justify-between">
          {!collapsed && <Logo showText={true} size="md" />}
          {collapsed && <Logo showText={false} size="md" />}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Workspace Dropdown */}
        {!collapsed && (
          <button className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all group">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-5 h-5 rounded-md bg-brand-500 text-white flex items-center justify-center font-bold text-[10px]">
                S
              </div>
              <span className="text-xs font-semibold text-slate-800 truncate">
                Sagar's workspace
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-700 transition-colors" />
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              disabled={item.locked}
              className={`w-full flex items-center ${
                collapsed ? "justify-center px-0" : "justify-between px-3"
              } py-2.5 rounded-xl text-xs font-medium transition-all ${
                item.locked
                  ? "text-slate-500 cursor-not-allowed opacity-60"
                  : isActive
                    ? "bg-slate-900 text-white font-semibold shadow-sm"
                    : item.highlight
                      ? "text-brand-600 hover:bg-brand-50/80 font-semibold"
                      : "text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? "text-white"
                      : item.highlight
                        ? "text-brand-500"
                        : "text-slate-500"
                  }`}
                />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!collapsed && (
                <div className="flex items-center gap-1.5">
                  {item.count && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  {item.locked && <Lock className="w-3 h-3 text-slate-500" />}
                </div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Section (Usage Meter & User Profile) */}
      <div className="p-3 border-t border-slate-200/80 space-y-3 bg-[#F4F4F6]">
        {/* Usage Progress Meter */}
        {!collapsed && (
          <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
              <span>Conversations</span>
              <span className="font-mono text-slate-900 font-bold">0 / 25</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-brand-500 h-full rounded-full w-[0%]" />
            </div>
          </div>
        )}

        {/* User Info & Quick Action Icons */}
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-2xs">
              S
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-800 truncate">
                  Sagar
                </p>
                <p className="text-[10px] text-slate-500 font-medium truncate">
                  sagar@lyzr.ai
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="flex items-center gap-1 text-slate-500">
              <button className="p-1 rounded-md hover:text-slate-800 hover:bg-slate-200/60 transition-colors">
                <Headphones className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded-md hover:text-slate-800 hover:bg-slate-200/60 transition-colors relative">
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-brand-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
