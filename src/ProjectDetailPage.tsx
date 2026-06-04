import { motion, useInView } from "motion/react";
import React, { ReactNode, useRef } from "react";
import { Linkedin } from "lucide-react";
import { LanguageToggle } from "./i18n";
import Lottie from "lottie-react";
import driverAnimation from "./assets/animaions/driver.json";

export const CONTAINER_CLASS = "max-w-[1280px] mx-auto px-5 xl:px-0 w-full";

const svgAsset = (name: string) => `/assets/project01/${name}.svg`;
const projectAsset = (name: string) => `/assets/project01/${name}`;

const assets = {
  logo:           svgAsset("export_svg_coupang_eats_logo"),
  hero:           svgAsset("export_svg_hero_order_status_mockup"),
  entryPoints:    svgAsset("export_svg_existing_entry_points_visual"),
  entryGrid:      svgAsset("export_svg_variant_entry_points_visual_EntryPointComparisonGrid"),
  variantBTop:    svgAsset("export_svg_variant_b_mockup_1130_48382"),
  variantCompare: svgAsset("export_svg_variant_b_mockup_1077_44969"),
  variantC:       svgAsset("export_svg_variant_c_mockup"),
  finalDirection: svgAsset("export_svg_final_direction_mockups"),
  category:       svgAsset("export_svg_variant_category"),
  info:           svgAsset("export_svg_variant_info"),
  tracking:       svgAsset("export_svg_variant_SolutionTrackingFeature_Frame_01"),
  gifTiming:      projectAsset("GIF1.gif"),
  gifBottomSheet: projectAsset("GIF2.gif"),
  gifBrowse:      projectAsset("GIF3.gif"),
};

const assetSizes: Record<string, [number, number]> = {
  [assets.logo]:           [236,  40],
  [assets.hero]:           [628,  761],
  [assets.entryPoints]:    [1156, 665],
  [assets.entryGrid]:      [1280, 804],
  [assets.variantBTop]:    [443,  934],
  [assets.variantCompare]: [811,  901],
  [assets.variantC]:       [396,  901],
  [assets.finalDirection]: [803,  833],
  [assets.category]:       [526,  140],
  [assets.info]:           [413,  317],
  [assets.tracking]:       [952,  662],
};

const lockIcon = "/assets/lock.png";

export const FadeUp = ({
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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Navbar = ({ onBack, onAbout }: { onBack?: () => void; onAbout?: () => void }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    if (onBack) {
      onBack();
      setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }), 100);
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-[#EFEFEF]" data-no-translate>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-10 h-[56px] flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "auto" });
            onBack?.();
          }}
          className="flex items-center gap-1.5 text-[14px] md:text-[15px] lg:text-[16px] leading-tight cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-gray-500 font-medium hidden sm:inline">Product designer.</span>
          <span className="font-black text-gray-900 tracking-tight text-nowrap">HA JIHYE</span>
          <span className="w-[14px] h-[14px] rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
            <span className="w-[6px] h-[6px] rounded-full bg-white" />
          </span>
        </a>
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8 text-[14px] md:text-[15px] lg:text-[16px] leading-tight font-bold text-gray-500">
          <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="hover:text-black transition-colors">Work</a>
          {onAbout ? (
            <a href="#about" onClick={(e) => { e.preventDefault(); onAbout(); }} className="hover:text-black transition-colors">About</a>
          ) : (
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="hover:text-black transition-colors">About</a>
          )}
          <a href="https://drive.google.com/file/d/125Xquy2_AQe1s9GvZ1KtMp1EbwKm-CD2/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hidden sm:inline hover:text-black transition-colors">Résumé</a>
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

const SvgAsset = ({
  src,
  alt,
  className = "",
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
}) => {
  const [width, height] = assetSizes[src] || [];

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`block max-w-full h-auto ${className}`}
      loading={loading}
      decoding="async"
    />
  );
};

