/**
 * Project 4 Detail Page — Cancellation Recovery Flow (Coupang Eats)
 * Figma node: 1054-53536 ("project 2")
 * Layout mirrors ProjectDetailPage.tsx (P1 Add-On Experience Design)
 */

import React from "react";
import { FadeUp, CONTAINER_CLASS, Navbar, DetailFooter } from "./ProjectDetailPage";

// ─── Asset paths ──────────────────────────────────────────────────────────────
const heroMockup    = "/assets/project04/export_project_main_visual.svg";
const canceledIllust = "/assets/project04/export_canceled illust.svg";
const problemImage    = "/assets/project04/export_ASIS.svg";
const solutionImage   = "/assets/project04/export_TOBE.svg";

// ─── Shared primitive components ─────────────────────────────────────────────
const Heading = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`text-[24px] lg:text-[40px] leading-[1.2] font-black text-[#111] ${className}`}>
    {children}
  </h2>
);

const Body = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] ${className}`}>
    {children}
  </p>
);

const FigmaSectionImage = ({
  src,
  alt,
  className = "max-w-[1280px]",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <img
    src={src}
    alt={alt}
    className={`mx-auto block h-auto w-full ${className}`}
    loading="lazy"
    decoding="async"
  />
);

// ─── KPI Row — red label variant (cancellation theme) ────────────────────────
const KpiRow = () => (
  <div className="bg-[#F9FAFB] rounded-[12px] flex flex-col sm:flex-row items-stretch py-[16px] gap-0">
    {([
      ["Primary KPI", "Post-cancel buyer conversion"],
      ["Scope",       "Post-cancel recovery"],
      ["Method",      "A/B test"],
    ] as [string, string][]).map(([label, value], i) => (
      <React.Fragment key={label}>
        {i > 0 && (
          <>
            <div className="hidden sm:block w-px bg-[#E5E8EB] self-stretch flex-shrink-0" />
            <div className="block sm:hidden h-px bg-[#E5E8EB] mx-4" />
          </>
        )}
        <div className="flex-1 flex flex-col items-center justify-center py-[12px] sm:py-[8px] text-center px-2">
          <p className="text-[15px] sm:text-[18px] lg:text-[22px] leading-[1.5] font-bold text-[#FF334B]">{label}</p>
          <p className="text-[14px] sm:text-[16px] lg:text-[22px] leading-[1.5] font-normal text-[#374151]">{value}</p>
        </div>
      </React.Fragment>
    ))}
  </div>
);

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
const HeroSection = () => (
  <section className="bg-white pt-[56px]">
    <div className={CONTAINER_CLASS}>
      <div className="grid lg:grid-cols-[minmax(0,628px)_minmax(0,628px)] gap-6 items-start pt-[32px] lg:pt-[129px]">

        {/* Hero image — top on mobile */}
        <FadeUp delay={0.08} className="flex justify-center lg:justify-end order-1 lg:order-2 pt-[32px] lg:pt-0">
          <div className="relative w-full max-w-[628px]">
            <img
              src={heroMockup}
              alt="Cancellation Recovery Flow 히어로 화면"
              className="w-full h-auto block max-w-[628px]"
              loading="eager"
            />
          </div>
        </FadeUp>

        {/* Text */}
        <FadeUp className="order-2 lg:order-1 pt-[16px] lg:pt-[76px]">
          <div className="mb-6 lg:mb-8">
            <img
              src="/assets/coupang-eats-logo.png"
              alt="Coupang Eats"
              className="h-[28px] w-auto"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <h1 className="text-[32px] sm:text-[44px] lg:text-[64px] leading-[1.1] tracking-[-0.02em] lg:tracking-[-0.03em] font-black text-[#111]">
            Cancellation<br />Recovery Flow
          </h1>
          <p className="mt-4 lg:mt-6 max-w-[628px] text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111]">
            주문이 취소된 고객이 다시 처음부터 찾지 않아도, 비슷한 식당과 메뉴로 바로 이어질 수 있게 개선했습니다.
          </p>
          <dl className="mt-[40px] lg:mt-[72px] grid grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr] gap-x-4 lg:gap-x-6 gap-y-3 lg:gap-y-4 text-[14px] lg:text-[16px] leading-[25.6px]">
            <dt className="font-bold text-[#111]">Role</dt>
            <dd className="text-[#555]">Product designer</dd>
            <dt className="font-bold text-[#111]">Team</dt>
            <dd className="text-[#555] whitespace-pre-line">PM{"\n"}Product designer{"\n"}Front Engineers(AOS/iOS){"\n"}BE engineers{"\n"}QA team{"\n"}UX Writer</dd>
            <dt className="font-bold text-[#111]">Timeline</dt>
            <dd className="text-[#555]">2025</dd>
          </dl>
        </FadeUp>
      </div>

      {/* KPI Row */}
      <FadeUp delay={0.1} className="mt-10 lg:mt-20">
        <KpiRow />
      </FadeUp>

      {/* Impact */}
      <FadeUp delay={0.12} className="mt-10 lg:mt-20 pb-12 lg:pb-20">
        <div className="text-center">
          <Heading className="text-center">Impact</Heading>
          <p className="text-[18px] lg:text-[20px] leading-[1.7] font-normal text-[#111] max-w-[880px] mx-auto mt-5 text-center">
            주문 취소 이후의 회복 흐름을 개선하자 구매 전환율과 고객당 주문 수가 모두 증가했습니다.<br />
            이를 통해 추천 화면이 이탈을 줄이고 다음 주문으로 회복시키는 접점이 될 수 있음을 확인했습니다.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-[24px] mt-10">
          <div className="bg-[#FFF0F2] rounded-[8px] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-6 gap-[12px] lg:gap-[16px]">
            <p className="text-[15px] sm:text-[18px] lg:text-[24px] leading-[1.4] text-[#111] font-semibold">주문 취소 직후 재구매 전환율</p>
            <p className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] text-[#FF334B] font-black">+11.04%</p>
          </div>
          <div className="bg-[#FFF0F2] rounded-[8px] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-6 gap-[12px] lg:gap-[16px]">
            <p className="text-[15px] sm:text-[18px] lg:text-[24px] leading-[1.4] text-[#111] font-semibold">고객당 주문 수</p>
            <p className="text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.1] text-[#FF334B] font-black">+10.38%</p>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─── 2. Background ────────────────────────────────────────────────────────────
const BackgroundSection = () => (
  <section className="bg-white">
    <FadeUp className={`${CONTAINER_CLASS} pt-[64px] pb-[56px] lg:pt-[80px] lg:pb-[64px]`}>
      <div className="flex flex-col items-center text-center">
        <Heading className="text-center">Background</Heading>

        <p className="mt-[48px] w-full text-center text-[18px] lg:text-[24px] leading-[1.4] font-normal text-[#111]">
          인터뷰에서 한 고객은 주문 취소를 뒤늦게 알게 되었고, 결국 다른 앱에서 다시 주문했다고 말했습니다.
        </p>

        <div className="mt-[48px] flex w-full justify-center">
          <img
            src={canceledIllust}
            alt="주문 취소 인터뷰 인용 일러스트"
            width={794}
            height={262}
            className="block h-auto w-full max-w-[794px]"
            loading="lazy"
            decoding="async"
          />
        </div>

        <p className="mt-[48px] w-full text-center text-[18px] lg:text-[24px] leading-[1.4] font-normal text-[#111]">
          데이터를 확인해보니 <strong className="font-semibold">취소 주문의 55%는 매장 측 사유로 발생</strong>하고 있었습니다.<br />
          고객이 통제하기 어려운 취소였지만, 이후 재주문 과정의 부담은 고객에게 남아 있었습니다.
        </p>
      </div>
    </FadeUp>
  </section>
);

// ─── 3. Problem ───────────────────────────────────────────────────────────────
const ProblemSection = () => (
  <section className="bg-white">
    <FadeUp className={`${CONTAINER_CLASS} pt-[64px] pb-[56px] lg:pt-[80px] lg:pb-[64px]`}>
      <div className="flex flex-col items-center gap-[48px]">
        <Heading className="text-center">Problem</Heading>

        <div className="grid w-full grid-cols-1 gap-[24px] md:grid-cols-2 lg:gap-[32px]">
          <div className="flex min-h-[127px] flex-col items-center justify-center gap-[16px] rounded-[8px] border border-[#E5E8EB] bg-white p-[24px] text-center text-[#111]">
            <h3 className="w-full text-[20px] lg:text-[24px] leading-[1.4] font-semibold">
              취소 인지가 늦어짐
            </h3>
            <p className="w-full text-[16px] lg:text-[18px] leading-[1.6] font-normal">
              고객이 직접 확인하기 전까지 취소 상태를 알기 어려웠습니다.
            </p>
          </div>

          <div className="flex min-h-[127px] flex-col items-center justify-center gap-[16px] rounded-[8px] border border-[#E5E8EB] bg-white p-[24px] text-center text-[#111]">
            <h3 className="w-full text-[20px] lg:text-[24px] leading-[1.4] font-semibold">
              재주문 경로가 끊김
            </h3>
            <p className="w-full text-[16px] lg:text-[18px] leading-[1.6] font-normal">
              취소 이후 다시 홈이나 주문내역에서 탐색을 시작해야 했습니다.
            </p>
          </div>
        </div>

        <img
          src={problemImage}
          alt="취소 전후 문제 상황 비교"
          width={1276}
          height={652}
          className="block h-auto w-full max-w-[1276px]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </FadeUp>
  </section>
);

// ─── 4. Reorder Pattern ───────────────────────────────────────────────────────
const ReorderPatternSection = () => (
  <section className="py-[80px] bg-white">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[48px]">
        <Heading className="text-center">Reorder Pattern</Heading>
        <Body className="mt-6 max-w-[900px] mx-auto text-center">
          취소 이후 고객의 재주문 패턴을 확인했습니다.<br />
          고객은 완전히 새로운 탐색보다, 기존 주문과 가까운 카테고리나 브랜드에서 다시 주문하는 경향이 높았습니다.
        </Body>
      </FadeUp>
      <FadeUp delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {([
            ["77.08%", "취소 이후 재주문"],
            ["60.57%", "동일 카테고리 재주문"],
            ["55.67%", "동일 브랜드 재주문"],
          ] as [string, string][]).map(([stat, label]) => (
            <div key={stat} className="bg-white border border-[#E5E8EB] rounded-[8px] p-[24px] flex flex-col items-center justify-center text-center gap-[16px]">
              <p className="text-[32px] sm:text-[40px] leading-[48px] font-black text-[#111]">{stat}</p>
              <p className="text-[18px] lg:text-[24px] leading-[33.6px] font-semibold text-[#111]">{label}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─── 5. Hypothesis ────────────────────────────────────────────────────────────
const HypothesisSection = () => (
  <section className="py-[72px] bg-[#EFF6FF]">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center">
        <Heading className="text-center">Hypothesis</Heading>
        <Body className="mt-6 max-w-[900px] mx-auto text-center">
          동일 카테고리/브랜드 기반의 대체 옵션을 취소 직후 제공하면,<br />
          재탐색 비용을 줄이고 post-cancel buyer conversion을 높일 수 있을 것이다.
        </Body>
      </FadeUp>
    </div>
  </section>
);

// ─── 6. Design Strategy ───────────────────────────────────────────────────────
const DesignStrategySection = () => (
  <section className="py-[80px] bg-white">
    <div className={CONTAINER_CLASS}>
      <FadeUp className="text-center mb-[48px]">
        <Heading className="text-center">Design Strategy</Heading>
      </FadeUp>
      <FadeUp delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {([
            ["1", "취소 상태를 더 명확히 한다",  "고객이 직접 확인하기 전에 취소 상태를 명확하게 노출한다."],
            ["2", "재주문 경로를 단축한다",       "홈 재진입 없이 취소 플로우 안에서 대체 옵션 선택과 재주문으로 연결한다."],
            ["3", "대체 옵션의 관련도를 높인다",  "취소된 주문의 카테고리와 브랜드 맥락을 추천 기준으로 활용한다."],
          ] as [string, string, string][]).map(([num, title, desc]) => (
            <div key={num} className="bg-[#EFF6FF] rounded-[8px] p-[24px] flex flex-col items-center gap-[16px] text-center">
              <div className="w-[32px] h-[32px] rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                <span className="text-[18px] font-black text-white leading-none">{num}</span>
              </div>
              <div className="flex flex-col gap-[4px] w-full">
                <p className="text-[18px] lg:text-[24px] leading-[33.6px] font-semibold text-[#111]">{title}</p>
                <p className="text-[16px] lg:text-[18px] leading-[1.7] font-normal text-[#111]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  </section>
);

// ─── 7. Solution ─────────────────────────────────────────────────────────────
const SolutionSection = () => (
  <section className="bg-[#EFF6FF]">
    <FadeUp className={`${CONTAINER_CLASS} pt-[64px] pb-[72px] lg:pt-[72px] lg:pb-[80px]`}>
      <div className="flex flex-col items-center text-center">
        <Heading className="text-center text-[#2563EB]">Solution</Heading>
        <p className="mt-[16px] w-full text-center text-[18px] lg:text-[24px] leading-[1.4] font-normal text-[#111]">
          취소 상태를 안내한 직후, 기존 주문과 가까운 카테고리/브랜드 페이지로 연결했습니다.<br />
          고객은 홈으로 돌아가지 않고, 취소 맥락 안에서 바로 대체 옵션을 확인하고 다시 주문할 수 있습니다.
        </p>

        <img
          src={solutionImage}
          alt="취소 회복 플로우 솔루션"
          width={1276}
          height={1953}
          className="mt-[80px] block h-auto w-full max-w-[1276px] lg:mt-[88px]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </FadeUp>
  </section>
);

// ─── 8. Learnings ────────────────────────────────────────────────────────────
const LearningsSection = () => (
  <section className="bg-white">
    <FadeUp className={`${CONTAINER_CLASS} pt-[64px] pb-[56px] lg:pt-[80px] lg:pb-[64px]`}>
      <div className="flex flex-col items-center gap-[48px]">
        <Heading className="text-center">배운점</Heading>

        <div className="grid w-full grid-cols-1 items-stretch gap-[16px] md:grid-cols-2">
          <article className="flex flex-col items-start gap-[16px] rounded-[12px] border-2 border-[#E5E8EB] bg-white p-[32px] text-left text-[#111] lg:min-h-[262px] lg:p-[48px]">
            <h3 className="w-full text-[20px] lg:text-[24px] leading-[1.4] font-semibold">
              고객은 문제 상황에서도 아직 떠난 게 아니다
            </h3>
            <p className="w-full text-[16px] lg:text-[18px] leading-[1.6] font-normal">
              주문이 취소되면 고객 경험이 끝난다고 생각하기 쉽지만, 실제로는 고객이 여전히 같은 목적을 해결하려는 상태일 수 있었습니다. 중요한 것은 실패를 안내하는 것보다, 바로 이어갈 수 있는 선택지를 주는 것이었습니다.
            </p>
          </article>

          <article className="flex flex-col items-start gap-[16px] rounded-[12px] border-2 border-[#E5E8EB] bg-white p-[32px] text-left text-[#111] lg:min-h-[262px] lg:p-[48px]">
            <h3 className="w-full text-[20px] lg:text-[24px] leading-[1.4] font-semibold">
              좋은 솔루션은 이미 하고 있는 행동에서 찾을 수 있다
            </h3>
            <p className="w-full text-[16px] lg:text-[18px] leading-[1.6] font-normal">
              처음에는 취소를 더 잘 알려주는 것이 핵심이라고 봤지만, 데이터를 보니 고객은 취소 이후에도 비슷한 카테고리나 브랜드에서 다시 주문하고 있었습니다. 새로운 행동을 만들기보다, 고객이 이미 하려는 행동을 더 쉽게 만드는 것이 더 효과적이었습니다.
            </p>
          </article>
        </div>
      </div>
    </FadeUp>
  </section>
);

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function Project4DetailPage({ onBack, onAbout }: { onBack: () => void; onAbout?: () => void }) {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111] overflow-x-hidden">
      <Navbar onBack={onBack} onAbout={onAbout} />
      <main>
        <HeroSection />
        <BackgroundSection />
        <ProblemSection />
        <ReorderPatternSection />
        <HypothesisSection />
        <DesignStrategySection />
        <SolutionSection />
        <LearningsSection />
      </main>
      <DetailFooter />
    </div>
  );
}
