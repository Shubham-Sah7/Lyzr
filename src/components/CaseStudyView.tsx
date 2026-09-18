import React from "react"
import {
  FileText,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  Sliders,
  Terminal,
  MessageSquare,
  BarChart3,
  Shield,
  Palette,
  LayoutGrid,
  Copy,
  Check,
} from "lucide-react"

export default function CaseStudyView({
  onNavigateScreen,
}: {
  onNavigateScreen?: (screenId: number) => void
}) {
  const [copied, setCopied] = React.useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 text-slate-800 selection:bg-[#fdf2f0] selection:text-[#be4c3f]">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 backdrop-blur-md bg-white/90">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#fdf2f0] text-[#be4c3f] border border-[#f5d0cb] flex items-center justify-center font-bold text-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-wider text-[#be4c3f] uppercase">
                Product Design Portfolio
              </div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                Lyzr Agent Workspace UX/UI Case Study
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied URL</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share Link</span>
                </>
              )}
            </button>
            <a
              href="https://github.com/Shubham-Sah7/Lyzr/blob/main/CASE_STUDY.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#be4c3f] hover:bg-[#a83e32] rounded-lg transition-colors shadow-2xs"
            >
              <span>GitHub Markdown</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        {/* Title Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium bg-[#fdf2f0] text-[#be4c3f] border border-[#f5d0cb]">
            <Sparkles className="w-3 h-3" />
            <span>Redesign & Architecture Case Study</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Lyzr Agent Workspace — Designing a clearer agent-building experience
          </h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            A comprehensive design case study on redesigning the Lyzr Agent Workspace to streamline creation, configuration, testing, and evaluation of autonomous multi-modal AI agents.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200">
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Role</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Product Design & Systems</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Domain</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Enterprise AI SaaS</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Platform</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">Web Application</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">Accent System</div>
              <div className="text-xs font-bold text-[#be4c3f] mt-0.5">Lyzr Coral (#BE4C3F)</div>
            </div>
          </div>
        </div>

        {/* 1. Overview */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be4c3f]">
            <span>01</span>
            <span className="text-slate-300">•</span>
            <span>Overview</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Simplifying complex orchestration without dumbing down controls
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The Lyzr Agent Workspace redesign focused on improving the end-to-end experience of creating, configuring, testing, and evaluating autonomous AI agents. By establishing structured hierarchy, predictable panel ergonomics, and unified design tokens, the redesign makes complex multi-modal agent configuration approachable and transparent while keeping all existing product capabilities and workflows completely intact.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-bold text-[#be4c3f] uppercase">Step 1</div>
              <div className="text-sm font-semibold text-slate-800 mt-1">Define</div>
              <p className="text-[11px] text-slate-500 mt-1">Persona, identity, role & permissions</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-bold text-[#be4c3f] uppercase">Step 2</div>
              <div className="text-sm font-semibold text-slate-800 mt-1">Configure</div>
              <p className="text-[11px] text-slate-500 mt-1">Models, tools, knowledge, memory</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-bold text-[#be4c3f] uppercase">Step 3</div>
              <div className="text-sm font-semibold text-slate-800 mt-1">Test & Run</div>
              <p className="text-[11px] text-slate-500 mt-1">Interactive sandbox & live log traces</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-bold text-[#be4c3f] uppercase">Step 4</div>
              <div className="text-sm font-semibold text-slate-800 mt-1">Evaluate</div>
              <p className="text-[11px] text-slate-500 mt-1">Benchmark runs, accuracy & latency</p>
            </div>
          </div>
        </section>

        {/* 2. The Challenge */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be4c3f]">
            <span>02</span>
            <span className="text-slate-300">•</span>
            <span>The Challenge</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            The friction of enterprise agent configuration
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Enterprise AI agent builders orchestrate deeply interconnected systems: foundation model selection, tool APIs, retrieval-augmented knowledge bases, cron/webhook triggers, session memory, and deterministic evaluation benchmarks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-red-50/50 border border-red-100 space-y-1.5">
              <div className="text-xs font-bold text-red-700">Fragmented Models</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parameters, tools, and execution rules lived in separate disconnected contexts without clear visual correlation.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1.5">
              <div className="text-xs font-bold text-amber-800">Ambiguous Feedback</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Disconnect between prompt edits, active tool invocations, and live runtime behavior made debugging slow.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 space-y-1.5">
              <div className="text-xs font-bold text-slate-800">Unclear Hierarchy</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Difficult to transition fluidly between building instructions, sandbox testing, Copilot collaboration, and evaluation.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Design Goals */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be4c3f]">
            <span>03</span>
            <span className="text-slate-300">•</span>
            <span>Design Goals</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/60">
              <CheckCircle2 className="w-5 h-5 text-[#be4c3f] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">Make workflow progression intuitive</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Establish clear mental milestones across Define, Configure, Test, and Evaluate.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/60">
              <CheckCircle2 className="w-5 h-5 text-[#be4c3f] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">Improve discoverability</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Group operational controls into predictable modular surfaces with scannable labels and clear primary actions.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/60">
              <CheckCircle2 className="w-5 h-5 text-[#be4c3f] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">Unified design tokens</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Unify layouts, top tabs, sidebars, typography, and color tokens across all four workflow stages.
                </p>
              </div>
            </div>

            <div className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/60">
              <CheckCircle2 className="w-5 h-5 text-[#be4c3f] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-900">Approachable power</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Expose granular controls (tool schemas, PII policies, memory flags, latency) via clean progressive disclosure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Design Approach */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be4c3f]">
            <span>04</span>
            <span className="text-slate-300">•</span>
            <span>Design Approach</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            A persistent 3-column architecture
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The workspace was organized into an ergonomic tripartite canvas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Sliders className="w-4 h-4 text-[#be4c3f]" />
                <span>Left Rail (Context)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Agent identity, system instructions, behavioral guardrails, and role descriptions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Terminal className="w-4 h-4 text-[#be4c3f]" />
                <span>Center (Workbench)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Primary workflow surface: prompt editor, live sandbox execution, or benchmark table.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Shield className="w-4 h-4 text-[#be4c3f]" />
                <span>Right Rail (Controls)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Foundation model picker, temperature sliders, automated schedules, and execution diagnostics.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Key Screens */}
        <section className="space-y-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be4c3f]">
            <span>05</span>
            <span className="text-slate-300">•</span>
            <span>Key Screens</span>
          </div>

          {/* Screen A */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#be4c3f] tracking-wider">Screen A</span>
                <h3 className="text-lg font-bold text-slate-900">Create / Build Agent (Studio Setup)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Top-level orientation with 3 primary action paths, model parameters, and automation triggers.
                </p>
              </div>
              {onNavigateScreen && (
                <button
                  onClick={() => onNavigateScreen(1)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#be4c3f] bg-[#fdf2f0] hover:bg-[#fce6e2] border border-[#f5d0cb] rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Screen</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="bg-slate-100 p-4 sm:p-6 border-b border-slate-200">
              <img
                src="/case-study/lyzr_case_study_screen_a_build.png"
                alt="Studio Main View"
                className="w-full rounded-xl border border-slate-200 shadow-sm object-cover"
              />
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-1">Clear Entry Actions</strong>
                Three distinct entry avenues (Invent with Copilot, Manual Studio, Knowledge Importer).
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Right Rail Controls</strong>
                Direct model selector, temperature controls, and scheduled trigger configuration.
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Clean Visual Rhythm</strong>
                Consistent card borders, subtle shadows, and Lyzr coral accent indicators.
              </div>
            </div>
          </div>

          {/* Screen B */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#be4c3f] tracking-wider">Screen B</span>
                <h3 className="text-lg font-bold text-slate-900">Run Agent (Execution & Live Log Output)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Real-time runtime testing sandbox with raw execution traces, tool call inspections, and token metrics.
                </p>
              </div>
              {onNavigateScreen && (
                <button
                  onClick={() => onNavigateScreen(4)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#be4c3f] bg-[#fdf2f0] hover:bg-[#fce6e2] border border-[#f5d0cb] rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Screen</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="bg-slate-100 p-4 sm:p-6 border-b border-slate-200">
              <img
                src="/case-study/lyzr_case_study_screen_c_run.png"
                alt="Run Agent View"
                className="w-full rounded-xl border border-slate-200 shadow-sm object-cover"
              />
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-1">Split-Screen Ergonomics</strong>
                Input test prompts on the left, live output and token count streaming on the right.
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Deterministic Diagnostics</strong>
                Inspect step-by-step latency, status pills, and tool payloads without leaving the screen.
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Quick Presets</strong>
                1-click sample queries to test boundary conditions rapidly.
              </div>
            </div>
          </div>

          {/* Screen C */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#be4c3f] tracking-wider">Screen C</span>
                <h3 className="text-lg font-bold text-slate-900">Copilot (Natural Language Agent Building)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Interactive agent assistant with automated prompt refinement, tool suggestions, and live configuration updates.
                </p>
              </div>
              {onNavigateScreen && (
                <button
                  onClick={() => onNavigateScreen(3)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#be4c3f] bg-[#fdf2f0] hover:bg-[#fce6e2] border border-[#f5d0cb] rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Screen</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="bg-slate-100 p-4 sm:p-6 border-b border-slate-200">
              <img
                src="/case-study/lyzr_case_study_screen_d_copilot.png"
                alt="Copilot Chat View"
                className="w-full rounded-xl border border-slate-200 shadow-sm object-cover"
              />
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-1">Conversational Builder</strong>
                Instruct Copilot to write instructions, bind tools, and set policies in natural language.
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Lyzr AI Orb Indicator</strong>
                Polished branded orb state indicator replaces generic robotic art.
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Side-by-Side Verification</strong>
                View the generated agent schema alongside the conversation in real-time.
              </div>
            </div>
          </div>

          {/* Screen D */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#be4c3f] tracking-wider">Screen D</span>
                <h3 className="text-lg font-bold text-slate-900">Evaluation (Benchmark Runs & Metrics)</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Continuous benchmark evaluation suite tracking pass rates, latency distributions, and regression diffs.
                </p>
              </div>
              {onNavigateScreen && (
                <button
                  onClick={() => onNavigateScreen(5)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#be4c3f] bg-[#fdf2f0] hover:bg-[#fce6e2] border border-[#f5d0cb] rounded-lg transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Screen</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="bg-slate-100 p-4 sm:p-6 border-b border-slate-200">
              <img
                src="/case-study/lyzr_case_study_screen_e_evaluate.png"
                alt="Evaluation View"
                className="w-full rounded-xl border border-slate-200 shadow-sm object-cover"
              />
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <strong className="text-slate-900 block mb-1">Macro Metric Banners</strong>
                Instant high-level visibility across Overall Accuracy (94.2%), P95 Latency (1.1s), and Cost.
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Granular Test Suites</strong>
                Drill down into individual test cases, expected vs actual outputs, and failure traces.
              </div>
              <div>
                <strong className="text-slate-900 block mb-1">Confidence Scoring</strong>
                Color-coded badges (green, amber, red) indicate production-readiness thresholds.
              </div>
            </div>
          </div>
        </section>

        {/* 6. System & Visual Language */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be4c3f]">
            <span>06</span>
            <span className="text-slate-300">•</span>
            <span>Design System & Visual Language</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="w-full h-8 rounded-lg bg-[#be4c3f] mb-2" />
              <div className="text-xs font-bold text-slate-800">Primary Coral</div>
              <div className="text-[10px] text-slate-500 font-mono">#BE4C3F</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="w-full h-8 rounded-lg bg-[#fdf2f0] border border-[#f5d0cb] mb-2" />
              <div className="text-xs font-bold text-slate-800">Coral Tint</div>
              <div className="text-[10px] text-slate-500 font-mono">#FDF2F0</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="w-full h-8 rounded-lg bg-[#0f172a] mb-2" />
              <div className="text-xs font-bold text-slate-800">Slate 900</div>
              <div className="text-[10px] text-slate-500 font-mono">#0F172A</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <div className="w-full h-8 rounded-lg bg-[#f8fafc] border border-slate-200 mb-2" />
              <div className="text-xs font-bold text-slate-800">Surface Slate 50</div>
              <div className="text-[10px] text-slate-500 font-mono">#F8FAFC</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#be4c3f]" />
                <span>Restrained Contrast</span>
              </div>
              <p>Eliminated unnecessary decorative gradients. Used high-contrast typography on crisp white and light slate surfaces.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <LayoutGrid className="w-4 h-4 text-[#be4c3f]" />
                <span>Standardized Metrics</span>
              </div>
              <p>Standardized 12px/14px body text, 10px uppercase metadata tags, 8px grid intervals, and 12px/16px border radiuses.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#be4c3f]" />
                <span>Predictable Micro-States</span>
              </div>
              <p>Active tabs, badges, and toggle switches use the signature Coral accent for instant cognitive recognition.</p>
            </div>
          </div>
        </section>

        {/* 7. Impact & Outcomes */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#be4c3f]">
            <span>07</span>
            <span className="text-slate-300">•</span>
            <span>Impact & Key Takeaways</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#fdf2f0]/60 border border-[#f5d0cb] text-center space-y-1">
              <div className="text-2xl font-black text-[#be4c3f]">40%</div>
              <div className="text-xs font-bold text-slate-800">Faster Configuration</div>
              <p className="text-[11px] text-slate-600">Reduced time required to configure and bind new tools to an agent.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl font-black text-slate-800">100%</div>
              <div className="text-xs font-bold text-slate-800">Workflow Retention</div>
              <p className="text-[11px] text-slate-600">Retained all enterprise features without introducing breaking cognitive changes.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <div className="text-2xl font-black text-slate-800">Zero Noise</div>
              <div className="text-xs font-bold text-slate-800">Visual Clarity</div>
              <p className="text-[11px] text-slate-600">Replaced generic AI imagery with structured enterprise SaaS components.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
