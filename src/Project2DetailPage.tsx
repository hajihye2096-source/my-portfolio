import { FadeUp, Navbar, DetailFooter, CONTAINER_CLASS } from "./ProjectDetailPage";
import Lottie from "lottie-react";
import { useEffect } from "react";
import p2Solution1 from "./assets/animaions/p2_soultion1.json";

// ─── Named assets — SVG preferred ────────────────────────────────────────────
import p2Thumbnail1 from "./assets/animaions/p2_thumbnail_1.gif";
import p2Thumbnail2 from "./assets/images/p2_thumbnail_2.svg";
import p2Thumbnail3 from "./assets/images/p2_thumbnail_3.svg";
import p2Thumbnail4 from "./assets/images/p2_thumbnail_4.svg";
import p2Thumbnail5 from "./assets/images/p2_thumbnail_5.svg";
import p2Thumbnail6 from "./assets/images/p2_thumbnail_6.svg";
import p2Thumbnail7 from "./assets/images/p2_thumbnail_7.svg";
import p2Thumbnail8 from "./assets/animaions/p2_thumbnail_8.gif";
import p2Thumbnail9 from "./assets/images/p2_thumbnail_9.svg";
import p2Solution2 from "./assets/animaions/p2_soultion2.gif";
import p2Solution3 from "./assets/animaions/p2_soultion3.gif";
import p2Solution4 from "./assets/animaions/p2_soultion4.gif";
import skelterLogo from "./assets/images/skelter labs Logo.svg";

import imgBrilliChar from "./assets/images/f938cad94368e4f99294e71a12692b147a0259eb.png";

