import React from "react"
import { Database, Zap, Calendar } from "lucide-react"
import { SlackIcon, SheetsIcon, GmailIcon } from "./ToolIcons"

const a = "/assets"

// PNG card images
const imgWebResearcher = `${a}/277a9.png`
const imgMeetingPrepper = `${a}/a0153.png`
const imgEmailAssistant = `${a}/f6875.png`

interface CardProps {
  cardW?: number
  imgH?: number
}

function TypeSlashCard({ cardW = 230, imgH = 129 }: CardProps) {
  return (
    <div className="bg-white flex flex-col justify-between overflow-hidden relative rounded-2xl w-full h-full border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-md group">
      {/* Solid filled banner area */}
      <div className="w-full h-32 bg-[#EBF3FF] relative overflow-hidden flex items-center justify-center select-none">
        {/* Layered decorative background cards */}
        <div className="absolute w-20 h-24 bg-[#D5F5DE] border border-[#BCECCB] rounded-2xl rotate-[-14deg] translate-x-[-40px] translate-y-[2px] shadow-xs" />
        <div className="absolute w-20 h-24 bg-[#FEF6E6] border border-[#FDEAC4] rounded-2xl rotate-[16deg] translate-x-[44px] translate-y-[6px] shadow-xs" />

        {/* Floating Tool Cards */}
        <div className="relative flex items-center justify-center gap-3 z-10">
          {/* Card 1: Slack Tool */}
          <div className="w-14 h-16 bg-white rounded-xl shadow-sm border border-slate-200/90 flex flex-col items-center justify-center p-2 rotate-[-5deg] group-hover:rotate-[-2deg] transition-transform duration-200">
            <SlackIcon className="w-8 h-8 shrink-0" />
          </div>

          {/* Card 2: Google Sheets Tool */}
          <div className="w-14 h-16 bg-white rounded-xl shadow-md border border-slate-200/90 flex flex-col items-center justify-center p-2 rotate-[6deg] group-hover:rotate-[3deg] transition-transform duration-200">
            <SheetsIcon className="w-8 h-8 shrink-0" />
          </div>

          {/* Card 3: Gmail Tool */}
          <div className="w-10 h-12 bg-white rounded-lg shadow-xs border border-slate-200/80 flex items-center justify-center p-1.5 rotate-[16deg] translate-x-[-2px] translate-y-[-6px]">
            <GmailIcon className="w-5 h-5 shrink-0" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start p-4 relative w-full flex-1 justify-between">
        <div>
          <p className="font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-black transition-colors">
            Type "/" to add tools
          </p>
          <p className="leading-relaxed text-xs text-slate-600 mb-3.5">
            Connect services your agent can act on (e.g. Slack, Google Sheets)
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-2xs">
          <span>Add tools</span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </div>
  )
}

function AddKnowledgeCard({ cardW = 230, imgH = 129 }: CardProps) {
  return (
    <div className="bg-white flex flex-col justify-between overflow-hidden relative rounded-2xl w-full h-full border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-md group">
      <div className="w-full h-32 bg-[#F1F5F9] relative overflow-hidden flex items-center justify-center select-none">
        {/* Crisp Neutral Document Stack Illustration */}
        <div className="relative w-28 h-20 flex items-center justify-center">
          <div className="absolute top-1 w-20 h-14 bg-white/95 rounded-md border border-slate-200 shadow-2xs rotate-[-6deg] p-2 space-y-1.5 group-hover:rotate-[-4deg] transition-transform">
            <div className="w-8 h-1 bg-slate-300 rounded" />
            <div className="w-14 h-1 bg-slate-200 rounded" />
            <div className="w-10 h-1 bg-slate-200 rounded" />
          </div>
          <div className="absolute top-2 w-20 h-14 bg-white rounded-md border border-slate-200 shadow-2xs rotate-[4deg] p-2 space-y-1.5 group-hover:rotate-[2deg] transition-transform">
            <div className="w-10 h-1 bg-slate-400 rounded" />
            <div className="w-12 h-1 bg-slate-200 rounded" />
            <div className="w-8 h-1 bg-slate-200 rounded" />
          </div>
          <div className="absolute bottom-0 w-24 h-11 bg-slate-900 rounded-t-lg shadow-md border-t border-slate-800 flex items-center justify-center text-white">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-tight text-slate-200">
              <Database className="w-3.5 h-3.5 text-slate-300" />
              <span>Knowledge Store</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start p-4 relative w-full flex-1 justify-between">
        <div>
          <p className="font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-black transition-colors">
            Add knowledge
          </p>
          <p className="leading-relaxed text-xs text-slate-600 mb-3.5">
            Upload documents or FAQs your agent can reference
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-2xs">
          <span>Add knowledge</span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </div>
  )
}

function SetTriggerCard({ cardW = 230, imgH = 129 }: CardProps) {
  return (
    <div className="bg-white flex flex-col justify-between overflow-hidden relative rounded-2xl w-full h-full border border-slate-200 hover:border-slate-300 transition-all shadow-2xs hover:shadow-md group">
      <div className="w-full h-32 bg-[#FFF4ED] relative overflow-hidden flex items-center justify-center select-none">
        {/* Layered trigger badges */}
        <div className="absolute w-20 h-24 bg-[#FFE8D6] border border-[#FFD8BA] rounded-2xl rotate-[12deg] translate-x-[38px] shadow-xs" />
        <div className="relative flex items-center justify-center gap-2.5 z-10">
          <div className="px-3 py-2 bg-white rounded-xl shadow-sm border border-slate-200/90 flex items-center gap-2 rotate-[-6deg] group-hover:rotate-[-3deg] transition-transform">
            <Zap className="w-4 h-4 text-[#be4c3f]" />
            <div className="text-[11px] font-bold text-slate-800">
              Cron 0 * * *
            </div>
          </div>
          <div className="px-3 py-2 bg-white rounded-xl shadow-md border border-slate-200/90 flex items-center gap-2 rotate-[5deg] group-hover:rotate-[2deg] transition-transform">
            <Calendar className="w-4 h-4 text-amber-600" />
            <div className="text-[11px] font-bold text-slate-800">Webhook</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start p-4 relative w-full flex-1 justify-between">
        <div>
          <p className="font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-black transition-colors">
            Set trigger
          </p>
          <p className="leading-relaxed text-xs text-slate-600 mb-3.5">
            Set when your agent runs (schedule, event, keyword)
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-2xs">
          <span>Set trigger</span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </div>
  )
}

interface TemplateCardsProps {
  cardW?: number
  imgH?: number
  gap?: number
  selectedTitle?: string
  onSelectTemplate?: (template: {
    title: string
    desc: string
    prompt: string
    tools: string[]
    tags?: string[]
  }) => void
  onAddTools?: () => void
  onAddKnowledge?: () => void
  onAddTriggers?: () => void
}

