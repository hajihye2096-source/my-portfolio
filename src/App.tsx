/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./ProjectDetailPage";
import ProjectDetailPage from "./ProjectDetailPage";
import Project2DetailPage from "./Project2DetailPage";
import Project3DetailPage from "./Project3DetailPage";
import Project4DetailPage from "./Project4DetailPage";
import AboutPage from "./AboutPage";
import { ArrowRight, Linkedin, Mail, FileText } from "lucide-react";
import cubeMain from "./assets/animaions/cube_main.gif";
import p2Thumbnail1 from "./assets/animaions/p2_thumbnail_1.gif";
import { LanguageDomTranslator } from "./i18n";

// ─── Scroll to top on every navigation ───────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText         = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yIllustration = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity       = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="pt-32 pb-20 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center overflow-hidden">
      <motion.div
        style={{ y: yText, opacity }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-display text-[32px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.03em] font-black text-black mb-8">
          Solving Complex Business Problems through{" "}
          <span className="text-[#2563EB]">Simple Design Solutions.</span>
        </h1>
        <p className="text-[16px] sm:text-[20px] md:text-[22px] lg:text-[24px] leading-snug font-medium text-[#616161] mb-12 max-w-xl">
          Senior Product Designer specialized in building scalable systems and high-impact user experiences. Focused on bridging the gap between user needs and business goals.
        </p>
        <a
          href="#projects"
          className="bg-black text-white px-8 py-4 rounded-full text-[14px] md:text-[15px] lg:text-[16px] leading-tight inline-flex items-center gap-3 hover:bg-[#2563EB] transition-all group shadow-xl shadow-[#EFF6FF]"
        >
          View Selected Works
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>

      <motion.div
        style={{ y: yIllustration }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-square flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-full h-full max-w-lg flex items-center justify-center">
          <motion.img
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src={cubeMain}
            className="w-full h-auto object-contain scale-[1.1]"
            style={{
              WebkitMaskImage: "radial-gradient(circle closest-side, black 70%, transparent 100%)",
              maskImage: "radial-gradient(circle closest-side, black 70%, transparent 100%)",
            }}
            alt="3D cube animation"
          />
        </div>
      </motion.div>
    </section>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────
interface ProjectProps {
  category: string;
  tags: string[];
  title: string;
  description: string;
  role: string;
  impact: string;
  image: React.ReactNode;
  to: string;
  reverse?: boolean;
}

const ProjectCard = ({ category, tags, title, description, role, impact, image, to, reverse }: ProjectProps) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yContent = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yImage   = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(to)}
      className="cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-14 items-center bg-white rounded-2xl lg:rounded-3xl p-5 sm:p-10 lg:p-14 hover:shadow-lg hover:shadow-black/[0.04] transition-all duration-500 group mb-8 sm:mb-12"
    >
      <motion.div style={{ y: yContent }} className={`order-2 ${reverse ? "lg:order-2" : "lg:order-1"} flex flex-col`}>
        <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.15em] text-[#999] mb-4">{category}</span>
        <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.25] tracking-[-0.02em] font-bold text-gray-900 mb-3 group-hover:text-[#2563EB] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.6] font-normal text-gray-500 mb-6">
          {description}
        </p>
        <div className="flex flex-col gap-2 mb-6 text-[13px] sm:text-[14px] text-gray-400">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-gray-500 min-w-[40px]">Role</span>
            <span className="text-gray-400">—</span>
            <span>{role}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-gray-500 min-w-[40px]">Impact</span>
            <span className="text-gray-400">—</span>
            <span>{impact}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((t) => (
            <span key={t} className="px-3 py-1 text-[11px] sm:text-[12px] font-medium text-gray-500 bg-[#F7F8F9] rounded-full">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[13px] sm:text-[14px] font-semibold text-gray-900 group-hover:text-[#2563EB] transition-colors duration-300">
          Read Case Study
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </motion.div>

      <motion.div style={{ y: yImage }} className={`order-1 ${reverse ? "lg:order-1" : "lg:order-2"} relative w-full mx-auto lg:mx-0 overflow-hidden rounded-2xl lg:rounded-3xl`}>
        {image}
      </motion.div>
    </motion.div>
  );
};

// ─── Featured Projects ────────────────────────────────────────────────────────
const FeaturedProjects = () => (
  <section id="projects" className="py-20 sm:py-28 max-w-[1100px] mx-auto px-4 sm:px-6 overflow-hidden">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-10 sm:mb-16"
    >
      <p className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3">Selected Works</p>
      <p className="text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.15] tracking-[-0.025em] font-bold text-gray-900">Projects</p>
    </motion.div>

    <ProjectCard
      category="E-commerce · Post-Order"
      tags={["Conversion Design", "Add-On UX", "A/B Test"]}
      title="Post-Order Add-On Experience Design"
      description="Turned the high-engagement moment right after a food order into a shopping touchpoint — surfacing add-on suggestions on the order status page without disrupting delivery tracking."
      role="Product Designer"
      impact="+80% new shopping buyers · +7.1%p order share in Seoul"
      to="/project/01"
      image={
        <div className="relative w-full aspect-[4/5] bg-[#EBE6F5] rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.01] flex items-center justify-center">
          <img
            src="/assets/project01/GIF1.gif"
            alt="Coupang Eats post-order add-on shopping experience"
            className="block w-[70%] h-auto object-contain rounded-[20px] shadow-lg"
          />
        </div>
      }
    />

    <ProjectCard
      category="E-commerce · Post-Cancel"
      tags={["Recovery UX", "Reorder Conversion", "A/B Test"]}
      title="Cancellation Recovery Flow"
      description="When an order is cancelled, customers shouldn't have to start over. Redesigned the post-cancellation flow to surface relevant restaurants immediately and restore purchase intent."
      role="Product Designer"
      impact="+11.04% post-cancel buyer conversion · +10.38% orders per user"
      to="/project/04"
      reverse
      image={
        <div className="relative w-full aspect-[4/5] bg-[#FFF0F2] rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.01] flex items-center justify-center">
          <img
            src="/assets/project04/hero_mockup.png"
            alt="Cancellation Recovery Flow"
            className="block w-full h-full object-cover"
          />
        </div>
      }
    />

    <ProjectCard
      category="Agile · Digital Signage"
      tags={["Code-First Design", "AI Prompting", "48h Sprint"]}
      title="48-Hour Design-to-Code: Solo Design for Bakery Fair 2026"
      description="From CEO brief to 8 live signage screens in 4 hours. No Figma, no handoff — AI prompting directed by design judgment alone."
      role="Solo Product Designer"
      impact="8 live signage screens deployed in 4 hours"
      to="/project/03"
      reverse
      image={
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
          <img src="/assets/p3_thumbnail_00.png" alt="Bakery Fair 2026 signage" className="w-full h-full object-cover" />
        </div>
      }
    />

    <ProjectCard
      category="IoT · Smart Home"
      tags={["UX/UI Design", "Design System", "Conversational AI"]}
      title="Building a Unified IoT Platform for Personalized Smart Living"
      description="Designed an AI-driven smart home app that unifies fragmented device ecosystems and delivers context-aware automation through conversational AI."
      role="Product Designer"
      impact="Unified multi-brand device control into a single ecosystem"
      to="/project/02"
      image={
        <div className="relative w-full aspect-[4/5] bg-[#1C1C24] rounded-2xl flex items-end justify-center pt-10 px-8 sm:pt-14 sm:px-12 lg:pt-16 lg:px-14 overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
          <img src={p2Thumbnail1} alt="brilli smart home app interface" className="w-full h-auto object-contain rounded-t-2xl" />
        </div>
      }
    />
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer id="contact" className="py-32 px-4 sm:px-8 max-w-7xl mx-auto">
    <div className="flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-[42px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.03em] font-black mb-10"
      >
        Open for global opportunities. <br />
        <span className="text-[#2563EB]">Let's build something impactful together.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-8 mb-20"
      >
        <a href="mailto:hajihye2096@gmail.com" className="flex items-center gap-3 px-8 py-4 rounded-full border border-gray-200 text-[14px] md:text-[15px] lg:text-[16px] leading-tight font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-all">
          <Mail className="w-5 h-5" /> Email
        </a>
        <a href="https://www.linkedin.com/in/hacci/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full border border-gray-200 text-[14px] md:text-[15px] lg:text-[16px] leading-tight font-bold hover:border-[#2563EB] hover:text-[#2563EB] transition-all">
          <Linkedin className="w-5 h-5" /> Linkedin
        </a>
        <a href="https://drive.google.com/file/d/125Xquy2_AQe1s9GvZ1KtMp1EbwKm-CD2/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900 text-white text-[14px] md:text-[15px] lg:text-[16px] leading-tight font-bold hover:bg-[#2563EB] transition-all">
          <FileText className="w-5 h-5" /> Resume
        </a>
      </motion.div>

      <div className="w-full pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="text-[20px] md:text-[22px] lg:text-[24px] leading-snug font-black uppercase">Product designer. JiHYE HA</span>
        <p className="text-[14px] md:text-[15px] lg:text-[16px] leading-tight font-medium text-gray-400 uppercase">
          © 2026 Senior Product Designer. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// ─── Home page ────────────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F7F8F9] font-sans text-[#000] selection:bg-[#EFF6FF] selection:text-[#046B2D]">
      <Navbar onAbout={() => navigate("/about")} />
      <main>
        <Hero />
        <FeaturedProjects />
      </main>
      <Footer />
    </div>
  );
};

// ─── Root — all routes ────────────────────────────────────────────────────────
export default function App() {
  const navigate = useNavigate();
  const goHome  = () => navigate("/");
  const goAbout = () => navigate("/about");

  return (
    <>
      <LanguageDomTranslator />
      <ScrollToTop />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/about"      element={<AboutPage onHome={goHome} />} />
        <Route path="/project/01" element={<ProjectDetailPage  onBack={goHome} onAbout={goAbout} />} />
        <Route path="/project/02" element={<Project2DetailPage onBack={goHome} onAbout={goAbout} />} />
        <Route path="/project/03" element={<Project3DetailPage onBack={goHome} onAbout={goAbout} />} />
        <Route path="/project/04" element={<Project4DetailPage onBack={goHome} onAbout={goAbout} />} />
        {/* 404 fallback */}
        <Route path="*"           element={<HomePage />} />
      </Routes>
    </>
  );
}