// ─── Design system tokens (matches Figma) ────────────────────────────────────
// H2  : 40px / 700 / leading-48px
// H3  : 32px / 600 / leading-41.6px
// H4  : 24px / 600 / leading-33.6px
// Body/Large : 18px / 400 / leading-28.8px
// Body/Default : 16px / 400 / leading-25.6px
// Label/Small : 12px / 500 / leading-18px
const Heading = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`text-[24px] lg:text-[40px] leading-[1.2] font-black text-[#111] ${className}`}>
    {children}
  </h2>
);

const Body = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] ${className}`}>{children}</p>
);

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#EBE6F5] rounded-[8px] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-6 gap-[12px] lg:gap-[16px]">
    <p className="text-[15px] sm:text-[18px] lg:text-[24px] leading-[1.4] text-[#111] font-semibold">{label}</p>
    <p className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] text-[#6B3CC9] font-black">{value}</p>
  </div>
);

const SolutionGifCard = ({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) => (
  <div className="bg-[#F2F4F6] rounded-[20px] px-6 sm:px-10 py-12 flex flex-col items-center gap-10 min-h-[auto] lg:min-h-[1070px]">
    <img
      src={src}
      alt={title}
      width={369}
      height={800}
      className="w-[min(100%,369px)] h-auto lg:w-[369px] lg:h-[800px] object-cover rounded-[20px] shadow-[2.333px_2.333px_10.5px_0_rgba(0,0,0,0.15)]"
      loading="lazy"
      decoding="async"
    />
    <div className="text-center text-[#111] w-full">
      <h3 className="text-[32px] leading-[41.6px] font-semibold">{title}</h3>
      <p className="mt-6 text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
        {description}
      </p>
    </div>
  </div>
);

const SolutionBrowseCard = () => (
  <div className="bg-[#F2F4F6] rounded-[20px] p-6 sm:p-10 lg:h-[1103px]">
    <div className="grid lg:grid-cols-[532px_1fr] gap-12 lg:gap-10 h-full items-start">
      {/* Left: GIF3 + category SVG + heading + description */}
      <div className="flex flex-col items-center lg:h-[1007px]">
        <img
          src={assets.gifBrowse}
          alt="카테고리 탐색 플로우"
          width={369}
          height={800}
          className="w-[min(100%,369px)] h-auto lg:w-[369px] lg:h-[800px] object-cover rounded-[20px] shadow-[2.333px_2.333px_10.5px_0_rgba(0,0,0,0.15)]"
          loading="lazy"
          decoding="async"
        />
        <div className="w-full mt-10 text-center">
          <h3 className="text-[32px] leading-[41.6px] font-semibold text-[#111]">
            빠르게 고를 수 있는 탐색 구조
          </h3>
          <p className="mt-5 text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
            편의점, 마트, 꽃집, 과일/채소 등 카테고리 필터를 제공해 짧은 대기 시간 안에서도 필요한 상품을 빠르게 찾을 수 있도록 했습니다.
          </p>
        </div>
      </div>
      {/* Right: solution 1 (category SVG + desc) + solution 2 (info SVG + desc) */}
      <div className="lg:pt-[48px] flex flex-col gap-[40px]">
        {/* solution 1 — Figma: 1130:47984 */}
        <div className="flex flex-col items-center gap-[24px]">
          <SvgAsset src={assets.category} alt="카테고리 필터" className="w-[526px]" />
          <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] text-center">
            카테고리 필터를 제공해, 짧은 대기 시간 안에도 필요한 상품을<br />
            빠르게 찾을 수 있도록 했습니다.
          </p>
        </div>
        {/* solution 2 — Figma: 1130:47985 */}
        <div className="flex flex-col items-center gap-[24px]">
          <SvgAsset src={assets.info} alt="구매 판단 정보" className="w-[413px]" />
          <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] text-center">
            무료배달, 할인, 최소주문금액, 예상 추가 소요시간처럼<br />
            즉시 판단에 필요한 정보를 우선 노출했습니다.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const SolutionTrackingCard = () => (
  <div className="bg-[#F2F4F6] rounded-[20px] px-6 sm:px-10 py-12 flex flex-col items-center gap-10 lg:min-h-[898px]">
    <SvgAsset src={assets.tracking} alt="두 가지 주문 추적 화면" className="w-[952px]" />
    <div className="text-center text-[#111] w-full">
      <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.3] font-semibold text-[#111]">
        추가 주문 After에도 배달현황을 쉽게 추적
      </h3>
      <p className="mt-6 text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
        추가 주문 After에도 두 주문의 배송 상태를 각각 명확하게 확인할 수 있도록 했습니다.
      </p>
    </div>
  </div>
);

// KPI container — Figma: 1085:35758
// bg-[#F9FAFB] | rounded-[12px] | label 22px/#6B3CC9/bold | value 22px/#374151/normal
const KpiRow = () => (
  <div className="bg-[#F9FAFB] rounded-[12px] flex flex-col sm:flex-row items-stretch py-[16px] gap-0">
    {([
      ["Primary KPI", "Shopping order conversion"],
      ["Scope",       "Realtime / Add-on order"],
      ["Method",      "A/B test in high-density areas"],
    ] as [string, string][]).map(([label, value], i) => (
      <React.Fragment key={label}>
        {i > 0 && (
          <>
            {/* vertical divider on sm+, horizontal on mobile */}
            <div className="hidden sm:block w-px bg-[#E5E8EB] self-stretch flex-shrink-0" />
            <div className="block sm:hidden h-px bg-[#E5E8EB] mx-4" />
          </>
        )}
        <div className="flex-1 flex flex-col items-center justify-center py-[12px] sm:py-[8px] text-center px-2">
          <p className="text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.5] font-bold text-[#6B3CC9]">{label}</p>
          <p className="text-[14px] sm:text-[16px] lg:text-[22px] leading-[1.5] font-normal text-[#374151]">{value}</p>
        </div>
      </React.Fragment>
    ))}
  </div>
);

const HeroSection = () => (
  <section className="bg-white pt-[56px]">
    <div className={CONTAINER_CLASS}>
      <div className="grid lg:grid-cols-[minmax(0,628px)_minmax(0,628px)] gap-6 items-start pt-[32px] lg:pt-[129px]">

        {/* Hero image — top on mobile (order-1), right on desktop (lg:order-2) */}
        <FadeUp delay={0.08} className="flex justify-center lg:justify-end order-1 lg:order-2 pt-[32px] lg:pt-0">
          <div className="relative w-full max-w-[628px]">
            <SvgAsset src={assets.hero} alt="주문현황 페이지 쇼핑 추가 구매 목업" className="w-full" loading="eager" />
            {/* Driver Lottie — bottom-right of hero image, floating */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute pointer-events-none"
              style={{ right: "2%", bottom: "0", width: "52%", height: "auto" }}
            >
              <Lottie animationData={driverAnimation} loop autoplay />
            </motion.div>
          </div>
        </FadeUp>

        {/* Text — below image on mobile (order-2), left on desktop (lg:order-1) */}
        <FadeUp className="order-2 lg:order-1 pt-[16px] lg:pt-[76px]">
          <SvgAsset src={assets.logo} alt="Coupang Eats" className="w-[160px] sm:w-[200px] lg:w-[236px] h-auto object-contain mb-6 lg:mb-8" loading="eager" />
          <h1 className="text-[32px] sm:text-[44px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] lg:tracking-[-0.03em] font-black text-[#111]">
            음식 주문 직후<br />
            추가 구매 경험 설계
          </h1>
          <p className="mt-4 lg:mt-6 max-w-[628px] text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
            쿠팡이츠 쇼핑은 충분한 머천트 커버리지를 확보했지만 주문 전환은 기대에 미치지 못했습니다. 저는 음식 주문 직후 고객이 가장 많이 재진입하는 주문현황 페이지를 활용해, 배송 확인 경험을 방해하지 않는 쇼핑 추가 구매 흐름을 설계했습니다.
          </p>
          <dl className="mt-[40px] lg:mt-[72px] grid grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr] gap-x-4 lg:gap-x-6 gap-y-3 lg:gap-y-4 text-[14px] lg:text-[16px] leading-[25.6px]">
            <dt className="font-bold text-[#111]">Role</dt>
            <dd className="text-[#555]">Product designer</dd>
            <dt className="font-bold text-[#111]">Team</dt>
            <dd className="text-[#555] whitespace-pre-line">PM{"\n"}Product designer{"\n"}Front Engineers(AOS/iOS){"\n"}BE engineers{"\n"}QA team{"\n"}UX Writer</dd>
            <dt className="font-bold text-[#111]">Timeline</dt>
            <dd className="text-[#555]">2025.12 ~ 2026.01</dd>
          </dl>
        </FadeUp>
      </div>
      <FadeUp delay={0.1} className="mt-20">
        <KpiRow />
      </FadeUp>
      <FadeUp delay={0.12} className="mt-20 pb-20">
        <div className="text-center">
          <Heading className="text-center">Impact</Heading>
          <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] max-w-[880px] mx-auto mt-5 text-center">
            음식 주문 직후의 고관여 순간을 쇼핑 구매 접점으로 전환해,<br />
            쇼핑 첫 구매 고객과 함께배달 주문 비중을 높였습니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          <MetricCard label="함께배달을 통한 쇼핑 첫 구매 고객" value="+80%" />
          <MetricCard label="서울 지역 쇼핑 주문 중 함께배달 주문 비중" value="+7.1%p" />
        </div>
      </FadeUp>
    </div>
  </section>
);

const BackgroundSection = () => (
  <section className="py-12 lg:min-h-[928px]" style={{ background: "linear-gradient(180deg, #EBE6F5 0%, #FFF 44.28%)" }}>
    <div className="max-w-[1920px] mx-auto px-6">
      <FadeUp className="max-w-[1872px] mx-auto text-center">
        <Heading>프로젝트 배경</Heading>
        <Body className="mt-8 max-w-[900px] mx-auto">
          쿠팡이츠 쇼핑은 런칭 이후 약 12만 개의 머천트 커버리지를 확보했습니다. 하지만 실제 주문 규모는 일 4만 건 수준에 머물렀습니다. 비즈니스 성장을 위한 <strong className="font-bold text-[#111]">새로운 구매 접점</strong>이 필요했습니다.
        </Body>
        <SvgAsset src={assets.entryPoints} alt="기존 구매 접점 화면" className="w-[1156px] mx-auto mt-8" />
      </FadeUp>
    </div>
  </section>
);

const ndcSvg = (n: 1 | 2 | 3) =>
  `/assets/project01/entry_points_visual_Needsdetailscontainer_Frame_0${n}_Frame_01.svg`;

const OpportunitySection = () => (
  <section className="bg-white py-[96px] lg:py-[120px]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center">
        <Heading>새로운 구매 접점</Heading>
        <SvgAsset src={assets.entryGrid} alt="홈, 장바구니, 주문현황 페이지 접점 비교" className="w-[1280px] mt-12" />
      </FadeUp>

      {/* 주문현황 페이지가 괜찮은 영역일까? — Figma: 1070:91573 */}
      <FadeUp delay={0.1} className="mt-20 flex flex-col gap-[32px]">
        <Heading className="text-center w-full">주문현황 페이지가 괜찮은 영역일까?</Heading>

        {/* Needs details container — 3 boxes */}
        <div className="flex flex-col gap-[24px] w-full">

          {/* Box 1 */}
          <div className="bg-[#F2F4F6] rounded-[16px] flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] items-center justify-center p-[20px] sm:p-[24px]">
            <img src={ndcSvg(1)} alt="진입률 아이콘"
              width={200} height={200}
              className="w-[120px] sm:w-[160px] lg:w-[200px] h-auto flex-shrink-0 block" loading="lazy" />
            <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] text-center sm:text-left">
              주문 고객의 <span className="font-semibold">94.3%</span>가<br />
              주문현황 페이지에 진입
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-[#F2F4F6] rounded-[16px] flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] items-center justify-center px-[20px] sm:px-[24px] py-[32px] sm:py-[48px]">
            <img src={ndcSvg(2)} alt="유저 인터뷰 말풍선"
              width={539} height={250}
              className="w-full sm:w-[min(100%,400px)] lg:w-[min(100%,539px)] h-auto flex-shrink-0 block" loading="lazy" />
            <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] text-center">
              유저 인터뷰에서 음식 주문 후<br />
              <span className="font-semibold">추가 구매하고 싶은 니즈</span> 확인
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-[#F2F4F6] rounded-[16px] flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] items-center justify-center p-[20px] sm:p-[24px]">
            <img src={ndcSvg(3)} alt="주문현황 페이지 아이콘"
              width={200} height={200}
              className="w-[120px] sm:w-[160px] lg:w-[200px] h-auto flex-shrink-0 block" loading="lazy" />
            <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] text-center sm:text-left">
              주문현황페이지는 주문완료 After 화면<br />
              → <span className="font-semibold">기존 음식 주문 흐름을 방해하지 않음</span>
            </p>
          </div>
        </div>
      </FadeUp>

      {/* 가설 */}
      <FadeUp delay={0.12} className="mt-12 bg-[#FFF0F0] px-8 py-10 text-center">
        <p className="text-[40px] leading-[48px] font-black text-[#111]">가설</p>
        <Body className="mt-6 max-w-[960px] mx-auto">
          음식 주문이 확정된 직후, 주문현황 페이지에 쇼핑 제안을 맥락적으로 노출하면 배송 확인 경험을 해치지 않으면서 추가 구매 전환을 만들 수 있을 것이다.
        </Body>
      </FadeUp>
    </div>
  </section>
);

const VariantSection = () => (
  <section className="bg-[#F2F4F6] py-[52px] lg:min-h-[2240px]">
    <div className="max-w-[1920px] mx-auto px-6">
      <FadeUp className="max-w-[1276px] mx-auto text-center">
        <Heading>무조건 강하게 보이는 것이 좋은 선택일까?</Heading>
        <Body className="mt-5">추가 구매 영역을 얼마나 강하게 노출할 것인지에 대해 여러 시안을 비교했습니다.</Body>
      </FadeUp>
      <FadeUp delay={0.08} className="mt-8 flex justify-center">
        <SvgAsset src={assets.variantBTop} alt="Version B 목업" className="w-[375px]" />
      </FadeUp>
      <FadeUp delay={0.1} className="max-w-[1276px] mx-auto mt-12">
        <Body>디자인팀은 배달현황 확인을 덜 방해하는 B안을 추천했지만, 초기 리더십의 방향성은 가시성이 가장 높은 C안이었습니다.</Body>
      </FadeUp>
      <FadeUp delay={0.12} className="max-w-[1280px] mx-auto mt-14 grid xl:grid-cols-[790px_375px] gap-10 xl:gap-[114px] items-start justify-center">
        <SvgAsset src={assets.variantCompare} alt="Version B 비교 목업" className="w-[790px]" />
        <SvgAsset src={assets.variantC} alt="Version C 목업" className="w-[375px]" />
      </FadeUp>
    </div>
  </section>
);

// ─── 05. 사용자 인터뷰 — Figma: 1074:40003 ───────────────────────────────────
const ExperimentSection = () => (
  <section className="bg-white py-[80px]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="flex flex-col gap-[48px] items-center">

        {/* H2 title */}
        <Heading className="text-center w-full">사용자 인터뷰</Heading>

        {/* 24px description */}
        <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] text-center max-w-[1276px]">
          가시성이 높은 C안은 단기 전환 관점에서는 매력적이었지만,{" "}
          주문현황 페이지의 핵심 역할인{" "}
          <span className="font-semibold">배송 현황 확인을 방해할 가능성</span>이 있었습니다.
          <br />
          그래서 고객이 C안에서도 도착 시간, 배달 위치, 주문 내역을 문제없이 확인할 수 있는지 검증했습니다.
        </p>

        {/* 2-column validation table — stacks on mobile */}
        <div className="border border-[#E5E8EB] rounded-[12px] w-full overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Column headers */}
            <div className="bg-[#F2F4F6] md:border-r border-b border-[#E5E8EB] px-[16px] sm:px-[24px] py-[10px] flex items-center justify-center">
              <p className="text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.5] font-semibold text-[#111] text-center">확인하고자 한 내용</p>
            </div>
            <div className="bg-[#F2F4F6] border-b border-[#E5E8EB] px-[16px] sm:px-[24px] py-[10px] flex items-center justify-center">
              <p className="text-[16px] sm:text-[20px] lg:text-[24px] leading-[1.5] font-semibold text-[#111] text-center">검증질문</p>
            </div>
            {/* Left: question */}
            <div className="md:border-r border-b md:border-b-0 border-[#E5E8EB] px-[16px] sm:px-[24px] py-[24px] sm:py-[32px] flex items-center justify-center">
              <p className="text-[15px] sm:text-[18px] lg:text-[24px] leading-[1.6] font-semibold text-[#111] text-center">
                C안을 기준으로 주문현황페이지에서<br />
                고객이 해야하는 행동을 할 수 있는가?
              </p>
            </div>
            {/* Right: 4 rows */}
            <div className="flex flex-col divide-y divide-[#E5E8EB]">
              {[
                "도착 예정 시간을 바로 인지하는가?",
                "배달 기사님의 위치를 확인할 수 있는가?",
                "주문 내역과 요청사항을 찾을 수 있는가?",
                "쇼핑 제안을 광고가 아닌 맥락적 제안으로 이해하는가?",
              ].map((q) => (
                <div key={q} className="px-[16px] sm:px-[24px] py-[10px] flex items-center justify-center min-h-[48px] sm:min-h-[56px]">
                  <p className="text-[14px] sm:text-[17px] lg:text-[24px] leading-[1.6] font-normal text-[#111] text-center">{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Down arrow */}
        <p className="text-[40px] leading-[48px] font-black text-[#111] text-center">↓</p>

        {/* Interview insights box */}
        <div className="bg-white border border-[#E5E8EB] rounded-[12px] px-[24px] py-[48px] w-full flex flex-col gap-[32px] items-center">
          <Heading className="text-center w-full">인터뷰 인사이트</Heading>
          <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] text-center">
            인터뷰 결과, C안은 쇼핑 영역의 발견 가능성은 높였지만<br />
            고객이 먼저 확인해야 하는 도착 시간, 배달 상태, 주문 내역의 인지를 방해했습니다.<br />
            특히 일부 고객은 쇼핑 영역을 주문 정보보다 먼저 인식해,<br />
            <span className="font-semibold">주문현황 페이지의 primary job이 흐려지는 문제가 확인</span>되었습니다.
          </p>
        </div>
      </FadeUp>
    </div>
  </section>
);

const FinalDirectionSection = () => (
  <section className="bg-[#F2F4F6] py-20 lg:min-h-[1169px]">
    <div className="max-w-[1916px] mx-auto px-6">
      <FadeUp className="max-w-[1276px] mx-auto text-center">
        <Heading className="text-center">최종 방향성 결정</Heading>
      </FadeUp>
      <FadeUp delay={0.08} className="flex justify-center mt-8">
        <SvgAsset src={assets.finalDirection} alt="최종 방향성 목업" className="w-[782px]" />
      </FadeUp>
      <FadeUp delay={0.1} className="max-w-[1276px] mx-auto mt-8 text-center">
        <Body>
          리더십에서 C안의 높은 가시성이 단기 전환에는 유리하지만, 주문현황 페이지의 primary job인 배송 확인을 방해할 수 있다는 사용자 인터뷰 결과를 공유했습니다. 그 결과, B안을 최종 방향으로 결정했습니다.
        </Body>
      </FadeUp>
    </div>
  </section>
);

const AfterIntro = () => (
  <section className="bg-white py-12 lg:h-[167px] flex items-center">
    <div className={`${CONTAINER_CLASS} text-center`}>
      <h2 className="text-[64px] leading-[70.4px] font-black text-[#2563EB]">After</h2>
    </div>
  </section>
);

const SolutionSection = () => (
  <section className="bg-white lg:min-h-[3183px]">
    <div className={CONTAINER_CLASS}>
      <div className="grid lg:grid-cols-2 gap-6">
        <FadeUp>
          <SolutionGifCard
            src={assets.gifTiming}
            title="주문 확정 직후에만 제안"
            description="주문이 확정된 직후, 고객이 주문현황 페이지에 머무는 시점에만 쇼핑 제안을 노출했습니다."
          />
        </FadeUp>
        <FadeUp delay={0.08}>
          <SolutionGifCard
            src={assets.gifBottomSheet}
            title="쉽게 접고 펼칠 수 있는 바텀시트"
            description="쇼핑 제안을 보더라도, 고객이 언제든 배송 확인 흐름으로 쉽게 돌아갈 수 있도록 했습니다."
          />
        </FadeUp>
      </div>
      <FadeUp delay={0.08} className="mt-14">
        <SolutionBrowseCard />
      </FadeUp>
      <FadeUp delay={0.12} className="mt-14">
        <SolutionTrackingCard />
      </FadeUp>
    </div>
  </section>
);

const LearningsSection = () => (
  <section className="bg-white py-20 lg:min-h-[783px]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center">
        <Heading className="text-center">배운점</Heading>
      </FadeUp>
      <FadeUp delay={0.08} className="grid md:grid-cols-2 gap-[16px] mt-12">
        <div className="bg-white border-2 border-[#E5E8EB] rounded-[12px] p-[48px] flex flex-col gap-[16px]">
          <h3 className="text-[24px] leading-[33.6px] font-semibold text-[#111]">노출보다 맥락이 중요했습니다.</h3>
          <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
            새로운 서비스의 성장을 위해서는 더 크게, 더 자주 보여주는 것보다 <strong className="font-bold">고객이 받아들일 수 있는 순간에 제안하는 것이 중요</strong>했습니다. 이번 프로젝트를 통해 전환을 만드는 디자인은 가시성뿐 아니라 사용자의 현재 과업과 맥락을 함께 고려해야 한다는 점을 배웠습니다.
          </p>
        </div>
        <div className="bg-white border-2 border-[#E5E8EB] rounded-[12px] p-[48px] flex flex-col gap-[16px]">
          <h3 className="text-[24px] leading-[33.6px] font-semibold text-[#111]">사용자 근거로 의사결정을 전환했습니다.</h3>
          <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
            디자인팀은 배송 확인 흐름을 덜 방해하는 B안을 추천했지만, 초기 리더십은 발견 가능성이 높은 C안이었습니다. 저는 C안의 리스크를 사용자 인터뷰로 검증하고, 배송 확인 경험을 해칠 수 있다는 근거를 바탕으로 B안을 설득했습니다.
          </p>
        </div>
      </FadeUp>
      <FadeUp delay={0.1} className="bg-[#FFF0F2] rounded-[12px] p-[48px] mt-[16px] flex flex-col gap-[16px]">
        <h3 className="text-[24px] leading-[33.6px] font-semibold text-[#FF334B]">Next Step</h3>
        <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
          추가 구매 전환을 높이기 위해 제한된 시간 안에서 원하는 상품을 더 빠르게 찾는 탐색 경험을 고도화할 예정입니다. 우선 카테고리 필터와 검색을 개선하고, 이후 음식 주문 맥락에 맞는 개인화 추천으로 확장할 수 있습니다. 장기적으로는 쇼핑뿐 아니라 음식 추가 주문까지 확장해 AOV 개선 기회를 검토할 수 있습니다.
        </p>
      </FadeUp>
    </div>
  </section>
);

interface ProtectedSectionProps {
  title?: string;
  description?: string;
}

export const ProtectedSection = ({
  title = "Protected Project Details",
  description = "Due to the sensitive nature of this product's internal strategy, access to the full documentation is restricted.\nPlease contact me directly for a temporary access code.",
}: ProtectedSectionProps) => (
  <section className="relative w-full flex flex-col items-center py-[88px] z-20 bg-white">
    <div className="flex flex-col items-center gap-[32px] max-w-[1280px] w-full px-5 text-center relative z-10">
      <FadeUp className="flex flex-col items-center gap-[32px] w-full">
        <div className="w-[60px] h-[60px] flex justify-center items-center">
          <img src={lockIcon} alt="Lock" className="w-[60px] h-[60px] object-contain" />
        </div>
        <h2 className="text-[40px] leading-[48px] font-bold text-[#111]">{title}</h2>
        <p className="text-[16px] leading-[25.6px] font-normal text-[#616161] whitespace-pre-line">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-[24px]">
          <input
            type="text"
            placeholder="Enter access code"
            className="flex items-center justify-center h-[40px] w-[197px] px-[24px] rounded-full border-[1.5px] border-[#2563EB] text-[#2563EB] font-bold text-[16px] placeholder:text-[#2563EB] placeholder:font-bold outline-none text-center bg-transparent"
          />
          <a
            href="https://www.linkedin.com/in/hacci/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center justify-center h-[40px] w-[296px] px-[24px] rounded-full border-[1.5px] border-[#2563EB] text-[#2563EB] font-bold text-[16px] gap-[4px] hover:bg-[#EFF6FF] transition-colors bg-transparent"
          >
            <Linkedin className="w-[20px] h-[20px]" strokeWidth={1.5} />
            <span>Request Access via LinkedIn</span>
          </a>
        </div>
      </FadeUp>
    </div>
  </section>
);

export const DetailFooter = () => (
  <footer className="py-[56px] bg-white relative z-20 border-t border-[#EFEFEF]">
    <div className={CONTAINER_CLASS}>
      <FadeUp>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[32px] pt-[24px]">
          <div>
            <p className="text-[24px] font-black text-[#111] leading-[1.3]">If this project summary was interesting to you,</p>
            <p className="text-[24px] font-black text-[#111] leading-[1.3]">let's talk.</p>
            <div className="flex items-center gap-[32px] text-[16px] font-bold text-[#616161] mt-[24px]">
              <a href="https://www.linkedin.com/in/hacci/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Linkedin</a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
              <a href="mailto:hajihye2096@gmail.com" className="hover:text-black transition-colors">Mail</a>
            </div>
          </div>
          <div className="text-[16px] font-normal text-[#999]">Design and vibe coded by Jihye ha, 2025</div>
        </div>
      </FadeUp>
    </div>
  </footer>
);

export default function ProjectDetailPage({ onBack, onAbout }: { onBack: () => void; onAbout?: () => void }) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111] overflow-x-hidden">
      <Navbar onBack={onBack} onAbout={onAbout} />
      <main>
        <HeroSection />
        <BackgroundSection />
        <OpportunitySection />
        <VariantSection />
        <ExperimentSection />
        <FinalDirectionSection />
        <AfterIntro />
        <SolutionSection />
        <LearningsSection />
      </main>
      <DetailFooter />
    </div>
  );
}