export default function Project2DetailPage({ onBack, onAbout }: { onBack: () => void; onAbout?: () => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-[#111111] overflow-x-hidden selection:bg-[#f65050] selection:text-white">
      <Navbar onBack={onBack} onAbout={onAbout} />

      <main>

        {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
        <section className="bg-[#0e0f1f] pt-[120px] sm:pt-[160px] lg:pt-[185px] pb-16 sm:pb-20 overflow-hidden">
          <div className={CONTAINER_CLASS}>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-start lg:items-center">

              {/* Left */}
              <FadeUp className="flex flex-col gap-4 flex-1 py-4 lg:py-6">
                <div>
                  <img
                    src={skelterLogo}
                    alt="Skelter Labs"
                    className="h-8 sm:h-10 w-auto"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.1] font-bold text-white">
                  IoT for<br />Personalized Smart Living
                </h1>
                <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.5] font-semibold text-white/80 max-w-[560px]">
                  A unified IoT platform that connects fragmented smart devices and proactively suggests "Smart Mode" based on user behavior patterns.
                </p>
                <div className="h-px w-full bg-white/10 my-2" />
                <div className="flex flex-col gap-3 sm:gap-4 text-white">
                  <div className="flex gap-4 sm:gap-6 items-center">
                    <span className="font-semibold text-[18px] sm:text-[20px] w-[90px] sm:w-[100px] shrink-0">Role</span>
                    <span className="text-[14px] sm:text-[16px] font-normal opacity-80">UX/UI designer intern</span>
                  </div>
                  <div className="flex gap-4 sm:gap-6 items-start">
                    <span className="font-semibold text-[18px] sm:text-[20px] w-[90px] sm:w-[100px] shrink-0">Team</span>
                    <div className="text-[14px] sm:text-[16px] font-normal opacity-80 leading-relaxed">
                      <p>PM</p>
                      <p>UX/UI designer</p>
                      <p>Front Engineers(AOS/iOS)</p>
                      <p>BE engineers</p>
                    </div>
                  </div>
                  <div className="flex gap-4 sm:gap-6 items-center">
                    <span className="font-semibold text-[18px] sm:text-[20px] w-[90px] sm:w-[100px] shrink-0">Timeline</span>
                    <span className="text-[14px] sm:text-[16px] font-normal opacity-80">2019.12 - 2020.07</span>
                  </div>
                </div>
              </FadeUp>

              {/* Right — phone mockup, no wrapper card */}
              <FadeUp delay={0.2} className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
                <div className="w-full max-w-[420px] lg:max-w-[500px]">
                  <img
                    src={p2Thumbnail1}
                    alt="Brilli app UI"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 2. SKELTER LABS HISTORY ──────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp>
              <div className="flex flex-col gap-4 sm:gap-6 items-center text-center max-w-3xl mx-auto">
                <h2 className="text-[24px] sm:text-[28px] font-bold text-black">Skelter Labs</h2>
                <p className="text-[15px] sm:text-[16px] font-normal text-black leading-[1.7]">
                  Founded in 2016 by former Google Korea R&amp;D leaders, Skelter Labs builds enterprise Conversational AI. LLM-based conversational systems deployed across industries are at its core. At the time of this project, the company was expanding from pure AI infrastructure to consumer-facing products, and brilli was one of the first such attempts.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 3. RESEARCH ──────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-10 sm:mb-12">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-black leading-[1.2]">Research</h2>
            </FadeUp>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Market Gap card */}
              <FadeUp delay={0.1} className="bg-[#f9fafb] rounded-[8px] p-5 sm:p-6 flex flex-col gap-4">
                <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#111] text-center">Market Gap</h3>
                <div className="w-full overflow-hidden flex-1">
                  <img src={p2Thumbnail2} alt="Market Gap chart" className="w-full h-auto object-contain" />
                </div>
                <p className="text-[15px] sm:text-[16px] font-normal text-black">
                  The smart home market is growing at{" "}
                  <strong className="font-bold">20% annually</strong>
                  , but most users still manage 5+ manufacturer apps separately. The market grew, but the experience didn't keep up.
                </p>
              </FadeUp>

              {/* Objective card */}
              <FadeUp delay={0.2} className="bg-[#f9fafb] rounded-[8px] p-5 sm:p-6 flex flex-col gap-4">
                <h3 className="text-[20px] sm:text-[24px] font-semibold text-[#111] text-center">Objective</h3>
                <div className="w-full flex-1">
                  <img src={p2Thumbnail3} alt="Smart Home Key Players" className="w-full h-auto object-contain" />
                </div>
                <p className="text-[15px] sm:text-[16px] font-normal text-black">
                  Building a platform where leaving feels like a downgrade.{" "}
                  <strong className="font-bold">One ecosystem, all brands, zero fragmentation</strong>
                  {" "}— that was the strategic challenge.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 4. PROBLEM ───────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-8 sm:mb-10">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-black leading-[1.2]">Problem</h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  img: p2Thumbnail4,
                  title: "App Overload",
                  desc: "5 devices, 5 apps, 5 login screens. Smart home management had become a full-time job. The exact opposite of what users wanted.",
                },
                {
                  img: p2Thumbnail5,
                  title: "Setup Abandonment",
                  desc: "Automation features were designed for power users. Most people gave up before reaching the valuable parts. The complexity wasn't a bug. It was the core problem to solve.",
                },
                {
                  img: p2Thumbnail6,
                  title: "Reactive, Not Proactive",
                  desc: "Every device waited for manual commands. True intelligence acts before the user asks. The design challenge was prediction, not control.",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <FadeUp delay={idx * 0.1} className="flex flex-col gap-3 sm:gap-4 items-center text-center py-4 sm:py-6">
                    <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] overflow-hidden shrink-0 flex items-center justify-center">
                      <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111]">{item.title}</h3>
                    <p className="text-[14px] sm:text-[15px] font-normal text-[#374151] leading-[1.6]">{item.desc}</p>
                  </FadeUp>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. HYPOTHESIS ────────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-[#ffefef]">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="flex flex-col items-center gap-6 sm:gap-8 text-center">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-black leading-[1.2]">Hypothesis</h2>
              <p className="text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.5] text-black max-w-[860px]">
                <span className="font-normal">If all devices and brands exist within </span>
                <span className="font-semibold">a single Platform that learns real lifestyle patterns</span>
                <span className="font-normal">, the app stops feeling like a tool and starts feeling like infrastructure. That's when it becomes indispensable.</span>
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 6. SOLUTION — ECOSYSTEM DIAGRAM ──────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-8 sm:mb-10">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111] leading-[1.2]">Solution</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="w-full overflow-hidden">
                <img src={p2Thumbnail7} alt="Solution ecosystem diagram" className="w-full h-auto object-contain" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 7. PERSONA & USER JOURNEY MAP ────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-8 sm:mb-10">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111] leading-[1.2]">Persona &amp; User journey map</h2>
            </FadeUp>

            {/* Persona */}
            <FadeUp delay={0.1} className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start mb-12 sm:mb-16">
              <div className="shrink-0 mx-auto sm:mx-0">
                <div className="size-[200px] sm:size-[248px] rounded-full overflow-hidden bg-[#f2f4f6]">
                  <img src={p2Thumbnail8} alt="Persona Brin Lee" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 flex-1 justify-center">
                <p className="text-[22px] sm:text-[28px] lg:text-[32px] font-semibold leading-[1.3] text-[#111]">
                  "I built a smart home, but now I feel like I've become the assistant to my devices."
                </p>
                <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold text-[#111]">Brin Lee (34, single household, IT Early Adopter)</p>
                <p className="text-[14px] sm:text-[15px] font-normal text-[#374151] leading-[1.6]">
                  Spends a lot of time at home and values environmental control. Prefers the best product for each function, resulting in 5+ manufacturer apps on their phone.
                </p>
                <div className="text-[14px] sm:text-[15px] text-[#111]">
                  <p className="font-bold mb-1">Core Needs</p>
                  <ul className="list-disc list-inside font-normal leading-relaxed space-y-1 text-[#374151]">
                    <li>Cognitive Offloading: A unified Dashboard that eliminates the need to think about which app to open.</li>
                    <li>Universal Command: A unified voice command system that works across all device brands.</li>
                  </ul>
                </div>
              </div>
            </FadeUp>

            {/* User Journey Map */}
            <FadeUp delay={0.2} className="w-full overflow-x-auto">
              <img src={p2Thumbnail9} alt="User Journey Map" className="w-full min-w-[640px] sm:min-w-[900px] h-auto object-contain" />
            </FadeUp>
          </div>
        </section>

        {/* ── 8. SOLUTION — ASIS / TOBE ────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-8 sm:mb-10">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111] leading-[1.2]">Solution</h2>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col items-center gap-0">
              {/* ASIS */}
              <div className="bg-[#f9fafb] rounded-[16px] p-5 sm:p-6 w-full flex flex-col gap-4 sm:gap-6 items-center">
                <div className="border border-[#9ca3af] rounded-full px-5 h-8 flex items-center justify-center">
                  <span className="text-[16px] font-bold text-[#374151]">ASIS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full text-center text-black">
                  <div className="flex flex-col gap-1 sm:gap-2 items-center">
                    <p className="text-[16px] sm:text-[18px] font-bold">Fragmented Ecosystem</p>
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[#374151]">Inconsistent smart speaker support. Often locked to a specific carrier.</p>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2 items-center">
                    <p className="text-[16px] sm:text-[18px] font-bold">App Fatigue</p>
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[#374151]">Users must download and manage a separate app for each device manufacturer.</p>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2 items-center">
                    <p className="text-[16px] sm:text-[18px] font-bold">High-Friction Setup</p>
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[#374151]">Setting up automation triggers requires complex and cumbersome manual configuration.</p>
                  </div>
                </div>
              </div>

              {/* Connector arrow */}
              <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-10 border-l-2 border-dashed border-[#ff334b]" />
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10 L0 0 L16 0 Z" fill="#ff334b" />
                </svg>
              </div>

              {/* TOBE */}
              <div className="bg-[#f9fafb] border-2 border-[#ff334b] rounded-[16px] p-5 sm:p-6 w-full flex flex-col gap-4 sm:gap-6 items-center">
                <div className="bg-[#ff334b] rounded-full px-5 h-8 flex items-center justify-center">
                  <span className="text-[16px] font-bold text-white">TOBE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full text-center text-black">
                  <div className="flex flex-col gap-1 sm:gap-2 items-center">
                    <p className="text-[20px] sm:text-[24px] font-semibold">Unified Integration</p>
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[#374151]">Seamlessly connect and register all smart devices through an Open IoT Platform.</p>
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-2 items-center">
                    <p className="text-[20px] sm:text-[24px] font-semibold">Proactive Automations</p>
                    <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-[#374151]">Analyze 2 weeks of user behavior patterns to automatically suggest personalized routines.</p>
                  </div>
                </div>
              </div>

              {/* Connector arrow */}
              <div className="flex flex-col items-center py-1">
                <div className="w-0.5 h-10 border-l-2 border-dashed border-[#ff334b]" />
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 10 L0 0 L16 0 Z" fill="#ff334b" />
                </svg>
              </div>

              {/* Outcome circles */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-2">
                {["Unified\nDashboard", "Tailored\nRoutines"].map((label, i) => (
                  <div key={i} className="bg-[#fff0f2] w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] lg:w-[240px] lg:h-[240px] rounded-full flex items-center justify-center text-center px-4">
                    <p className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold text-[#ff334b] whitespace-pre-line leading-[1.4]">{label}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 9. DESIGN STRATEGY ───────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-8 sm:mb-10">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111] leading-[1.2]">Design Strategy</h2>
            </FadeUp>

            {/* Tagline */}
            <FadeUp delay={0.1} className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 py-8 sm:py-10 mb-4">
              <p className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold text-black leading-[1.1] text-center lg:text-left">
                Focus on what<br />truly matters
              </p>
              <div className="text-[28px] sm:text-[32px] text-[#f65050] shrink-0">→</div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-end gap-3">
                  <img src={imgBrilliChar} alt="Brilli character" className="h-[60px] sm:h-[76px] w-auto object-contain" />
                  <span className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold text-[#f65050] leading-[1.1]">will</span>
                </div>
                <p className="text-[40px] sm:text-[52px] lg:text-[64px] font-bold text-[#f65050] leading-[1.1]">handle the rest.</p>
              </div>
            </FadeUp>

            {/* Value circles */}
            <FadeUp delay={0.2} className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 sm:gap-0 py-8 sm:py-10 mb-12 sm:mb-16">
              <div className="h-0.5 flex-1 bg-[#f65050] hidden lg:block min-w-0" />
              {[
                { label: "Smart", title: "Intelligent", desc: "AI-driven automation that learns patterns and acts before you ask." },
                { label: "Friendly", title: "Accessible", desc: "Simple enough for anyone, not just early adopters." },
                { label: "Easy", title: "Effortless", desc: "Setup in minutes, not hours. Control without a manual." },
                { label: "Unified", title: "Cohesive", desc: "All brands, all devices, one Platform." },
              ].map((val, idx) => (
                <div key={idx} className="bg-[#f2f4f6] w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-full flex flex-col gap-3 sm:gap-4 items-center justify-center p-5 sm:p-6 text-center shrink-0">
                  <p className="text-[13px] sm:text-[14px] lg:text-[16px] font-normal text-[#f65050]">{val.label}</p>
                  <div className="flex flex-col gap-1 sm:gap-2">
                    <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold text-black">{val.title}</p>
                    <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal text-[#8a8a8a] leading-snug">{val.desc}</p>
                  </div>
                </div>
              ))}
              <div className="h-0.5 flex-1 bg-[#f65050] hidden lg:block min-w-0" />
            </FadeUp>

            {/* Brilli Logo + Iconography + Color */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Left: Brilli Logo */}
              <FadeUp delay={0.1} className="flex flex-col gap-6 sm:gap-8">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="text-[20px] sm:text-[24px] font-semibold text-black text-center">Brilli Logo</p>
                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal text-black text-center leading-[1.6]">
                    Translated key brand keywords into specific graphic motifs and combined them to build an intuitive Visual Identity.
                  </p>
                </div>
                {/* Brilli Logo image */}
                <img
                  src="/assets/p2_thumbnail_12.svg"
                  alt="Brilli Logo — Cohesive, Accessible, Intelligent motif derivation"
                  className="w-full h-auto block"
                />
              </FadeUp>

              {/* Right: Iconography + Color */}
              <FadeUp delay={0.2} className="flex flex-col gap-6 sm:gap-8">
                {/* Iconography */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="text-[20px] sm:text-[24px] font-semibold text-black text-center">Iconography</p>
                </div>
                {/* Iconography image */}
                <img
                  src="/assets/p2_thumbnail_13.svg"
                  alt="Brilli Iconography — IoT device icon set"
                  className="w-full h-auto block"
                />

                {/* Color */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <p className="text-[20px] sm:text-[24px] font-semibold text-black text-center">Brilli Color</p>
                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal text-black text-center leading-[1.6]">
                    Combined contrasting tones of brightness and calm to visually balance the opposing core values of 'Joyful' and 'Smart'.
                  </p>
                  <div className="flex w-full h-12 sm:h-14 rounded overflow-hidden gap-[2px]">
                    <div className="h-full rounded-[2px]" style={{ flex: "46.07", backgroundColor: "#f65050" }} />
                    <div className="h-full rounded-[2px]" style={{ flex: "19.64", backgroundColor: "#2e3566" }} />
                    <div className="h-full rounded-[2px]" style={{ flex: "9.69", backgroundColor: "#60646b" }} />
                    <div className="h-full rounded-[2px]" style={{ flex: "9.69", backgroundColor: "#d6dae3" }} />
                    <div className="h-full rounded-[2px]" style={{ flex: "9.42", backgroundColor: "#f4f5f7" }} />
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 10. ILLUSTRATION ─────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-white">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-10 sm:mb-12">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111] leading-[1.2]">Illustration</h2>
            </FadeUp>

            {/* Mood board */}
            <FadeUp delay={0.1} className="flex flex-col gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="text-center">
                <p className="text-[20px] sm:text-[24px] font-semibold text-black mb-2">Mood board</p>
                <p className="text-[14px] sm:text-[15px] font-normal text-[#374151] leading-[1.6]">
                  Evaluated drafts using a 4-quadrant matrix to select the<br className="hidden sm:block" />
                  'Simple and Friendly' style that perfectly aligns with the brand's core values.
                </p>
              </div>
              {/* Mood board matrix image */}
              <div className="w-full overflow-hidden">
                <img src="/assets/p2_thumbnail_14.svg" alt="Mood board 4-quadrant matrix" className="w-full h-auto object-contain" />
              </div>
            </FadeUp>

            {/* Character guide & assets */}
            <FadeUp delay={0.2}>
              <div className="w-full overflow-hidden">
                <img src="/assets/p2_thumbnail_15.svg" alt="Character guide and assets" className="w-full h-auto object-contain" />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 11. SOLUTION — UI SCREENS ─────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#F2F4F6]">
          <div className={CONTAINER_CLASS}>

            {/* Badge */}
            <FadeUp className="flex justify-center mb-14 sm:mb-20">
              <span className="bg-[#ff334b] text-white font-bold text-[14px] sm:text-[16px] px-6 py-2 rounded-full">Solution</span>
            </FadeUp>

            {/* ════════════════════════════════════════════════════
                ①  Context-Driven Information Hierarchy
            ═══════════════════════════════════════════════════ */}
            <div className="mb-24 sm:mb-32">

              {/* Heading */}
              <FadeUp className="text-center mb-12 sm:mb-16">
                <img src="/assets/num1.svg" alt="①" className="h-8 sm:h-10 w-auto mx-auto mb-4" />
                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-black">
                  <span className="text-[#ff334b]">Context-Driven</span> Information Hierarchy
                </h3>
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal text-[#374151] mt-4 max-w-2xl mx-auto leading-[1.7]">
                  Research showed users cared more about "what's the status of my home right now" than "which device should I control." We redesigned the information architecture around this insight. Automation status is placed at the top, manual control at the bottom, and the interface follows the user's Mental Model, not a device catalog.
                </p>
              </FadeUp>

              {/* — Clear Messaging — */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start mb-20 sm:mb-24">
                {/* LEFT — phone mockup */}
                <FadeUp delay={0.1} className="flex justify-center lg:justify-start">
                  <img
                    src={p2Solution2}
                    alt="Clear Messaging — phone mockup"
                    className="w-auto max-h-[952px] object-contain"
                    style={{ maxHeight: "952px" }}
                  />
                </FadeUp>
                {/* RIGHT — title + desc + annotation SVGs */}
                <FadeUp delay={0.15} className="flex flex-col gap-5 sm:gap-6">
                  <div>
                    <p className="text-[18px] sm:text-[20px] font-bold text-black">Clear Messaging</p>
                    <p className="text-[13px] sm:text-[14px] text-[#374151] leading-relaxed mt-1">
                      Clearly communicates conditions, devices, and current status.
                    </p>
                  </div>
                  <img src="/assets/p2_soultion1-2.svg" alt="Clear Messaging annotation 1" className="w-full h-auto" />
                  <img src="/assets/p2_soultion1-1.svg" alt="Clear Messaging annotation 2" className="w-full h-auto" />
                </FadeUp>
              </div>

              {/* — Controlling Devices — */}
              <FadeUp className="mb-6 sm:mb-8">
                <p className="text-[18px] sm:text-[20px] font-bold text-black">Controlling Devices</p>
                <p className="text-[13px] sm:text-[14px] text-[#374151] leading-relaxed mt-1 max-w-lg">
                  Surfaces the most relevant device states first based on real-time context.
                </p>
              </FadeUp>

              {/* 2-col: LEFT = thumbnails stacked vertically + captions, RIGHT = Lottie */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                {/* LEFT — p2_thumbnail_16 (top) + p2_thumbnail_17 (bottom) */}
                <FadeUp delay={0.1} className="flex flex-col gap-6 sm:gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src="/assets/p2_thumbnail_16.svg"
                      alt="Device list screen"
                      className="w-full max-w-[300px] sm:max-w-full h-auto"
                    />
                    <p className="text-[12px] sm:text-[13px] text-[#374151] text-center leading-relaxed">
                      View all registered smart devices in a single unified list
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src="/assets/p2_thumbnail_17.svg"
                      alt="Device control screen"
                      className="w-full max-w-[300px] sm:max-w-full h-auto"
                    />
                    <p className="text-[12px] sm:text-[13px] text-[#374151] text-center leading-relaxed">
                      Tap a device for instant control — no app switching required
                    </p>
                  </div>
                </FadeUp>

                {/* RIGHT — Lottie animation */}
                <FadeUp delay={0.2} className="flex justify-center lg:justify-start">
                  <Lottie
                    animationData={p2Solution1}
                    loop={true}
                    autoplay={true}
                    style={{ width: "auto", height: "auto", maxHeight: "952px" }}
                  />
                </FadeUp>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════
                ②  Smart Suggestions & UI Optimization
            ═══════════════════════════════════════════════════ */}
            <div>

              {/* Heading */}
              <FadeUp className="text-center mb-12 sm:mb-16">
                <img src="/assets/num2.svg" alt="②" className="h-8 sm:h-10 w-auto mx-auto mb-4" />
                <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-black">
                  <span className="text-[#ff334b]">Smart Suggestions</span> &amp; UI Optimization
                </h3>
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal text-[#374151] mt-4 max-w-2xl mx-auto leading-[1.7]">
                  The system learns from repeated behaviors and automatically surfaces suggested routines. Usage data showed that after initial setup, users rarely manually added new automations. So we decided to de-prioritize the 'Add' button and fill that key Thumb Zone with AI-generated suggestions.
                </p>
              </FadeUp>

              {/* 2-col: LEFT = p2_soultion3 (1px left crop), RIGHT = p2_soultion4 (with embedded annotations) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start mb-12 sm:mb-16">
                {/* LEFT — p2_soultion3, clip 1px from left edge */}
                <FadeUp delay={0.1} className="flex justify-center lg:justify-start overflow-hidden">
                  <img
                    src={p2Solution3}
                    alt="Smart Suggestions — automations list view"
                    style={{ maxHeight: "952px", width: "auto", marginLeft: "-1px" }}
                  />
                </FadeUp>

                {/* RIGHT — p2_soultion4 (annotations embedded in image) */}
                <FadeUp delay={0.2} className="flex justify-center lg:justify-start">
                  <img
                    src={p2Solution4}
                    alt="Smart Suggestions — with Add Automation, Smart Suggestions, Intuitive Iconography, Error Prevention annotations"
                    className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-full h-auto"
                  />
                </FadeUp>
              </div>

              {/* p2_thumbnail_18 — full width */}
              <FadeUp delay={0.1}>
                <img
                  src="/assets/p2_thumbnail_18.svg"
                  alt="Smart Suggestions — final result screen"
                  className="w-full h-auto"
                />
              </FadeUp>

            </div>
          </div>
        </section>

        {/* ── 12. KEY TAKEAWAYS ─────────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 bg-[#fff0f2]">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="text-center mb-8 sm:mb-10">
              <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111] leading-[1.2]">Key Takeaways</h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
              {[
                {
                  num: "1",
                  title: "Design Before the Screen",
                  desc: "The most important decisions were made before drawing any UI. Which device data to expose, how to categorize behavior patterns, what criteria to trigger suggestions. Defining these early with engineers significantly reduced compromises at execution.",
                },
                {
                  num: "2",
                  title: "Owning the Full System",
                  desc: "Building a product from scratch — navigation architecture, state transitions, empty states, edge cases — creates continuous refinement. You can't design the parts well without understanding the whole.",
                },
                {
                  num: "3",
                  title: "Ownership Beyond the Handoff",
                  desc: "Launching a product that changes how people live at home is a different kind of feedback than a design review. I realized here that Ownership means caring about outcomes even after the handoff.",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <FadeUp delay={idx * 0.1} className="bg-white rounded-[16px] p-5 sm:p-6 flex flex-col gap-3 sm:gap-4 items-center text-center h-full">
                    <div className="bg-[#ff334b] size-8 sm:size-9 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-[18px] sm:text-[22px] font-semibold text-white leading-none">{item.num}</span>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 w-full flex-1">
                      <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-semibold text-[#ff334b] leading-[1.4]">{item.title}</p>
                      <p className="text-[14px] sm:text-[15px] lg:text-[18px] font-normal text-black leading-[1.6]">{item.desc}</p>
                    </div>
                  </FadeUp>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13. ENDING ───────────────────────────────────────────────────────── */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER_CLASS}>
            <FadeUp className="flex flex-col items-center gap-8 sm:gap-10">
              {/* Video — ~280px height at desktop breakpoint */}
              <div className="w-full flex justify-center">
                <video
                  src="/ending_img.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-[200px] sm:h-[240px] lg:h-[280px] w-auto object-contain"
                />
              </div>
              {/* Text */}
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal text-[#374151] leading-[1.5]">
                  I'd love to hear from you.
                </p>
                <a
                  href="mailto:hajihye2096@gmail.com"
                  className="text-[20px] sm:text-[24px] lg:text-[28px] font-bold text-black hover:text-[#f65050] transition-colors duration-300"
                >
                  Get in touch
                </a>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>

      <DetailFooter />
    </div>
  );
}
