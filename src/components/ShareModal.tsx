import React, { useState } from "react"
import { X, Copy, Check, Link2, Mail, Users, Globe } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  agentTitle?: string
  agentName?: string
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  agentTitle,
  agentName,
}) => {
  if (!isOpen) return null
  const effectiveTitle = agentTitle || agentName || "Untitled agent"

  const [copied, setCopied] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [invitedList, setInvitedList] = useState<string[]>([
    "sarah.chen@company.com",
  ])
  const shareUrl = `https://studio.lyzr.ai/agents/share/agt_${Math.abs(effectiveTitle.length * 9481).toString(16)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    setInvitedList((prev) => [...prev, inviteEmail.trim()])
    setInviteEmail("")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-lg max-w-lg w-full p-5 shadow-xl border border-slate-200 relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-xs">
                Share & Collaborate
              </h3>
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

        {/* Public Share Link */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            Public Agent Link
          </label>
          <div className="flex items-center gap-2 p-1 border border-slate-200 rounded-md bg-slate-50 focus-within:border-slate-900">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 text-xs bg-transparent text-slate-700 outline-none px-2 font-mono font-medium"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-xs font-medium text-slate-700 shadow-2xs transition-colors"
            >
              {copied ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Invite by Email */}
        <form onSubmit={handleInvite} className="mb-4">
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            Invite Teammates
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="colleague@company.com"
              className="flex-1 text-xs px-3 py-1.5 border border-slate-200 rounded-md outline-none focus:border-slate-900 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#be4c3f] hover:bg-[#a83e32] text-white text-xs font-medium rounded-md shadow-2xs transition-colors"
            >
              Invite
            </button>
          </div>
        </form>

        {/* Team Members List */}
        <div>
          <span className="block text-xs font-medium text-slate-700 mb-1.5">
            Workspace Collaborators
          </span>
          <div className="space-y-1 max-h-36 overflow-y-auto">
            {invitedList.map((email, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded-md bg-slate-50 border border-slate-200/60 text-xs"
              >
                <span className="text-slate-700 font-medium">{email}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-medium">
                  {i === 0 ? "Admin" : "Editor"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShareModal
