import React from "react"
import { Database } from "lucide-react"

const a = "/assets"

// PNG card images
const imgWebResearcher = `${a}/277a9.png`
const imgMeetingPrepper = `${a}/a0153.png`
const imgEmailAssistant = `${a}/f6875.png`

// SVG parts for "Type / to add tools" card (screen 1 assets)
const imgV = `${a}/5bb4c.svg`
const imgV1 = `${a}/4352f.svg`
const imgV13 = `${a}/96bf2.svg`
const imgV14 = `${a}/f0f7f.svg`
const imgV15 = `${a}/d966e.svg`
const imgV16 = `${a}/60437.svg`
const imgV17 = `${a}/dec46.svg`
const imgV18 = `${a}/1ef1a.svg`
const imgV19 = `${a}/c5294.svg`
const imgV20 = `${a}/3b6ab.svg`
const imgV21 = `${a}/40c68.svg`
const imgV22 = `${a}/24349.svg`
const imgV23 = `${a}/be2d6.svg`
const imgV24 = `${a}/ad495.svg`
const imgV25 = `${a}/fc100.svg`
const imgV26 = `${a}/b5530.svg`
const imgV27 = `${a}/88604.svg`
const imgV28 = `${a}/11ee3.svg`
const imgV29 = `${a}/458dd.svg`
const imgV30 = `${a}/d3bb9.svg`
const imgV31 = `${a}/e29a8.svg`

// PNG parts for "Set trigger" card (screen 1)
const imgV48 = `${a}/e24ab.png`
const imgV49 = `${a}/fa4e3.png`
const imgV50 = `${a}/89ed5.png`
const imgV51 = `${a}/3450e.png`
const imgV52 = `${a}/45142.png`
const imgV53 = `${a}/b93cf.png`
const imgV47 = `${a}/02e0b.svg`

interface CardProps {
  cardW?: number
  imgH?: number
}

function TypeSlashCard({ cardW = 230, imgH = 129 }: CardProps) {
  return (
    <div className="bg-[#f9f9fb] flex flex-col items-start overflow-clip relative rounded-2xl w-full border border-slate-200/80 hover:border-slate-400 hover:bg-slate-50/50 transition-all shadow-2xs group">
      <div
        className="flex flex-col items-start overflow-clip relative shrink-0 w-full"
        style={{ height: imgH }}
      >
        <div
          className="overflow-clip relative shrink-0 w-full"
          style={{ height: imgH }}
        >
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.0981}px 0 0 0` }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV}
            />
          </div>
          <div
            className="absolute flex items-center justify-center"
            style={{ inset: `${imgH * 0.3126}px 52% ${imgH * 0.2662}px 23%` }}
          >
            <div
              className="flex-none"
              style={{ transform: "rotate(-8.94deg)" }}
            >
              <div
                className="relative"
                style={{ width: 55, height: imgH * 0.58 }}
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgV1}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute"
            style={{
              inset: `${imgH * 0.2382}px 42% ${imgH * 0.3815}px 36%`,
              maskImage: `url("${imgV13}")`,
              maskSize: `48px ${imgH * 0.381}px`,
            }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV14}
            />
          </div>
          <div
            className="absolute"
            style={{
              inset: `${imgH * 0.2382}px 42% ${imgH * 0.3815}px 36%`,
              maskImage: `url("${imgV13}"), url("${imgV15}")`,
              maskSize: `48px ${imgH * 0.381}px, 48px ${imgH * 0.381}px`,
              maskPosition: `3.5px 0.44px, 3.5px 0.44px`,
            }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV16}
            />
          </div>
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.2441}px 42% ${imgH * 0.3874}px 36%` }}
          >
            <div className="absolute" style={{ inset: "-1.61%" }}>
              <img alt="" className="block max-w-none size-full" src={imgV17} />
            </div>
          </div>
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.4279}px 52% ${imgH * 0.4836}px 41%` }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV18}
            />
          </div>
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.3293}px 52% ${imgH * 0.5821}px 41%` }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV19}
            />
          </div>
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.3293}px 47% ${imgH * 0.5821}px 47%` }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV20}
            />
          </div>
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.4279}px 47% ${imgH * 0.4836}px 47%` }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV21}
            />
          </div>
          {/* Right arrow side */}
          <div
            className="absolute flex items-center justify-center"
            style={{ inset: `${imgH * 0.3182}px 22% ${imgH * 0.2511}px 53%` }}
          >
            <div
              className="flex-none"
              style={{ transform: "rotate(10.75deg)" }}
            >
              <div
                className="relative"
                style={{ width: 52, height: imgH * 0.55 }}
              >
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgV22}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.3182}px 22% ${imgH * 0.2511}px 53%` }}
          >
            <div
              className="flex-none absolute inset-0"
              style={{ transform: "rotate(10.75deg)" }}
            >
              <div className="absolute inset-[-1.61%]">
                <img
                  alt=""
                  className="block max-w-none size-full"
                  src={imgV23}
                />
              </div>
            </div>
          </div>
          <div
            className="absolute"
            style={{
              inset: `${imgH * 0.3029}px 14% ${imgH * 0.0808}px 49%`,
              maskImage: `url("${imgV24}")`,
              maskSize: `55px ${imgH * 0.44}px`,
              maskPosition: "6.8px 1.1px",
            }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV25}
            />
          </div>
          {/* Slack-like icon row */}
          <div
            className="absolute"
            style={{
              inset: `${imgH * 0.4243}px 33% ${imgH * 0.4751}px 60%`,
              maskImage: `url("${imgV26}"), url("${imgV27}")`,
              maskSize: "34.9px 34.2px, 27.9px 27.4px",
              maskPosition: "-5.8px -3.4px, -2.3px 0px",
            }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV28}
            />
          </div>
          <div
            className="absolute"
            style={{
              inset: `${imgH * 0.4424}px 28% ${imgH * 0.457}px 65%`,
              maskImage: `url("${imgV26}"), url("${imgV27}")`,
              maskSize: "34.9px 34.2px, 27.9px 27.4px",
              maskPosition: "-18.1px -5.8px, -14.6px -2.3px",
            }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV29}
            />
          </div>
          <div
            className="absolute"
            style={{
              inset: `${imgH * 0.5172}px 34% ${imgH * 0.3822}px 59%`,
              maskImage: `url("${imgV26}"), url("${imgV27}")`,
              maskSize: "34.9px 34.2px, 27.9px 27.4px",
              maskPosition: "-3.5px -15.5px, 0px -12px",
            }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV30}
            />
          </div>
          <div
            className="absolute"
            style={{
              inset: `${imgH * 0.5354}px 29% ${imgH * 0.3641}px 64%`,
              maskImage: `url("${imgV26}"), url("${imgV27}")`,
              maskSize: "34.9px 34.2px, 27.9px 27.4px",
              maskPosition: "-15.8px -17.8px, -12.4px -14.4px",
            }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV31}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start p-4 relative shrink-0 w-full">
        <p className="font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-black transition-colors">
          Type "/" to add tools
        </p>
        <p className="leading-relaxed text-xs text-slate-600 mb-3.5">
          Connect services your agent can act on (e.g. Slack, Google Sheets)
        </p>
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
    <div className="bg-[#f9f9fb] flex flex-col items-start overflow-clip relative rounded-2xl w-full border border-slate-200/80 hover:border-slate-400 hover:bg-slate-50/50 transition-all shadow-2xs group">
      <div
        className="flex flex-col items-center justify-center relative shrink-0 w-full bg-[#F1F5F9]"
        style={{ height: imgH }}
      >
        {/* Crisp Neutral Document Stack Illustration (Zero Purple) */}
        <div className="relative w-28 h-20 flex items-center justify-center">
          <div className="absolute top-1 w-20 h-14 bg-white/95 rounded-md border border-slate-200 shadow-2xs rotate-[-5deg] p-2 space-y-1.5">
            <div className="w-8 h-1 bg-slate-300 rounded" />
            <div className="w-14 h-1 bg-slate-200 rounded" />
            <div className="w-10 h-1 bg-slate-200 rounded" />
          </div>
          <div className="absolute top-2 w-20 h-14 bg-white rounded-md border border-slate-200 shadow-2xs rotate-[3deg] p-2 space-y-1.5">
            <div className="w-10 h-1 bg-slate-400 rounded" />
            <div className="w-12 h-1 bg-slate-200 rounded" />
            <div className="w-8 h-1 bg-slate-200 rounded" />
          </div>
          <div className="absolute bottom-0 w-24 h-12 bg-slate-900 rounded-t-lg shadow-md border-t border-slate-800 flex items-center justify-center text-white">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-tight text-slate-200">
              <Database className="w-3.5 h-3.5 text-slate-300" />
              <span>Knowledge Store</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start p-4 relative shrink-0 w-full">
        <p className="font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-black transition-colors">
          Add knowledge
        </p>
        <p className="leading-relaxed text-xs text-slate-600 mb-3.5">
          Upload documents or FAQs your agent can reference
        </p>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-2xs">
          <span>Add knowledge</span>
          <span className="text-xs">→</span>
        </div>
      </div>
    </div>
  )
}

function SetTriggerCard({ cardW = 230, imgH = 129 }: CardProps) {
  const positions = [
    { t: 0.1592, r: 0.65, b: 0.5422, l: 0.17 },
    { t: 0.1979, r: 0.26, b: 0.5035, l: 0.57 },
    { t: 0.5195, r: 0.41, b: 0.1819, l: 0.41 },
    { t: 0.1786, r: 0.45, b: 0.5228, l: 0.37 },
    { t: 0.5001, r: 0.61, b: 0.2013, l: 0.21 },
    { t: 0.5388, r: 0.21, b: 0.1626, l: 0.61 },
  ]
  const pngs = [imgV48, imgV49, imgV50, imgV51, imgV52, imgV53]

  return (
    <div className="bg-[#f9f9fb] flex flex-col items-start overflow-clip relative rounded-2xl w-full border border-slate-200/80 hover:border-slate-400 hover:bg-slate-50/50 transition-all shadow-2xs group">
      <div
        className="flex flex-col items-start overflow-clip relative shrink-0 w-full"
        style={{ height: imgH }}
      >
        <div
          className="overflow-clip relative shrink-0 w-full"
          style={{ height: imgH }}
        >
          <div
            className="absolute"
            style={{ inset: `${imgH * 0.0981}px 0 0 0` }}
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={imgV47}
            />
          </div>
          {positions.map((pos, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center"
              style={{
                top: `${pos.t * imgH}px`,
                right: `${pos.r * 100}%`,
                bottom: `${pos.b * imgH}px`,
                left: `${pos.l * 100}%`,
              }}
            >
              <img
                alt=""
                className="block"
                style={{
                  width: 32.7,
                  height: 32.7,
                  transform: "rotate(3.16deg)",
                }}
                src={pngs[i]}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start p-4 relative shrink-0 w-full">
        <p className="font-bold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-black transition-colors">
          Set trigger
        </p>
        <p className="leading-relaxed text-xs text-slate-600 mb-3.5">
          Set when your agent runs (schedule, event, keyword)
        </p>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full">
        {cards1.map((c, idx) => {
          const isSelected = selectedTitle === c.title
          const bannerBg =
            idx === 0
              ? "bg-[#fff5f4]"
              : idx === 1
                ? "bg-[#fff9f2]"
                : "bg-[#f4f7fb]"
          const flowImg = c.img

          return (
            <div
              key={c.title}
              onClick={() => handleApply(c)}
              className={`group transition-all flex flex-col items-start overflow-hidden rounded-xl cursor-pointer shadow-2xs hover:shadow-md ${
                isSelected
                  ? "border border-[#be4c3f] bg-white shadow-xs"
                  : "border border-slate-200/80 bg-white hover:border-slate-300"
              }`}
            >
              {/* Flow Banner Area */}
              <div
                className={`relative shrink-0 w-full h-24 ${bannerBg} flex items-center justify-center p-2 overflow-hidden select-none`}
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
              <div className="flex flex-col items-start p-4 relative shrink-0 w-full">
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
                            ? "bg-[#fceceb] text-[#be4c3f] font-semibold border border-[#f5d0cb]"
                            : "bg-slate-100 text-slate-700 font-semibold border border-slate-200/60"
                        }`}
                      >
                        {tag}
                      </span>
                    )
                  })}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full mt-3.5">
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
          className="cursor-pointer hover:ring-1 hover:ring-[#be4c3f] rounded-2xl transition-all shadow-2xs hover:shadow-md"
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
          className="cursor-pointer hover:ring-1 hover:ring-[#be4c3f] rounded-2xl transition-all shadow-2xs hover:shadow-md"
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
          className="cursor-pointer hover:ring-1 hover:ring-[#be4c3f] rounded-2xl transition-all shadow-2xs hover:shadow-md"
          title="Click to configure Triggers"
        >
          <SetTriggerCard cardW={cardW} imgH={imgH} />
        </div>
      </div>
    </div>
  )
}