export default function TemplateCards({
  cardW = 230,
  imgH = 129,
  gap = 12,
  selectedTitle,
  onSelectTemplate,
  onAddTools,
  onAddKnowledge,
  onAddTriggers,
}: TemplateCardsProps) {
  const cards1 = [
    {
      title: "Web Researcher",
      desc: "Search the web and summarize findings with citations",
      btn: "Use template",
      img: imgWebResearcher,
      prompt:
        "You are an expert Web Researcher agent. Given any company, topic, or market question, search public web sources, parse recent articles, extract key financial/product metrics, and produce a concise executive briefing with source citations.",
      tools: ["Web Search", "Google Sheets"],
      tags: ["Web", "Research", "Summarization"],
    },
    {
      title: "Meeting Prepper",
      desc: "Prepare for meetings, gather attendee context and draft follow-ups",
      btn: "Use template",
      img: imgMeetingPrepper,
      prompt:
        "You are an executive Meeting Prepper agent. Monitor the user's calendar for upcoming client and team meetings. Automatically pull LinkedIn profiles, past email threads, and CRM notes to create a 1-page briefing doc 15 minutes before call time.",
      tools: ["Gmail", "Slack", "Google Sheets"],
      tags: ["Calendar", "LinkedIn", "Productivity"],
    },
    {
      title: "Email Assistant",
      desc: "Draft, triage, and respond to incoming emails professionally",
      btn: "Use template",
      img: imgEmailAssistant,
      prompt:
        "You are an AI Email Assistant. Classify incoming emails into Urgent, Inquiries, Updates, and Spam. For important emails, draft high-empathy, precise responses ready for one-click approval. Notify urgent items in Slack.",
      tools: ["Gmail", "Slack"],
      tags: ["Email", "Support", "Automation"],
    },
  ]

  const handleApply = (c: typeof cards1[0]) => {
    if (onSelectTemplate) {
      onSelectTemplate(c)
    }
  }

  return (
    <div className="flex flex-col items-start w-full">
      {/* 3 Reference Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full items-stretch">
        {cards1.map((c, idx) => {
          const isSelected = selectedTitle === c.title
          const bannerBg =
            idx === 0
              ? "bg-[#FFF5F4]"
              : idx === 1
                ? "bg-[#FFF9F2]"
                : "bg-[#F4F7FB]"
          const flowImg = c.img

          return (
            <div
              key={c.title}
              onClick={() => handleApply(c)}
              className={`group transition-all flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer shadow-2xs hover:shadow-md h-full ${
                isSelected
                  ? "border border-[#be4c3f] bg-white shadow-xs"
                  : "border border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {/* Flow Banner Area */}
              <div
                className={`relative shrink-0 w-full h-32 ${bannerBg} flex items-center justify-center p-3 overflow-hidden select-none`}
              >
                <img
                  src={flowImg}
                  alt={c.title}
                  className="h-full w-full object-contain pointer-events-none group-hover:scale-[1.02] transition-transform duration-200"
                />
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#be4c3f] text-white text-[10px] font-bold shadow-xs">
                    Active
                  </span>
                )}
              </div>

              {/* Text & Tags */}
              <div className="flex flex-col items-start p-4 relative w-full flex-1 justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-[#be4c3f] transition-colors">
                    {c.title}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {c.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap mb-3.5">
                    {c.tags.map((tag, tagIdx) => {
                      const isTagActive = isSelected && tagIdx === 0
                      return (
                        <span
                          key={tag}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full transition-colors ${
                            isTagActive
                              ? "bg-[#be4c3f] text-white font-bold"
                              : "bg-slate-100 text-slate-700 font-semibold border border-slate-200/60"
                          }`}
                        >
                          {tag}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                    isSelected
                      ? "bg-[#be4c3f] hover:bg-[#a83e32] text-white"
                      : "bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white"
                  }`}
                >
                  <span>{isSelected ? "Template Active" : c.btn}</span>
                  <span className="text-xs">→</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Row 2: illustration action cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full mt-3.5 items-stretch">
        <div
          onClick={() =>
            onAddTools
              ? onAddTools()
              : onSelectTemplate?.({
                  title: "Tools & Skills Agent",
                  desc: "Custom tool execution pipeline",
                  prompt:
                    "You are a versatile tool execution agent. Execute registered tool functions with validated JSON schemas and handle API errors gracefully.",
                  tools: ["Web Search", "Google Sheets", "Slack"],
                  tags: ["Tools", "API", "Custom"],
                })
          }
          className="cursor-pointer hover:ring-1 hover:ring-[#be4c3f] rounded-2xl transition-all shadow-2xs hover:shadow-md h-full flex flex-col"
          title="Click to open Tools manager"
        >
          <TypeSlashCard cardW={cardW} imgH={imgH} />
        </div>

        <div
          onClick={() =>
            onAddKnowledge
              ? onAddKnowledge()
              : onSelectTemplate?.({
                  title: "Document Knowledge RAG",
                  desc: "Semantic document search and retrieval",
                  prompt:
                    "You are a Knowledge Retrieval Specialist. Answer questions grounded strictly in the provided company documents. If facts are not in the index, state clearly that information is unavailable.",
                  tools: ["Google Sheets"],
                  tags: ["RAG", "Knowledge", "Docs"],
                })
          }
          className="cursor-pointer hover:ring-1 hover:ring-[#be4c3f] rounded-2xl transition-all shadow-2xs hover:shadow-md h-full flex flex-col"
          title="Click to add Knowledge & Documents"
        >
          <AddKnowledgeCard cardW={cardW} imgH={imgH} />
        </div>

        <div
          onClick={() =>
            onAddTriggers
              ? onAddTriggers()
              : onSelectTemplate?.({
                  title: "Event-Triggered Sentinel",
                  desc: "Automated event listener and watcher",
                  prompt:
                    "You are an Event Sentinel agent. Listen to inbound webhook triggers and scheduled cron pulses. Run data verification and dispatch alert summaries to Slack.",
                  tools: ["Slack", "Gmail"],
                  tags: ["Events", "Triggers", "Cron"],
                })
          }
          className="cursor-pointer hover:ring-1 hover:ring-[#be4c3f] rounded-2xl transition-all shadow-2xs hover:shadow-md h-full flex flex-col"
          title="Click to configure Triggers"
        >
          <SetTriggerCard cardW={cardW} imgH={imgH} />
        </div>
      </div>
    </div>
  )
}
