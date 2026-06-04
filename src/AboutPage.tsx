/**
 * AboutPage — Resume-driven redesign
 * Visual · Scroll-animated · Spoon-fed information hierarchy
 */

import { motion, useInView, useScroll, useTransform } from "motion/react";
import React, { useRef, ReactNode } from "react";
import {
  ArrowRight, Linkedin, Mail, FileText,
  TrendingUp, Users, Layers, Zap,
  Code2, Briefcase, MapPin,
} from "lucide-react";
import { LanguageToggle } from "./i18n";

const CONTAINER = "max-w-[1100px] mx-auto px-4 sm:px-6 w-full";

const FadeUp = ({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  key?: React.Key;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Navbar ─────────────────────────────────────────────────────────────────────
const AboutNavbar = ({ onHome }: { onHome: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#EFEFEF]" data-no-translate>
    <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-[56px] flex items-center justify-between">
      <button
        onClick={onHome}
        className="flex items-center gap-1.5 text-[14px] cursor-pointer hover:opacity-70 transition-opacity"
      >
        <span className="text-[#999] font-medium hidden sm:inline">Product designer.</span>
        <span className="font-black text-black tracking-tight">HA JIHYE</span>
        <span className="w-[14px] h-[14px] rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
          <span className="w-[6px] h-[6px] rounded-full bg-white" />
        </span>
      </button>
      <div className="flex items-center gap-3 sm:gap-6 text-[14px] font-bold text-[#999]">
        <button onClick={onHome} className="hover:text-black transition-colors">Work</button>
        <a href="mailto:hajihye2096@gmail.com" className="hover:text-black transition-colors">Contact</a>
        <a
          href="https://drive.google.com/file/d/125Xquy2_AQe1s9GvZ1KtMp1EbwKm-CD2/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline hover:text-black transition-colors"
        >
          Résumé
        </a>
        <LanguageToggle />
      </div>
    </div>
  </nav>
);

// ── § Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={ref} className="pt-[56px] bg-white overflow-hidden">
      <div className={`${CONTAINER} pt-16 pb-12 sm:pt-24 sm:pb-16`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ y }}
        >
          {/* Open-to-work badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[13px] font-semibold text-green-700">
              Open to global opportunities
            </span>
          </motion.div>

          <h1 className="text-[48px] sm:text-[64px] lg:text-[84px] leading-[1.0] tracking-[-0.04em] font-black text-black mb-6">
            Ha Jihye.<br />
            <span className="text-[#2563EB]">Product Designer.</span>
          </h1>

          <p className="text-[17px] sm:text-[19px] lg:text-[21px] leading-[1.65] font-normal text-[#616161] max-w-[560px] mb-4">
            6 years designing experiences for millions of users at Coupang & Coupang Eats.
          </p>
          <p className="text-[17px] sm:text-[19px] leading-[1.65] font-normal text-[#616161] max-w-[560px] mb-10">
            Solving real business problems through data-driven UX strategy.
          </p>

          <div className="flex items-center gap-2 text-[14px] text-[#999] mb-10">
            <MapPin className="w-4 h-4" />
            <span>Seoul, South Korea</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="mailto:hajihye2096@gmail.com"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-black text-white text-[14px] font-bold hover:bg-[#2563EB] transition-all duration-300"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
            <a
              href="https://www.linkedin.com/in/hacci/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#EFEFEF] text-[14px] font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://drive.google.com/file/d/125Xquy2_AQe1s9GvZ1KtMp1EbwKm-CD2/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#EFEFEF] text-[14px] font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              Résumé
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-[#EFEFEF] bg-[#F7F8F9]">
        <div className={`${CONTAINER} grid grid-cols-3 divide-x divide-[#EFEFEF]`}>
          {[
            { num: "6+", label: "Years Experience", sub: "Coupang · Coupang Eats · Skelter Labs" },
            { num: "10M+", label: "Users Impacted", sub: "Korea's largest commerce ecosystem" },
            { num: "3", label: "Products Shipped", sub: "Post-order · Commerce · IoT" },
          ].map((stat, i) => (
            <FadeUp key={i} delay={i * 0.1} className="px-4 sm:px-10 py-7 sm:py-10">
              <div className="text-[36px] sm:text-[52px] font-black text-black leading-none mb-1">
                {stat.num}
              </div>
              <div className="text-[13px] sm:text-[14px] font-bold text-black mb-1">{stat.label}</div>
              <div className="text-[11px] sm:text-[12px] text-[#999] leading-snug hidden sm:block">
                {stat.sub}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── § Impact Numbers ────────────────────────────────────────────────────────────
const ImpactSection = () => (
  <section className="py-20 sm:py-28 bg-white">
    <div className={CONTAINER}>
      <FadeUp className="mb-12">
        <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#999] mb-3">
          Measurable Impact
        </p>
        <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black text-black leading-[1.15] tracking-[-0.025em]">
          Design Proven by Numbers
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {[
          {
            metric: "+22.5%",
            label: "Gateway CTR",
            tag: "Coupang Eats · Post-order",
            desc: "Redesigned the information hierarchy of the real-time delivery status page, surfacing critical decision-making data first to drive higher user engagement.",
            icon: TrendingUp,
            color: "#2563EB",
            bg: "#EFF6FF",
            iconBg: "#DBEAFE",
          },
          {
            metric: "+18.88%",
            label: "Purchase Conversion",
            tag: "Coupang · Commerce Funnel",
            desc: "Restructured the checkout decision flow by eliminating cognitive overload at the highest drop-off point, directly improving purchase conversion.",
            icon: Zap,
            color: "#059669",
            bg: "#F0FDF4",
            iconBg: "#D1FAE5",
          },
          {
            metric: "+200%",
            label: "Critique Participation",
            tag: "Team · Design Culture",
            desc: "Transformed weekly critiques from mandatory check-ins into structured decision-making sessions — designers began requesting them voluntarily.",
            icon: Users,
            color: "#7C3AED",
            bg: "#F5F3FF",
            iconBg: "#EDE9FE",
          },
        ].map(({ metric, label, tag, desc, icon: Icon, color, bg, iconBg }, i) => (
          <FadeUp key={i} delay={i * 0.12}>
            <div
              className="rounded-3xl p-7 sm:p-8 h-full flex flex-col"
              style={{ background: bg }}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-6"
                style={{ background: iconBg }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div
                className="text-[48px] sm:text-[56px] font-black leading-none mb-2"
                style={{ color }}
              >
                {metric}
              </div>
              <div className="text-[18px] sm:text-[20px] font-black text-black mb-1">{label}</div>
              <div
                className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                style={{ color }}
              >
                {tag}
              </div>
              <p className="text-[14px] leading-[1.75] text-[#616161] flex-1">{desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── § Career Timeline ──────────────────────────────────────────────────────────
const CareerSection = () => (
  <section className="py-20 sm:py-28 bg-[#F7F8F9]">
    <div className={CONTAINER}>
      <FadeUp className="mb-14">
        <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#999] mb-3">
          Career
        </p>
        <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black text-black leading-[1.15] tracking-[-0.025em]">
          6 Years of Experience
        </h2>
      </FadeUp>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] sm:left-[23px] top-2 bottom-8 w-[2px] bg-[#EFEFEF] z-0" />

        <div className="flex flex-col gap-5">
          {[
            {
              period: "2021 — Present",
              company: "Coupang Eats",
              role: "Product Designer",
              focus: "Post-order UX · Delivery Experience · Behavioral Systems",
              highlights: [
                "Sole designer owning the real-time delivery experience system for millions of users",
                "Evolved UX architecture across Waiting, Cancelled, and Idle delivery states",
                "Double Delivery strategy contributed 4.6% new non-food category revenue",
              ],
              color: "#2563EB",
              current: true,
            },
            {
              period: "2019 — 2021",
              company: "Coupang",
              role: "Product Designer",
              focus: "Commerce Funnel · Checkout UX · Design System",
              highlights: [
                "Improved commerce checkout conversion rate by +18.88%",
                "Rebuilt Design System 2.0 — semantic tokens + variant-based components",
                "Shortened design-to-dev handoff cycles, boosting overall team productivity",
              ],
              color: "#059669",
              current: false,
            },
            {
              period: "2017 — 2019",
              company: "Skelter Labs",
              role: "Product Designer",
              focus: "IoT Platform · Smart Home · Conversational AI",
              highlights: [
                "Led UX/UI design for AI-powered smart home app 'Brilli'",
                "Designed multi-brand device integration ecosystem for unified smart home control",
                "Established conversational AI interface patterns across the product",
              ],
              color: "#7C3AED",
              current: false,
            },
            {
              period: "2016 — 2019",
              company: "SADI (Samsung Art & Design Institute)",
              role: "Visual Design",
              focus: "UX Design · GUI · Branding",
              highlights: [
                "Industry collaboration project with Samsung Electronics for TV accessories",
                "2017 Gwangju Biennale THE FUTURE exhibition — waste recycling service design",
                "UX/GUI design for C-LAB chatbot 'BOM' (AI-based photo sharing app)",
              ],
              color: "#D97706",
              current: false,
            },
          ].map((item, i) => (
            <FadeUp key={i} delay={i * 0.1} className="relative flex gap-5 sm:gap-7">
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0 mt-1">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 flex items-center justify-center shadow-sm"
                  style={{ borderColor: item.color }}
                >
                  {item.current ? (
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  ) : (
                    <Briefcase className="w-4 h-4" style={{ color: item.color }} />
                  )}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 bg-white rounded-2xl p-6 sm:p-8 border border-[#EFEFEF] shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div
                      className="text-[11px] font-semibold uppercase tracking-widest mb-1"
                      style={{ color: item.color }}
                    >
                      {item.period}
                    </div>
                    <h3 className="text-[20px] sm:text-[22px] font-black text-black leading-tight">
                      {item.company}
                    </h3>
                    <p className="text-[14px] font-medium text-[#616161]">{item.role}</p>
                  </div>
                  {item.current && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
                      style={{ background: "#EFF6FF", color: "#2563EB" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                      Current
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#999] uppercase tracking-widest mb-4">
                  {item.focus}
                </p>
                <ul className="space-y-2">
                  {item.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2 text-[14px] text-[#616161]">
                      <span
                        className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── § Skills ───────────────────────────────────────────────────────────────────
const SkillsSection = () => (
  <section className="py-20 sm:py-28 bg-white">
    <div className={CONTAINER}>
      <FadeUp className="mb-12">
        <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#999] mb-3">
          Skills & Tools
        </p>
        <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black text-black leading-[1.15] tracking-[-0.025em]">
          What I Bring to the Table
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Layers,
            category: "Design",
            color: "#2563EB",
            bg: "#EFF6FF",
            skills: ["Figma", "Sketch", "Principle", "Framer", "Prototyping", "Design System"],
          },
          {
            icon: TrendingUp,
            category: "Strategy",
            color: "#059669",
            bg: "#F0FDF4",
            skills: ["UX Research", "A/B Testing", "Data Analysis", "Systems Thinking", "Journey Mapping"],
          },
          {
            icon: Users,
            category: "Leadership",
            color: "#7C3AED",
            bg: "#F5F3FF",
            skills: ["Design Critique", "Stakeholder Mgmt", "Cross-functional", "Mentoring", "Workshop Facilitation"],
          },
          {
            icon: Code2,
            category: "Craft",
            color: "#D97706",
            bg: "#FFFBEB",
            skills: ["HTML / CSS", "React (basic)", "Motion Design", "Typography", "Visual Direction"],
          },
        ].map(({ icon: Icon, category, color, bg, skills }, i) => (
          <FadeUp key={i} delay={i * 0.08}>
            <div className="rounded-2xl p-6 border border-[#EFEFEF] h-full">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: bg }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <h3 className="text-[16px] font-black text-black mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-[12px] font-medium text-[#616161] bg-[#F7F8F9] rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── § Process ──────────────────────────────────────────────────────────────────
const ProcessSection = () => (
  <section className="py-20 sm:py-28 bg-black text-white overflow-hidden">
    <div className={CONTAINER}>
      <FadeUp className="mb-12">
        <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#555] mb-3">
          How I work
        </p>
        <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-black text-white leading-[1.15] tracking-[-0.025em]">
          How I Solve Problems
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            step: "01",
            title: "Friction Signal",
            sub: "Identify Signal",
            body: "CS data, drop-off rates, session heatmaps — I look for behavioral gaps where users stop, hesitate, or find workarounds.",
          },
          {
            step: "02",
            title: "Systems Reframe",
            sub: "Reframe as System",
            body: "Who is most affected? What upstream decision created this downstream symptom? I zoom out before zooming in.",
          },
          {
            step: "03",
            title: "Min. Intervention",
            sub: "Minimum Intervention",
            body: "Not the most elegant solution — the smallest change with the most measurable impact. Constraints make design sharper.",
          },
          {
            step: "04",
            title: "Ship & Measure",
            sub: "Ship & Measure",
            body: "Success metrics are defined before design begins. The hypothesis is part of the brief, not an afterthought.",
          },
        ].map(({ step, title, sub, body }, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <div className="rounded-2xl p-6 sm:p-7 border border-[#222] h-full flex flex-col hover:border-[#2563EB] transition-colors duration-300">
              <div className="text-[52px] font-black text-[#2a2a2a] leading-none mb-6 select-none">
                {step}
              </div>
              <h3 className="text-[17px] font-black text-white mb-1">{title}</h3>
              <p className="text-[11px] font-semibold text-[#2563EB] uppercase tracking-widest mb-4">
                {sub}
              </p>
              <p className="text-[14px] leading-[1.75] text-[#777] flex-1">{body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

// ── § CTA ──────────────────────────────────────────────────────────────────────
const CTASection = ({ onHome }: { onHome: () => void }) => (
  <section className="py-20 sm:py-32 bg-white">
    <div className={CONTAINER}>
      <FadeUp className="max-w-[680px] mx-auto text-center">
        <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#999] mb-6">
          Let's work together
        </p>
        <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-black text-black leading-[1.1] tracking-[-0.03em] mb-6">
          Open to global opportunities.{" "}
          <span className="text-[#2563EB]">
            Let's build something meaningful.
          </span>
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.7] text-[#616161] mb-10">
          If you'd like to talk about product strategy, UX systems,
          or building great design teams — I'd love to hear from you.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:hajihye2096@gmail.com"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white text-[15px] font-bold hover:bg-[#2563EB] transition-all duration-300 shadow-xl shadow-black/10"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
          <a
            href="https://www.linkedin.com/in/hacci/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#EFEFEF] text-[15px] font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="https://drive.google.com/file/d/125Xquy2_AQe1s9GvZ1KtMp1EbwKm-CD2/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#EFEFEF] text-[15px] font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            Download Résumé
          </a>
        </div>
      </FadeUp>

      <FadeUp className="mt-16 pt-10 border-t border-[#EFEFEF]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-[14px] font-bold text-[#999] hover:text-black transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to work
          </button>
          <p className="text-[13px] text-[#999]">
            © 2026 Product Designer. JiHYE HA · All rights reserved.
          </p>
        </div>
      </FadeUp>
    </div>
  </section>
);

// ── Main Export ────────────────────────────────────────────────────────────────
export default function AboutPage({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <AboutNavbar onHome={onHome} />
      <main>
        <HeroSection />
        <ImpactSection />
        <CareerSection />
        <SkillsSection />
        <ProcessSection />
        <CTASection onHome={onHome} />
      </main>
    </div>
  );
}
