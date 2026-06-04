/**
 * Project 3 — 48-Hour Design-to-Code: Bakery Fair 2026
 * Rebuilt to match Figma (node 848-53006).
 * Sections exactly mirror Figma order — no extra sections.
 */

import { motion, useScroll, useTransform } from "motion/react";
import { FadeUp, Navbar, DetailFooter, CONTAINER_CLASS } from "./ProjectDetailPage";
import { useEffect, useRef } from "react";

// ─── 1. HERO ─────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText  = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="bg-[#111111] pt-[120px] sm:pt-[160px] lg:pt-[185px] pb-[80px] overflow-hidden">
      <div className={CONTAINER_CLASS}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 items-start lg:items-center">

          {/* Left */}
          <motion.div
            className="flex flex-col gap-[16px] flex-1"
            style={{ y: yText }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[13px] font-bold uppercase tracking-[2px] text-[#2563EB]">
              Bakery Fair 2026
            </span>
            <h1 className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] font-bold text-white">
              48-Hour<br />Design-to-Code
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] font-bold text-[#BBBBBB] max-w-[560px]">
              From CEO brief to 8 live signage screens in 4 hours —<br />
              a Code-First agile sprint executed with AI prompting alone.<br />
              No Figma. No handoff.
            </p>
            <div className="h-px w-full bg-[#DFDFDF]/20 my-[8px]" />
            <div className="flex flex-col gap-[16px]">
              {[
                ["Role",     "Solo Product Designer"],
                ["Timeline", "2026.04 · 4-hour sprint"],
                ["Output",   "Live signage screens"],
                ["Tools",    "AI Prompting · Browser · Code-First"],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[100px_1fr] items-start">
                  <span className="text-[16px] font-bold text-white">{label}</span>
                  <span className="text-[16px] font-normal text-[#BBBBBB]">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — p3_project03.gif + floating buttons */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex justify-center lg:justify-end w-full"
          >
            {/* Outer wrapper — provides room for floating buttons */}
            <div className="relative w-full max-w-[420px] lg:max-w-[448px]">

              {/* Phone mockup — rounded top corners, image overflows for depth */}
              <div className="relative w-full overflow-hidden rounded-tl-[32px] rounded-tr-[32px]" style={{ maxHeight: 620 }}>
                <img
                  src="/assets/p3_project03.gif"
                  alt="Bakery Avenue Production Flow signage screen"
                  className="w-full h-auto object-cover block"
                  style={{ transform: "scale(1.02)", transformOrigin: "top center" }}
                />
              </div>

              {/* Claude button — coral, bottom-left, overlaps phone edge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute flex items-center justify-center rounded-[16px] overflow-hidden shadow-xl"
                style={{
                  width: 88, height: 88,
                  background: "#D97757",
                  left: -20,
                  bottom: 60,
                }}
              >
                {/* Anthropic Claude asterisk icon */}
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="28" y1="6"  x2="28" y2="26" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="28" y1="30" x2="28" y2="50" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="6"  y1="28" x2="26" y2="28" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="30" y1="28" x2="50" y2="28" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="12.1" y1="12.1" x2="26.5" y2="26.5" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="29.5" y1="29.5" x2="43.9" y2="43.9" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="43.9" y1="12.1" x2="29.5" y2="26.5" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                  <line x1="26.5" y1="29.5" x2="12.1" y2="43.9" stroke="white" strokeWidth="5.5" strokeLinecap="round"/>
                </svg>
              </motion.div>

              {/* Code button — green, top-right, overlaps phone edge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute flex items-center justify-center rounded-[16px] overflow-hidden shadow-xl"
                style={{
                  width: 88, height: 88,
                  background: "#059669",
                  right: -20,
                  top: 100,
                }}
              >
                {/* </> code icon */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 18L10 30L22 42" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M38 18L50 30L38 42" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M34 14L26 46" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
                </svg>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// ─── 2. INTRO ─────────────────────────────────────────────────────────────────
const IntroSection = () => (
  <section className="py-[64px] bg-white">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="max-w-[800px] mx-auto text-center">
        <h2 className="text-[24px] leading-[1.3] tracking-[-0.02em] font-black text-[#111] mb-[23px]">
          Bakery Fair 2026
        </h2>
        <p className="text-[18px] leading-[1.6] font-normal text-[#616161]">
          Two days before Korea's largest bakery trade fair, a request came directly from the CEO: build digital signage for the exhibition booth.
          48 hours on the clock. No engineering support. No time to open Figma.
          One designer had to own the full pipeline — concept, design, and live deployment — alone.
        </p>
      </FadeUp>
    </div>
  </section>
);

// ─── 3. THE CHALLENGE ────────────────────────────────────────────────────────
const ChallengeSection = () => (
  <section className="py-[80px] bg-white">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[40px]">
        <h2 className="text-[36px] leading-[1.2] tracking-[-0.02em] font-black text-[#111] mb-[12px]">
          The Challenge
        </h2>
        <p className="text-[18px] leading-[1.6] font-normal text-[#616161]">
          A <span className="font-bold text-[#2563EB]">time constraint</span> that made following the traditional design process impossible
        </p>
      </FadeUp>
      {/* p3_process.svg — Traditional vs Code-First flow diagram */}
      <FadeUp delay={0.1}>
        <img
          src="/assets/p3_process.svg"
          alt="Traditional (6-step) vs Code-First (3-step) design process comparison"
          className="w-full h-auto block"
        />
      </FadeUp>
    </div>
  </section>
);

// ─── 4. STRATEGY ─────────────────────────────────────────────────────────────
const StrategySection = () => (
  <section className="py-[80px] bg-[#EFF6FF]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="max-w-[800px] mx-auto text-center">
        <h2 className="text-[24px] font-black text-[#111] mb-[24px]">Strategy</h2>
        <p className="text-[24px] leading-[1.5] font-normal text-[#616161]">
          Stop producing the design artifact (Figma) first.{" "}
          <span className="font-black text-[#111]">Use the live output itself as the design tool.</span>
        </p>
      </FadeUp>
    </div>
  </section>
);

// ─── 5. BACKGROUND ───────────────────────────────────────────────────────────
const BackgroundSection = () => (
  <section className="py-[80px] bg-white">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[56px]">
        <h2 className="text-[36px] leading-[1.2] tracking-[-0.02em] font-black text-[#111]">Background</h2>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[48px] items-center">
        <FadeUp delay={0.05}>
          <img
            src="/assets/p3_thumbnail_00.png"
            alt="Exhibition booth with live signage screens at Bakery Fair 2026"
            className="w-full h-auto object-cover rounded-[8px] block"
          />
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-col gap-[23px] text-[18px] leading-[1.6] font-normal text-[#616161]">
            <p>The CEO came to me with a direct request: build digital signage for the Bakery Fair exhibition booth.</p>
            <p>Two days before the fair opened, with no engineering support, a single designer had to complete 8 live screens from scratch.</p>
            <p>Instead of a Figma file, I used browser-based code as the design tool and redefined the entire process — removing every intermediate artifact between design intent and live output.</p>
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
);

// ─── 6. PROBLEM ──────────────────────────────────────────────────────────────
const ProblemSection = () => (
  <section className="py-[80px] bg-[#F7F8F9]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[48px]">
        <span className="inline-block px-[24px] py-[8px] rounded-full bg-[#E0E7EF] text-[#616161] text-[16px] font-bold">
          Problem
        </span>
      </FadeUp>
      <FadeUp delay={0.1}>
        {/* p3_screen.gif — wide workflow / problem visualization */}
        <div className="rounded-[8px] overflow-hidden bg-[#E9ECF0]">
          <img
            src="/assets/p3_screen.gif"
            alt="Design-to-code workflow — browser as the live design canvas"
            className="w-full h-auto block"
          />
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─── 7. CORE DESIGN DECISION ─────────────────────────────────────────────────
const CoreDecisionSection = () => (
  <section className="py-[80px] bg-[#EFF6FF]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="max-w-[800px] mx-auto text-center">
        <h2 className="text-[36px] leading-[1.2] tracking-[-0.02em] font-black text-[#111] mb-[23px]">
          Core Design Decision
        </h2>
        <p className="text-[18px] leading-[1.6] font-normal text-[#616161]">
          Collapsed the gap between design and implementation.<br />
          Browser = Figma. Refresh = design review. Deploy ={" "}
          <span className="font-bold text-[#111]">design complete.</span>
        </p>
      </FadeUp>
    </div>
  </section>
);

// ─── 8. SOLUTION ─────────────────────────────────────────────────────────────
const SolutionSection = () => (
  <section className="py-[80px] bg-white">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[48px]">
        <h2 className="text-[36px] leading-[1.2] tracking-[-0.02em] font-black text-[#111]">Solution</h2>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        {[
          {
            sub: "Legibility First",
            title: "Typography Control",
            desc: "Corrected newline errors, overflow issues, and hierarchy collapse in the live order feed by redirecting AI with precise design criteria. Redefined the type scale for signage-appropriate reading distances.",
          },
          {
            sub: "Real-time Design Judgment",
            title: "CEO Alignment",
            desc: "Evaluated the \"full-screen\" proposal against reading distance, information density, and signage context — and applied the decision immediately on-site without a single revision cycle.",
          },
          {
            sub: "Offline → Online",
            title: "On-site Response",
            desc: "Noticed that dark mode was harder to read than expected at the booth and adjusted it on the spot. The code-first method made real-time changes possible with zero handoff delay.",
          },
        ].map((item, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="bg-[#F7F8F9] rounded-[16px] p-[32px] flex flex-col gap-[8px] h-full">
              <p className="text-[13px] font-bold text-[#2563EB] uppercase tracking-[1px]">{item.sub}</p>
              <h3 className="text-[22px] font-black text-[#111] text-center tracking-[-0.02em]">{item.title}</h3>
              <p className="text-[16px] leading-[1.6] font-normal text-[#616161]">{item.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─── 9. IMPACT ───────────────────────────────────────────────────────────────
const ImpactSection = () => (
  <section className="py-[80px] bg-white overflow-hidden">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[24px]">
        <h2 className="text-[36px] leading-[1.2] tracking-[-0.02em] font-black text-[#111]">Impact</h2>
      </FadeUp>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[24px] pt-[32px] mb-[24px]">
        {[
          { num: "8",     label: "Signage Screens",  sub: "All screens delivered"          },
          { num: "4h",    label: "Total Design Time", sub: "CEO brief to live deploy"        },
          { num: "48h",   label: "Constraint Window", sub: "Started 2 days before the fair"  },
          { num: "100%",  label: "Code-to-Live",      sub: "No Figma, code-first workflow"   },
        ].map((s, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="bg-[#F7F8F9] rounded-[16px] px-[24px] py-[40px] text-center">
              <h3 className="text-[48px] font-black text-[#2563EB] leading-[1] mb-[4px]">{s.num}</h3>
              <p className="text-[16px] font-black text-[#111] mb-[4px]">{s.label}</p>
              <p className="text-[14px] font-medium text-[#999]">{s.sub}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>

    {/* p3_project01–07 — horizontal scroll gallery */}
    <FadeUp delay={0.1}>
      <div
        className="flex gap-[24px] justify-center flex-wrap px-[24px] sm:px-0 sm:flex-nowrap sm:overflow-x-auto sm:pb-[8px]"
        style={{ scrollbarWidth: "none" }}
      >
        {[1, 2, 3, 4, 7].map((n) => (
          <div
            key={n}
            className="flex-shrink-0 rounded-[8px] overflow-hidden bg-[#F2F4F6]"
            style={{ width: 271, height: 474 }}
          >
            <img
              src={`/assets/p3_project0${n}.gif`}
              alt={`Bakery Avenue signage — screen ${n}`}
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </FadeUp>
  </section>
);

// ─── 10. KEY TAKEAWAYS ───────────────────────────────────────────────────────
const TakeawaysSection = () => (
  <section className="py-[80px] bg-[#EFF6FF]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[40px]">
        <h2 className="text-[36px] leading-[1.2] tracking-[-0.02em] font-black text-[#111]">Key Takeaways</h2>
      </FadeUp>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
        {[
          {
            num: "1",
            title: "Constraints drive better methods",
            desc: "The constraint of delivering in 4 hours without Figma created the Code-First method. Remove unnecessary intermediate artifacts, and the distance between design intent and live output collapses.",
          },
          {
            num: "2",
            title: "Designer value lives beyond the tool",
            desc: "AI generated the code, but controlling it with design principles was the designer's role. Typography decisions, visual hierarchy judgment, real-time CEO alignment — that was the real design work.",
          },
        ].map((item, idx) => (
          <FadeUp key={idx} delay={idx * 0.1}>
            <div className="bg-white rounded-[16px] p-[24px] flex flex-col gap-[16px] items-center text-center h-full">
              <div className="w-[36px] h-[36px] rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                <span className="text-[22px] font-semibold text-white leading-none">{item.num}</span>
              </div>
              <div className="flex flex-col gap-[11px] w-full">
                <p className="text-[24px] font-bold text-[#2563EB] leading-[1.4]">{item.title}</p>
                <p className="text-[18px] font-normal text-[#111] leading-[1.6]">{item.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Project3DetailPage({ onBack, onAbout }: { onBack: () => void; onAbout?: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#111] overflow-x-hidden">
      <Navbar onBack={onBack} onAbout={onAbout} />
      <main>
        <HeroSection />
        <IntroSection />
        <ChallengeSection />
        <StrategySection />
        <BackgroundSection />
        <ProblemSection />
        <CoreDecisionSection />
        <SolutionSection />
        <ImpactSection />
        <TakeawaysSection />
      </main>
      <DetailFooter />
    </div>
  );
}
