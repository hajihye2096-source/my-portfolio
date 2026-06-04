import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

type Language = "en" | "ko";

const LANGUAGE_STORAGE_KEY = "portfolio-language";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({
  language: "en",
  setLanguage: () => {},
});

const originalText = new WeakMap<Text, string>();
const originalAttribute = new WeakMap<Element, string>();

const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

const translations: Record<string, string> = {
  "Product designer.": "Product Designer.",
  "HA JIHYE": "하지혜",
  Work: "작업",
  About: "소개",
  Contact: "연락",
  "Résumé": "이력서",
  Resume: "이력서",
  Email: "이메일",
  Linkedin: "링크드인",
  LinkedIn: "링크드인",
  Instagram: "인스타그램",
  Mail: "메일",

  "Solving Complex Business Problems through": "복잡한 비즈니스 문제를",
  "Simple Design Solutions.": "이해하기 쉬운 디자인으로 풀어냅니다.",
  "Senior Product Designer specialized in building scalable systems and high-impact user experiences. Focused on bridging the gap between user needs and business goals.":
    "수백만 명이 쓰는 서비스에서 사용자 문제와 비즈니스 목표가 만나는 지점을 설계해 왔습니다. 작게 바꿔도 실제 지표가 움직이는 경험을 만드는 데 집중합니다.",
  "View Selected Works": "대표 작업 보기",
  Role: "역할",
  Impact: "임팩트",
  "Read Case Study": "프로젝트 보기",
  "Selected Works": "대표 작업",
  Projects: "프로젝트",
  "Logistics · E-commerce": "Logistics · E-commerce",
  "E-commerce · Post-Order": "E-commerce · Post-Order",
  "E-commerce · Post-Cancel": "E-commerce · Post-Cancel",
  "Recovery UX": "Recovery UX",
  "Reorder Conversion": "Reorder Conversion",
  "Cancellation Recovery Flow": "주문취소 개선 프로젝트",
  "When an order is cancelled, customers shouldn't have to start over. Redesigned the post-cancellation flow to surface relevant restaurants immediately and restore purchase intent.":
    "주문이 취소된 고객이 다시 처음부터 찾지 않아도, 비슷한 식당과 메뉴로 바로 이어질 수 있게 개선했습니다.",
  "+11.04% post-cancel buyer conversion · +10.38% orders per user":
    "취소 후 구매 전환율 +11.04% · 고객당 주문 수 +10.38%",
  "Conversion Design": "Conversion Design",
  "Add-On UX": "Add-On UX",
  "Product Strategy": "제품 전략",
  "System Design": "시스템 설계",
  "Data-Driven UX": "Data-Driven UX",
  "Post-Order Add-On Experience Design": "주문직후 추가구매 개선 프로젝트",
  "Turned the high-engagement moment right after a food order into a shopping touchpoint — surfacing add-on suggestions on the order status page without disrupting delivery tracking.":
    "쿠팡이츠 쇼핑은 충분한 머천트 커버리지를 확보했지만 주문 전환은 기대에 미치지 못했습니다. 저는 음식 주문 직후 고객이 가장 많이 재진입하는 주문현황 페이지를 활용해, 배송 확인 경험을 방해하지 않는 쇼핑 추가 구매 흐름을 설계했습니다.",
  "+80% new shopping buyers · +7.1%p order share in Seoul": "쇼핑 첫 구매 고객 +80% · 서울 주문 비중 +7.1%p",
  "Redesigning the Post-order Experience for Coupang Eats": "쿠팡이츠 주문 후 경험 리디자인",
  "Led end-to-end redesign of the delivery tracking system to reduce support inquiries and increase transparency across the post-purchase journey.":
    "배달 상태를 더 명확하게 보여주기 위해 주문 후 화면을 다시 설계했습니다. 고객이 지금 무슨 일이 일어나는지 쉽게 이해하도록 만들어 CS 문의를 줄였습니다.",
  "Senior Product Designer": "Senior Product Designer",
  "Reduced CS inquiries related to delivery status": "배송 상태 관련 고객 문의 감소",
  "Agile · Digital Signage": "Agile · Digital Signage",
  "Code-First Design": "Code-First Design",
  "AI Prompting": "AI Prompting",
  "48h Sprint": "48h Sprint",
  "48-Hour Design-to-Code: Solo Design for Bakery Fair 2026": "48시간 디자인-투-코드: 베이커리페어 2026 단독 디자인",
  "From CEO brief to 8 live signage screens in 4 hours. No Figma, no handoff — AI prompting directed by design judgment alone.":
    "From CEO brief to 8 live signage screens in 4 hours — a Code-First agile sprint executed with AI prompting alone. No Figma. No handoff.",
  "Solo Product Designer": "Solo Product Designer",
  "8 live signage screens deployed in 4 hours": "4시간 만에 live signage 화면 8개 배포",
  "IoT · Smart Home": "IoT · Smart Home",
  "UX/UI Design": "UX/UI 디자인",
  "Design System": "Design System",
  "Conversational AI": "Conversational AI",
  "Building a Unified IoT Platform for Personalized Smart Living": "개인화된 스마트 리빙을 위한 통합 IoT 플랫폼 구축",
  "Designed an AI-driven smart home app that unifies fragmented device ecosystems and delivers context-aware automation through conversational AI.":
    "A unified IoT platform that connects fragmented smart devices and proactively suggests \"Smart Mode\" based on user behavior patterns.",
  "Product Designer": "Product Designer",
  "Unified multi-brand device control into a single ecosystem": "여러 브랜드 기기를 하나의 앱에서 제어",
  "Open for global opportunities.": "글로벌 기회를 열어두고 있습니다.",
  "Let's build something impactful together.": "좋은 문제를 함께 풀어보고 싶습니다.",
  "Product designer. JiHYE HA": "Product Designer. JiHYE HA",
  "© 2026 Senior Product Designer. All rights reserved.": "© 2026 Senior Product Designer. All rights reserved.",

  "Open to global opportunities": "글로벌 기회를 열어두고 있습니다",
  "Product Designer.": "프로덕트 디자이너.",
  "Ha Jihye.": "하지혜",
  "6 years designing experiences for millions of users at Coupang & Coupang Eats.":
    "쿠팡과 쿠팡이츠에서 수백만 사용자를 위한 경험을 6년간 설계했습니다.",
  "Solving real business problems through data-driven UX strategy.": "데이터 기반 UX 전략으로 실제 비즈니스 문제를 해결합니다.",
  "Seoul, South Korea": "서울, 대한민국",
  "Get in touch": "연락하기",
  "Years Experience": "년 경력",
  "Coupang · Coupang Eats · Skelter Labs": "쿠팡 · 쿠팡이츠 · 스켈터랩스",
  "Users Impacted": "영향을 받은 사용자",
  "Korea's largest commerce ecosystem": "국내 최대 커머스 생태계",
  "Products Shipped": "출시한 제품",
  "Post-order · Commerce · IoT": "주문 후 경험 · 커머스 · IoT",
  "Measurable Impact": "측정 가능한 임팩트",
  "Design Proven by Numbers": "숫자로 증명한 디자인",
  "Gateway CTR": "게이트웨이 CTR",
  "Coupang Eats · Post-order": "쿠팡이츠 · 주문 후 경험",
  "Redesigned the information hierarchy of the real-time delivery status page, surfacing critical decision-making data first to drive higher user engagement.":
    "실시간 배송 상태 페이지의 정보 구조를 재설계해 핵심 의사결정 정보를 먼저 드러내고 사용자 참여를 높였습니다.",
  "Purchase Conversion": "구매 전환율",
  "Coupang · Commerce Funnel": "쿠팡 · 커머스 퍼널",
  "Restructured the checkout decision flow by eliminating cognitive overload at the highest drop-off point, directly improving purchase conversion.":
    "이탈이 가장 큰 결제 구간의 인지 부담을 줄여 구매 전환율을 직접 개선했습니다.",
  "Critique Participation": "크리틱 참여",
  "Team · Design Culture": "팀 · 디자인 문화",
  "Transformed weekly critiques from mandatory check-ins into structured decision-making sessions — designers began requesting them voluntarily.":
    "주간 크리틱을 의무 보고가 아닌 구조화된 의사결정 세션으로 바꾸어 디자이너들이 자발적으로 요청하는 문화로 전환했습니다.",
  Career: "커리어",
  "6 Years of Experience": "6년의 경험",
  Current: "현재",
  "2021 — Present": "2021 — 현재",
  "Post-order UX · Delivery Experience · Behavioral Systems": "주문 후 UX · 배송 경험 · 행동 기반 시스템",
  "Sole designer owning the real-time delivery experience system for millions of users": "수백만 사용자를 위한 실시간 배송 경험 시스템을 단독으로 담당",
  "Evolved UX architecture across Waiting, Cancelled, and Idle delivery states": "대기, 취소, 유휴 배송 상태 전반의 UX 아키텍처 고도화",
  "Double Delivery strategy contributed 4.6% new non-food category revenue": "더블딜리버리 전략으로 비식품 카테고리 신규 매출 4.6% 기여",
  "Commerce Funnel · Checkout UX · Design System": "커머스 퍼널 · 결제 UX · 디자인 시스템",
  "Improved commerce checkout conversion rate by +18.88%": "커머스 결제 전환율 +18.88% 개선",
  "Rebuilt Design System 2.0 — semantic tokens + variant-based components": "시맨틱 토큰과 variant 기반 컴포넌트로 디자인 시스템 2.0 재구축",
  "Shortened design-to-dev handoff cycles, boosting overall team productivity": "디자인-개발 핸드오프 주기를 단축해 팀 생산성 향상",
  "IoT Platform · Smart Home · Conversational AI": "IoT 플랫폼 · 스마트홈 · 대화형 AI",
  "Led UX/UI design for AI-powered smart home app 'Brilli'": "AI 스마트홈 앱 'Brilli'의 UX/UI 디자인을 담당했습니다",
  "Designed multi-brand device integration ecosystem for unified smart home control": "통합 스마트홈 제어를 위한 멀티 브랜드 기기 연동 생태계 설계",
  "Established conversational AI interface patterns across the product": "제품 전반의 대화형 AI 인터페이스 패턴 정립",
  "Visual Design": "비주얼 디자인",
  "UX Design · GUI · Branding": "UX 디자인 · GUI · 브랜딩",
  "Industry collaboration project with Samsung Electronics for TV accessories": "삼성전자 TV 액세서리 산학 협력 프로젝트",
  "2017 Gwangju Biennale THE FUTURE exhibition — waste recycling service design": "2017 광주비엔날레 THE FUTURE 전시 — 폐기물 재활용 서비스 디자인",
  "UX/GUI design for C-LAB chatbot 'BOM' (AI-based photo sharing app)": "C-LAB 챗봇 'BOM' UX/GUI 디자인",
  "Skills & Tools": "스킬 & 도구",
  "What I Bring to the Table": "제가 기여할 수 있는 역량",
  Design: "디자인",
  Strategy: "전략",
  Leadership: "리더십",
  Craft: "크래프트",
  "How I work": "일하는 방식",
  "How I Solve Problems": "문제를 해결하는 방식",
  "Friction Signal": "마찰 신호",
  "Identify Signal": "신호 발견",
  "CS data, drop-off rates, session heatmaps — I look for behavioral gaps where users stop, hesitate, or find workarounds.":
    "CS 데이터, 이탈률, 세션 히트맵에서 사용자가 멈추거나 망설이거나 우회하는 행동의 간극을 찾습니다.",
  "Systems Reframe": "시스템 재정의",
  "Reframe as System": "시스템으로 다시 보기",
  "Who is most affected? What upstream decision created this downstream symptom? I zoom out before zooming in.":
    "누가 가장 큰 영향을 받는지, 어떤 상위 결정이 하위 증상을 만들었는지 먼저 넓게 본 뒤 세부로 들어갑니다.",
  "Min. Intervention": "최소 개입",
  "Minimum Intervention": "최소한의 개입",
  "Not the most elegant solution — the smallest change with the most measurable impact. Constraints make design sharper.":
    "가장 멋진 해법보다 측정 가능한 임팩트를 내는 가장 작은 변화를 찾습니다. 제약은 디자인을 더 선명하게 만듭니다.",
  "Ship & Measure": "출시와 측정",
  "Success metrics are defined before design begins. The hypothesis is part of the brief, not an afterthought.":
    "디자인을 시작하기 전에 성공 지표를 정의합니다. 가설은 뒤늦은 설명이 아니라 브리프의 일부입니다.",
  "Let's work together": "함께 일해요",
  "Let's build something meaningful.": "의미 있는 것을 함께 만들어봐요.",
  "If you'd like to talk about product strategy, UX systems, or building great design teams — I'd love to hear from you.":
    "제품 전략, UX 시스템, 좋은 디자인 팀을 만드는 일에 대해 이야기하고 싶다면 언제든 연락 주세요.",
  "Download Résumé": "이력서 다운로드",
  "Back to work": "작업으로 돌아가기",
  "© 2026 Product Designer. JiHYE HA · All rights reserved.": "© 2026 프로덕트 디자이너. 하지혜 · All rights reserved.",

  Redesign: "리디자인",
  Team: "팀",
  Timeline: "타임라인",
  "Post-order Journey": "주문 후 여정",
  "Post-order Journey Redesign": "주문 후 여정 리디자인",
  "Each initiative was independently tested and launched at different points in time. This case study reframes them as a single system to explain my approach to designing the post-order experience.":
    "각 이니셔티브는 서로 다른 시점에 독립적으로 테스트되고 출시되었습니다. 이 케이스 스터디는 이를 하나의 시스템으로 재구성해 주문 후 경험을 설계한 접근 방식을 설명합니다.",
  "Coupang Eats History": "쿠팡이츠 히스토리",
  "Coupang Eats launched in Korea in 2019 and became the fastest-growing food delivery platform in the country. In 2024, it introduced unlimited free delivery, raising the bar across the industry. The post-order experience is central to this promise. Every interaction customers have after placing an order builds or erodes trust.":
    "쿠팡이츠는 2019년 한국에서 시작해 국내에서 가장 빠르게 성장한 음식 배달 플랫폼이 되었습니다. 2024년에는 무제한 무료배달을 도입하며 업계 기준을 높였습니다. 주문 후 경험은 이 약속의 중심에 있으며, 주문 이후의 모든 상호작용은 신뢰를 쌓거나 무너뜨립니다.",
  "Why Post-order?": "왜 주문 후 경험인가?",
  "The funnel": "퍼널은",
  "every customer must go through": "모든 고객이 반드시 거치는 과정입니다",
  "after placing an order": "주문 이후에",
  Discovery: "탐색",
  "Home & list": "홈 & 리스트",
  "Search & Browse": "검색 & 탐색",
  "Explore & Select Items": "상품 탐색 & 선택",
  "Cart & Purchase": "장바구니 & 구매",
  "Review Cart": "장바구니 확인",
  "Add Payment Method": "결제수단 추가",
  "Post-Order": "주문 후",
  Realtime: "실시간",
  "Delivery Tracking": "배송 추적",
  "Food delivered": "음식 도착",
  "Receive & Dine": "수령 & 식사",
  "Rate Experience": "경험 평가",
  "Customer & Business Needs": "고객과 비즈니스 니즈",
  Customer: "고객",
  "Customers face a range of issues after placing an order. From unclear delivery status to unexpected cancellations.":
    "고객은 주문 이후 불명확한 배송 상태부터 예상치 못한 취소까지 다양한 문제를 마주합니다.",
  Business: "비즈니스",
  "Reducing CS inquiries and growing post-payment revenue are two sides of the same problem.":
    "CS 문의를 줄이는 것과 결제 이후 매출을 키우는 것은 같은 문제의 양면입니다.",
  Hypothesis: "가설",
  "Post-order anxiety increases when customers don't clearly understand": "고객이 명확히 이해하지 못할 때 주문 후 불안은 커집니다:",
  "what's happening now, what comes next, and what options they have.": "지금 무슨 일이 일어나는지, 다음에 무엇이 오는지, 어떤 선택지가 있는지.",
  "State-based Post-order System": "상태 기반 주문 후 시스템",
  "Different design strategies are needed depending on the post-order user state.": "주문 후 사용자 상태에 따라 서로 다른 디자인 전략이 필요합니다.",
  "Each module addresses a": "각 모듈은",
  "different post-order state": "서로 다른 주문 후 상태",
  "They do not form a linear journey.": "를 다루며, 선형 여정을 이루지 않습니다.",
  Waiting: "대기",
  "Is my order actually progressing?": "내 주문이 실제로 진행되고 있을까?",
  Clarity: "명확성",
  "Realtime Revamp": "실시간 화면 개선",
  Cancelled: "취소",
  "What should I do right now?": "지금 무엇을 해야 할까?",
  Recovery: "회복",
  "Alternative Suggestion": "대안 추천",
  Idle: "유휴",
  "Why is nothing showing up?": "왜 아무것도 보이지 않을까?",
  Monetization: "수익화",
  "Double Delivery": "더블딜리버리",
  "Waiting Clarity System": "대기 상태 명확화 시스템",
  "Building ETA Trust and Reducing Misunderstanding": "ETA 신뢰 형성과 오해 감소",
  "Primary KPI": "주요 KPI",
  "CS Contact Rate ↓": "CS 접촉률 ↓",
  Scope: "범위",
  "Customer App / KR": "고객 앱 / 한국",
  Method: "방법",
  "A/B test": "A/B 테스트",
  Background: "배경",
  "To reduce delivery costs, we introduced multi-delivery.": "배송비를 줄이기 위해 묶음배송을 도입했습니다.",
  "Within 3 days, we received over 30 customer reports about confusion regarding rider routes and unreliable ETAs.":
    "3일 만에 라이더 경로와 신뢰하기 어려운 ETA에 대한 혼란 관련 고객 제보가 30건 이상 접수되었습니다.",
  "We redesigned the real-time order page to improve status clarity and reduce anxiety-based CS contacts.":
    "상태 명확성을 높이고 불안 기반 CS 접촉을 줄이기 위해 실시간 주문 페이지를 리디자인했습니다.",
  Before: "이전",
  Problem: "문제",
  "Customers misread delivery progress": "고객은 배송 진행 상황을 잘못 이해했습니다.",
  "because the system doesn't explain non-linear delivery behavior.": "시스템이 비선형 배송 행동을 설명하지 않았기 때문입니다.",
  "Core Design Decision": "핵심 디자인 결정",
  "We stopped viewing ETA discrepancies as a prediction problem,": "ETA 불일치를 예측 문제로 보지 않고,",
  "and redefined them as a": "이를",
  "progress interpretation problem": "진행 상황 해석 문제",
  Solution: "솔루션",
  "ETA as an Expectation Management Tool": "기대 관리를 위한 ETA",
  "Single ETA → Dynamic Range": "단일 ETA → 동적 범위",
  "Purpose: Signal that delivery progress can naturally vary": "목적: 배송 진행이 자연스럽게 달라질 수 있음을 전달",
  "Normalizing Multi-stop Delivery Behavior": "여러 경유지 배송 행동의 정상화",
  "Badge & Banner when a stop is added": "경유지가 추가될 때 배지와 배너 표시",
  "Purpose: Prevent misunderstanding of normal delivery patterns": "목적: 정상적인 배송 패턴에 대한 오해 방지",
  After: "이후",
  "ETA as a Time Range": "시간 범위로서의 ETA",
  "Replacing a single ETA with a dynamic time range helps customers naturally understand delivery variability, reducing anxiety when arrival time changes.":
    "단일 ETA를 동적 시간 범위로 바꾸면 고객이 배송 변동성을 자연스럽게 이해하고 도착 시간이 바뀔 때의 불안을 줄일 수 있습니다.",
  "ETA over Map": "지도보다 먼저 보이는 ETA",
  "By placing the ETA above the map, customers can see": "ETA를 지도 위에 배치해 고객이",
  "when their order will arrive": "주문이 언제 도착하는지",
  "before anything else.": "가장 먼저 볼 수 있게 했습니다.",
  "Visualized Delivery Status": "시각화된 배송 상태",
  "Visual delivery status indicators communicate progress at a glance, making it clear where the order is without guesswork.":
    "시각적 배송 상태 표시가 진행 상황을 한눈에 전달해 추측 없이 주문 위치를 이해하게 합니다.",
  "Protected metrics": "보호된 지표",
  "CS Reduction": "CS 감소",
  VOC: "VOC",
  "Silent cancellations lead to immediate competitor churn": "무음 취소는 즉각적인 경쟁 서비스 이탈로 이어집니다",
  "We improved the app to help customers quickly find a new restaurant when their order is cancelled.":
    "주문이 취소되었을 때 고객이 빠르게 새 식당을 찾을 수 있도록 앱을 개선했습니다.",
  "Reorder uplift (post-cancel contexts)": "재주문 상승 (취소 후 맥락)",
  "We found that silent cancellations were significantly reducing re-order rates. Customers received no notification, and after discovering the cancellation themselves, they left immediately.":
    "무음 취소가 재주문율을 크게 낮춘다는 점을 발견했습니다. 고객은 알림을 받지 못했고, 직접 취소 사실을 발견한 뒤 즉시 이탈했습니다.",
  "Protected Project Details": "보호된 프로젝트 상세",
  "Due to the sensitive nature of this product's internal strategy, access to the full documentation is restricted. Please contact me directly for a temporary access code.":
    "이 제품의 내부 전략상 민감한 내용이 포함되어 있어 전체 문서 접근이 제한되어 있습니다. 임시 접근 코드는 저에게 직접 문의해 주세요.",
  "Enter access code": "접근 코드 입력",
  "Request Access via LinkedIn": "링크드인으로 접근 요청",
  "If this project summary was interesting to you,": "이 프로젝트 요약이 흥미로웠다면,",
  "let's talk.": "이야기해요.",
  "Design and vibe coded by Jihye ha, 2025": "Designed and vibe coded by 하지혜, 2025",

  "IoT for": "개인화된 스마트 리빙을 위한",
  "Personalized Smart Living": "IoT",
  "A unified IoT platform that connects fragmented smart devices and proactively suggests \"Smart Mode\" based on user behavior patterns.":
    "분산된 스마트 기기를 연결하고 사용자 행동 패턴에 기반해 '스마트 모드'를 능동적으로 제안하는 통합 IoT 플랫폼입니다.",
  "UX/UI designer intern": "UX/UI 디자인 인턴",
  "UX/UI designer": "UX/UI 디자이너",
  "Front Engineers(AOS/iOS)": "프론트엔드 엔지니어(AOS/iOS)",
  "BE engineers": "백엔드 엔지니어",
  "Founded in 2016 by former Google Korea R&D leaders, Skelter Labs builds enterprise Conversational AI. LLM-based conversational systems deployed across industries are at its core. At the time of this project, the company was expanding from pure AI infrastructure to consumer-facing products, and brilli was one of the first such attempts.":
    "스켈터랩스는 전 구글코리아 R&D 리더들이 2016년에 설립한 엔터프라이즈 대화형 AI 기업입니다. 다양한 산업에 적용되는 LLM 기반 대화 시스템이 핵심이며, 이 프로젝트 당시 회사는 순수 AI 인프라에서 소비자 대상 제품으로 확장하고 있었고 brilli는 그 첫 시도 중 하나였습니다.",
  Research: "리서치",
  "Market Gap": "시장 간극",
  "The smart home market is growing at": "스마트홈 시장은",
  "20% annually": "연 20%",
  ", but most users still manage 5+ manufacturer apps separately. The market grew, but the experience didn't keep up.":
    "씩 성장하고 있지만, 대부분의 사용자는 여전히 5개 이상의 제조사 앱을 따로 관리합니다. 시장은 성장했지만 경험은 따라가지 못했습니다.",
  Objective: "목표",
  "Building a platform where leaving feels like a downgrade.": "떠나는 것이 다운그레이드처럼 느껴지는 플랫폼 만들기.",
  "One ecosystem, all brands, zero fragmentation": "하나의 생태계, 모든 브랜드, 단절 없는 경험",
  "— that was the strategic challenge.": "이것이 전략적 과제였습니다.",
  "App Overload": "앱 과부하",
  "5 devices, 5 apps, 5 login screens. Smart home management had become a full-time job. The exact opposite of what users wanted.":
    "기기 5개, 앱 5개, 로그인 화면 5개. 스마트홈 관리는 거의 풀타임 일이 되었고, 사용자가 원한 것과 정반대였습니다.",
  "Setup Abandonment": "설정 이탈",
  "Automation features were designed for power users. Most people gave up before reaching the valuable parts. The complexity wasn't a bug. It was the core problem to solve.":
    "자동화 기능은 파워 유저 중심으로 설계되어 있었습니다. 대부분의 사용자는 가치 있는 부분에 도달하기 전에 포기했습니다. 복잡성은 버그가 아니라 해결해야 할 핵심 문제였습니다.",
  "Reactive, Not Proactive": "반응형, 선제적이지 않음",
  "Every device waited for manual commands. True intelligence acts before the user asks. The design challenge was prediction, not control.":
    "모든 기기는 수동 명령을 기다렸습니다. 진짜 지능은 사용자가 요청하기 전에 움직입니다. 디자인 과제는 제어가 아니라 예측이었습니다.",
  "If all devices and brands exist within": "모든 기기와 브랜드가",
  "a single Platform that learns real lifestyle patterns": "실제 생활 패턴을 학습하는 하나의 플랫폼 안에 있다면",
  ", the app stops feeling like a tool and starts feeling like infrastructure. That's when it becomes indispensable.":
    "앱은 도구가 아니라 인프라처럼 느껴지기 시작합니다. 그때 비로소 없어서는 안 될 존재가 됩니다.",
  "Persona & User journey map": "페르소나 & 사용자 여정 지도",
  "\"I built a smart home, but now I feel like I've become the assistant to my devices.\"":
    "\"스마트홈을 만들었는데, 이제는 제가 기기들의 비서가 된 것 같아요.\"",
  "Brin Lee (34, single household, IT Early Adopter)": "이브린 (34세, 1인 가구, IT 얼리어답터)",
  "Spends a lot of time at home and values environmental control. Prefers the best product for each function, resulting in 5+ manufacturer apps on their phone.":
    "집에서 보내는 시간이 많고 환경 제어를 중요하게 생각합니다. 기능별로 가장 좋은 제품을 선호하다 보니 휴대폰에는 제조사 앱이 5개 이상 설치되어 있습니다.",
  "Core Needs": "핵심 니즈",
  "Cognitive Offloading: A unified Dashboard that eliminates the need to think about which app to open.":
    "인지 부담 감소: 어떤 앱을 열지 고민하지 않아도 되는 통합 대시보드.",
  "Universal Command: A unified voice command system that works across all device brands.":
    "범용 명령: 모든 기기 브랜드에서 작동하는 통합 음성 명령 시스템.",
  ASIS: "ASIS",
  "Fragmented Ecosystem": "분산된 생태계",
  "Inconsistent smart speaker support. Often locked to a specific carrier.": "일관되지 않은 스마트 스피커 지원. 특정 통신사에 묶이는 경우가 많음.",
  "App Fatigue": "앱 피로도",
  "Users must download and manage a separate app for each device manufacturer.": "사용자는 기기 제조사마다 별도의 앱을 다운로드하고 관리해야 합니다.",
  "High-Friction Setup": "마찰이 큰 설정",
  "Setting up automation triggers requires complex and cumbersome manual configuration.": "자동화 트리거 설정에는 복잡하고 번거로운 수동 구성이 필요합니다.",
  TOBE: "TOBE",
  "Unified Integration": "통합 연동",
  "Seamlessly connect and register all smart devices through an Open IoT Platform.": "오픈 IoT 플랫폼을 통해 모든 스마트 기기를 매끄럽게 연결하고 등록합니다.",
  "Proactive Automations": "선제적 자동화",
  "Analyze 2 weeks of user behavior patterns to automatically suggest personalized routines.": "2주간의 사용자 행동 패턴을 분석해 개인화 루틴을 자동으로 제안합니다.",
  "Unified Dashboard": "통합 대시보드",
  "Tailored Routines": "맞춤 루틴",
  "Design Strategy": "디자인 전략",
  "Focus on what": "정말 중요한 것에",
  "truly matters": "집중하세요",
  will: "will",
  "handle the rest.": "나머지는 처리할게요.",
  Smart: "스마트",
  Intelligent: "지능적",
  "AI-driven automation that learns patterns and acts before you ask.": "패턴을 학습하고 요청 전에 움직이는 AI 기반 자동화.",
  Friendly: "친근함",
  Accessible: "접근 가능",
  "Simple enough for anyone, not just early adopters.": "얼리어답터뿐 아니라 누구나 사용할 만큼 단순하게.",
  Easy: "쉬움",
  Effortless: "간편함",
  "Setup in minutes, not hours. Control without a manual.": "몇 시간이 아니라 몇 분 만에 설정. 설명서 없이 제어.",
  Unified: "통합",
  Cohesive: "응집력",
  "All brands, all devices, one Platform.": "모든 브랜드, 모든 기기, 하나의 플랫폼.",
  "Brilli Logo": "Brilli 로고",
  "Translated key brand keywords into specific graphic motifs and combined them to build an intuitive Visual Identity.":
    "핵심 브랜드 키워드를 구체적인 그래픽 모티프로 번역하고 결합해 직관적인 비주얼 아이덴티티를 만들었습니다.",
  Iconography: "아이콘그래피",
  "Brilli Color": "Brilli 컬러",
  "Combined contrasting tones of brightness and calm to visually balance the opposing core values of 'Joyful' and 'Smart'.":
    "'Joyful'과 'Smart'라는 상반된 핵심 가치를 시각적으로 균형 있게 담기 위해 밝음과 차분함의 대비 톤을 조합했습니다.",
  Illustration: "일러스트레이션",
  "Mood board": "무드보드",
  "Evaluated drafts using a 4-quadrant matrix to select the": "4분면 매트릭스로 시안을 평가해",
  "'Simple and Friendly' style that perfectly aligns with the brand's core values.":
    "브랜드 핵심 가치에 가장 잘 맞는 'Simple and Friendly' 스타일을 선택했습니다.",
  "Context-Driven": "맥락 기반",
  "Information Hierarchy": "정보 위계",
  "Research showed users cared more about \"what's the status of my home right now\" than \"which device should I control.\" We redesigned the information architecture around this insight. Automation status is placed at the top, manual control at the bottom, and the interface follows the user's Mental Model, not a device catalog.":
    "리서치 결과 사용자는 '어떤 기기를 제어할까'보다 '지금 우리 집 상태가 어떤가'를 더 중요하게 생각했습니다. 이 인사이트를 중심으로 정보 구조를 재설계했습니다. 자동화 상태는 상단에, 수동 제어는 하단에 배치해 기기 카탈로그가 아니라 사용자의 멘탈 모델을 따르게 했습니다.",
  "Clear Messaging": "명확한 메시징",
  "Clearly communicates conditions, devices, and current status.": "조건, 기기, 현재 상태를 명확하게 전달합니다.",
  "Controlling Devices": "기기 제어",
  "Surfaces the most relevant device states first based on real-time context.": "실시간 맥락에 따라 가장 관련 있는 기기 상태를 먼저 보여줍니다.",
  "View all registered smart devices in a single unified list": "등록된 모든 스마트 기기를 하나의 통합 목록에서 확인",
  "Tap a device for instant control — no app switching required": "기기를 탭해 즉시 제어, 앱 전환 불필요",
  "Smart Suggestions": "스마트 제안",
  "& UI Optimization": "& UI 최적화",
  "The system learns from repeated behaviors and automatically surfaces suggested routines. Usage data showed that after initial setup, users rarely manually added new automations. So we decided to de-prioritize the 'Add' button and fill that key Thumb Zone with AI-generated suggestions.":
    "시스템은 반복 행동을 학습해 추천 루틴을 자동으로 드러냅니다. 사용 데이터상 초기 설정 이후 사용자가 수동으로 새 자동화를 추가하는 경우는 드물었습니다. 그래서 '추가' 버튼의 우선순위를 낮추고 핵심 엄지 영역을 AI 추천으로 채우기로 했습니다.",
  "Design Before the Screen": "화면 이전의 디자인",
  "The most important decisions were made before drawing any UI. Which device data to expose, how to categorize behavior patterns, what criteria to trigger suggestions. Defining these early with engineers significantly reduced compromises at execution.":
    "가장 중요한 결정은 UI를 그리기 전에 이루어졌습니다. 어떤 기기 데이터를 노출할지, 행동 패턴을 어떻게 분류할지, 어떤 기준으로 추천을 트리거할지. 이를 엔지니어와 초기에 정의해 실행 단계의 타협을 크게 줄였습니다.",
  "Owning the Full System": "전체 시스템을 소유하기",
  "Building a product from scratch — navigation architecture, state transitions, empty states, edge cases — creates continuous refinement. You can't design the parts well without understanding the whole.":
    "내비게이션 구조, 상태 전환, 빈 상태, 엣지 케이스까지 처음부터 제품을 만들면 지속적인 정제가 일어납니다. 전체를 이해하지 못하면 부분도 잘 설계할 수 없습니다.",
  "Ownership Beyond the Handoff": "핸드오프 이후의 오너십",
  "Launching a product that changes how people live at home is a different kind of feedback than a design review. I realized here that Ownership means caring about outcomes even after the handoff.":
    "사람들이 집에서 살아가는 방식을 바꾸는 제품을 출시하는 것은 디자인 리뷰와 다른 종류의 피드백을 줍니다. 여기서 오너십은 핸드오프 이후의 결과까지 신경 쓰는 것임을 깨달았습니다.",
  "I'd love to hear from you.": "이야기 나누고 싶습니다.",

  "Bakery Fair 2026": "베이커리페어 2026",
  "48-Hour": "48시간",
  "Design-to-Code": "디자인-투-코드",
  "From CEO brief to 8 live signage screens in 4 hours —": "대표 브리프에서 8개의 라이브 사이니지 화면까지 4시간.",
  "a Code-First agile sprint executed with AI prompting alone.": "AI 프롬프팅만으로 실행한 코드 퍼스트 애자일 스프린트.",
  "No Figma. No handoff.": "피그마도, 핸드오프도 없었습니다.",
  "2026.04 · 4-hour sprint": "2026.04 · 4시간 스프린트",
  Output: "결과물",
  "Live signage screens": "라이브 사이니지 화면",
  Tools: "도구",
  "AI Prompting · Browser · Code-First": "AI 프롬프팅 · 브라우저 · 코드 퍼스트",
  "Two days before Korea's largest bakery trade fair, a request came directly from the CEO: build digital signage for the exhibition booth. 48 hours on the clock. No engineering support. No time to open Figma. One designer had to own the full pipeline — concept, design, and live deployment — alone.":
    "국내 최대 베이커리 박람회를 이틀 앞두고 대표가 직접 전시 부스용 디지털 사이니지를 만들어 달라고 요청했습니다. 남은 시간은 48시간. 엔지니어링 지원도, 피그마를 열 시간도 없었습니다. 한 명의 디자이너가 콘셉트, 디자인, 라이브 배포까지 전체 파이프라인을 혼자 책임져야 했습니다.",
  "The Challenge": "도전 과제",
  "A": "A",
  "time constraint": "시간 제약",
  "that made following the traditional design process impossible": "때문에 전통적인 디자인 프로세스를 따를 수 없었습니다",
  "Stop producing the design artifact (Figma) first.": "먼저 디자인 산출물(피그마)을 만드는 일을 멈췄습니다.",
  "Use the live output itself as the design tool.": "라이브 결과물 자체를 디자인 도구로 사용했습니다.",
  "The CEO came to me with a direct request: build digital signage for the Bakery Fair exhibition booth.":
    "대표는 베이커리페어 전시 부스용 디지털 사이니지를 만들어 달라는 직접적인 요청을 했습니다.",
  "Two days before the fair opened, with no engineering support, a single designer had to complete 8 live screens from scratch.":
    "박람회 개막 이틀 전, 엔지니어링 지원 없이 한 명의 디자이너가 8개의 라이브 화면을 처음부터 완성해야 했습니다.",
  "Instead of a Figma file, I used browser-based code as the design tool and redefined the entire process — removing every intermediate artifact between design intent and live output.":
    "피그마 파일 대신 브라우저 기반 코드를 디자인 도구로 사용하고, 디자인 의도와 라이브 결과물 사이의 모든 중간 산출물을 제거하며 전체 프로세스를 재정의했습니다.",
  "Collapsed the gap between design and implementation.": "디자인과 구현 사이의 간극을 접었습니다.",
  "Browser = Figma. Refresh = design review. Deploy =": "브라우저 = 피그마. 새로고침 = 디자인 리뷰. 배포 =",
  "design complete.": "디자인 완료.",
  "Legibility First": "가독성 우선",
  "Typography Control": "타이포그래피 제어",
  "Corrected newline errors, overflow issues, and hierarchy collapse in the live order feed by redirecting AI with precise design criteria. Redefined the type scale for signage-appropriate reading distances.":
    "정확한 디자인 기준으로 AI를 다시 지시해 라이브 주문 피드의 줄바꿈 오류, 오버플로, 위계 붕괴를 바로잡았습니다. 사이니지에 맞는 읽기 거리를 기준으로 타입 스케일을 재정의했습니다.",
  "Real-time Design Judgment": "실시간 디자인 판단",
  "CEO Alignment": "대표와의 정렬",
  "Evaluated the \"full-screen\" proposal against reading distance, information density, and signage context — and applied the decision immediately on-site without a single revision cycle.":
    "\"전체 화면\" 제안을 읽기 거리, 정보 밀도, 사이니지 맥락으로 평가하고 수정 사이클 없이 현장에서 즉시 반영했습니다.",
  "Offline → Online": "오프라인 → 온라인",
  "On-site Response": "현장 대응",
  "Noticed that dark mode was harder to read than expected at the booth and adjusted it on the spot. The code-first method made real-time changes possible with zero handoff delay.":
    "부스 현장에서 다크 모드가 예상보다 읽기 어렵다는 점을 발견하고 즉시 조정했습니다. 코드 퍼스트 방식 덕분에 핸드오프 지연 없이 실시간 변경이 가능했습니다.",
  "Signage Screens": "사이니지 화면",
  "All screens delivered": "모든 화면 전달",
  "Total Design Time": "총 디자인 시간",
  "CEO brief to live deploy": "대표 브리프부터 라이브 배포까지",
  "Constraint Window": "제약 시간",
  "Started 2 days before the fair": "박람회 이틀 전 시작",
  "Code-to-Live": "코드에서 라이브까지",
  "No Figma, code-first workflow": "피그마 없이 코드 퍼스트 워크플로",
  "Key Takeaways": "핵심 배움",
  "Constraints drive better methods": "제약은 더 나은 방법을 만든다",
  "The constraint of delivering in 4 hours without Figma created the Code-First method. Remove unnecessary intermediate artifacts, and the distance between design intent and live output collapses.":
    "피그마 없이 4시간 안에 전달해야 한다는 제약이 코드 퍼스트 방식을 만들었습니다. 불필요한 중간 산출물을 없애면 디자인 의도와 라이브 결과물 사이의 거리는 줄어듭니다.",
  "Designer value lives beyond the tool": "디자이너의 가치는 도구 너머에 있다",
  "AI generated the code, but controlling it with design principles was the designer's role. Typography decisions, visual hierarchy judgment, real-time CEO alignment — that was the real design work.":
    "AI가 코드를 생성했지만, 디자인 원칙으로 그것을 제어하는 것이 디자이너의 역할이었습니다. 타이포그래피 결정, 시각 위계 판단, 실시간 대표 정렬이 진짜 디자인 작업이었습니다.",
};

const naturalKoreanTranslations: Record<string, string> = {
  "Senior Product Designer specialized in building scalable systems and high-impact user experiences. Focused on bridging the gap between user needs and business goals.":
    "사용자가 바로 이해하고 편하게 쓸 수 있는 제품 경험을 설계합니다. 사용자에게 필요한 것과 비즈니스가 원하는 결과가 자연스럽게 만나는 지점을 찾습니다.",
  Impact: "성과",
  "Led end-to-end redesign of the delivery tracking system to reduce support inquiries and increase transparency across the post-purchase journey.":
    "배송 현황을 더 쉽게 이해할 수 있도록 주문 후 화면을 전반적으로 다시 설계했습니다. 고객 문의를 줄이고, 주문 이후의 불안감을 낮추는 데 집중했습니다.",
  "Reduced CS inquiries related to delivery status": "배송 상태 관련 고객 문의 감소",
  "From CEO brief to 8 live signage screens in 4 hours. No Figma, no handoff — AI prompting directed by design judgment alone.":
    "From CEO brief to 8 live signage screens in 4 hours — a Code-First agile sprint executed with AI prompting alone. No Figma. No handoff.",
  "Designed an AI-driven smart home app that unifies fragmented device ecosystems and delivers context-aware automation through conversational AI.":
    "A unified IoT platform that connects fragmented smart devices and proactively suggests \"Smart Mode\" based on user behavior patterns.",
  "Unified multi-brand device control into a single ecosystem": "여러 브랜드 기기를 한곳에서 제어할 수 있도록 통합",
  "Let's build something impactful together.": "함께 의미 있는 제품을 만들어봐요.",

  "6 years designing experiences for millions of users at Coupang & Coupang Eats.":
    "쿠팡과 쿠팡이츠에서 6년 동안 수많은 사용자가 매일 쓰는 제품을 설계했습니다.",
  "Solving real business problems through data-driven UX strategy.":
    "데이터를 바탕으로 사용자 문제와 비즈니스 문제를 함께 해결합니다.",
  "Users Impacted": "사용자 규모",
  "Korea's largest commerce ecosystem": "국내 최대 규모의 커머스 서비스",
  "Measurable Impact": "숫자로 확인한 성과",
  "Design Proven by Numbers": "결과로 설명하는 디자인",
  "Redesigned the information hierarchy of the real-time delivery status page, surfacing critical decision-making data first to drive higher user engagement.":
    "실시간 배송 상태 화면에서 사용자가 먼저 알아야 할 정보를 위로 올리고, 덜 중요한 정보는 뒤로 정리했습니다. 덕분에 화면을 더 쉽게 이해하고 사용할 수 있게 했습니다.",
  "Restructured the checkout decision flow by eliminating cognitive overload at the highest drop-off point, directly improving purchase conversion.":
    "구매 과정에서 사용자가 가장 많이 이탈하던 구간을 다시 정리했습니다. 선택지를 줄이고 흐름을 단순하게 만들어 구매 전환을 높였습니다.",
  "Transformed weekly critiques from mandatory check-ins into structured decision-making sessions — designers began requesting them voluntarily.":
    "주간 크리틱을 단순 공유 시간이 아니라 함께 판단하고 결정하는 자리로 바꿨습니다. 이후 디자이너들이 먼저 크리틱을 요청하기 시작했습니다.",
  "Post-order UX · Delivery Experience · Behavioral Systems": "주문 후 UX · 배송 경험 · 사용자 행동 기반 설계",
  "Sole designer owning the real-time delivery experience system for millions of users":
    "수많은 사용자가 보는 실시간 배송 경험을 담당했습니다",
  "Evolved UX architecture across Waiting, Cancelled, and Idle delivery states":
    "대기, 취소, 유휴 상태별로 필요한 정보를 다르게 보여주도록 UX 구조를 정리했습니다",
  "Double Delivery strategy contributed 4.6% new non-food category revenue":
    "더블딜리버리 실험으로 비식품 카테고리의 신규 매출에 기여했습니다",
  "Rebuilt Design System 2.0 — semantic tokens + variant-based components":
    "디자인 시스템 2.0을 다시 정리하고, 토큰과 컴포넌트 구조를 개선했습니다",
  "Shortened design-to-dev handoff cycles, boosting overall team productivity":
    "디자인과 개발 사이의 전달 과정을 줄여 팀이 더 빠르게 움직일 수 있게 했습니다",
  "Led UX/UI design for AI-powered smart home app 'Brilli'":
    "AI 스마트홈 앱 'Brilli'의 UX/UI 디자인을 담당했습니다",
  "Designed multi-brand device integration ecosystem for unified smart home control":
    "여러 브랜드의 스마트 기기를 한 앱에서 연결하고 제어하는 구조를 설계했습니다",
  "Established conversational AI interface patterns across the product":
    "제품 안에서 대화형 AI를 어떻게 보여주고 사용할지 인터페이스 패턴을 정리했습니다",
  "What I Bring to the Table": "제가 잘하는 일",
  "CS data, drop-off rates, session heatmaps — I look for behavioral gaps where users stop, hesitate, or find workarounds.":
    "CS 데이터, 이탈률, 히트맵을 보며 사용자가 어디에서 멈추고 망설이는지 찾습니다.",
  "Systems Reframe": "문제 다시 보기",
  "Reframe as System": "전체 흐름으로 보기",
  "Who is most affected? What upstream decision created this downstream symptom? I zoom out before zooming in.":
    "먼저 전체 흐름을 봅니다. 누가 가장 불편한지, 앞단의 어떤 결정이 지금의 문제를 만들었는지 확인한 뒤 화면을 설계합니다.",
  "Min. Intervention": "작은 변화",
  "Minimum Intervention": "작지만 효과적인 개선",
  "Not the most elegant solution — the smallest change with the most measurable impact. Constraints make design sharper.":
    "항상 큰 개편이 답은 아니라고 생각합니다. 가장 적은 변화로 분명한 효과를 낼 수 있는 방법을 찾습니다.",
  "Success metrics are defined before design begins. The hypothesis is part of the brief, not an afterthought.":
    "디자인을 시작하기 전에 어떤 결과를 볼지 먼저 정합니다. 가설과 지표를 함께 세워야 디자인 판단도 선명해집니다.",
  "If you'd like to talk about product strategy, UX systems, or building great design teams — I'd love to hear from you.":
    "제품 전략, UX 구조, 좋은 디자인 팀에 대해 이야기하고 싶다면 편하게 연락 주세요.",

  "Each initiative was independently tested and launched at different points in time. This case study reframes them as a single system to explain my approach to designing the post-order experience.":
    "각 프로젝트는 서로 다른 시점에 테스트되고 출시되었습니다. 이 케이스 스터디에서는 그 작업들을 하나의 흐름으로 묶어, 주문 후 경험을 어떻게 바라보고 설계했는지 설명합니다.",
  "Coupang Eats launched in Korea in 2019 and became the fastest-growing food delivery platform in the country. In 2024, it introduced unlimited free delivery, raising the bar across the industry. The post-order experience is central to this promise. Every interaction customers have after placing an order builds or erodes trust.":
    "쿠팡이츠는 2019년 한국에서 시작해 빠르게 성장한 음식 배달 서비스입니다. 2024년에는 무제한 무료배달을 시작하며 배송 경험의 기준을 높였습니다. 주문 후 화면은 이 약속을 사용자가 직접 확인하는 곳입니다. 이 화면이 명확해야 고객이 서비스를 믿고 기다릴 수 있습니다.",
  "The funnel": "주문 후 과정은",
  "every customer must go through": "모든 고객이 반드시 거치는 흐름입니다",
  "after placing an order": "주문을 마친 뒤에",
  "Customers face a range of issues after placing an order. From unclear delivery status to unexpected cancellations.":
    "주문을 마친 뒤에도 고객은 여러 상황을 겪습니다. 배송 상태가 모호하거나, 갑자기 주문이 취소되기도 합니다.",
  "Reducing CS inquiries and growing post-payment revenue are two sides of the same problem.":
    "고객 문의를 줄이는 일과 결제 이후의 매출을 늘리는 일은 결국 같은 문제에서 출발합니다. 주문 후 화면이 더 잘 작동해야 합니다.",
  "Post-order anxiety increases when customers don't clearly understand":
    "고객은 다음 세 가지를 알 수 없을 때 불안해집니다:",
  "what's happening now, what comes next, and what options they have.":
    "지금 어떤 상태인지, 다음에 무엇이 일어나는지, 내가 할 수 있는 일이 무엇인지.",
  "Different design strategies are needed depending on the post-order user state.":
    "주문 후 화면은 사용자의 상태에 따라 다르게 설계되어야 합니다.",
  "Each module addresses a": "각 모듈은",
  "They do not form a linear journey.": "를 다룹니다. 하나의 순서대로 이어지는 여정은 아닙니다.",
  "Waiting Clarity System": "대기 상태를 명확하게 보여주는 시스템",
  "Building ETA Trust and Reducing Misunderstanding": "도착 예정 시간을 더 믿을 수 있게 만들기",
  "Within 3 days, we received over 30 customer reports about confusion regarding rider routes and unreliable ETAs.":
    "도입 후 3일 동안 라이더 경로와 도착 예정 시간이 헷갈린다는 고객 의견이 30건 넘게 들어왔습니다.",
  "We redesigned the real-time order page to improve status clarity and reduce anxiety-based CS contacts.":
    "고객이 현재 상태를 바로 이해할 수 있도록 실시간 주문 화면을 다시 설계했습니다.",
  "Customers misread delivery progress": "고객은 배송이 어디까지 진행됐는지 잘못 이해했습니다.",
  "because the system doesn't explain non-linear delivery behavior.":
    "여러 주문을 함께 배달하는 상황을 화면이 충분히 설명하지 못했기 때문입니다.",
  "We stopped viewing ETA discrepancies as a prediction problem,":
    "도착 예정 시간이 달라지는 문제를 단순한 예측 실패로 보지 않았습니다.",
  "progress interpretation problem": "진행 상황을 이해시키는 문제",
  "ETA as an Expectation Management Tool": "기다림을 조절하는 도착 예정 시간",
  "Purpose: Signal that delivery progress can naturally vary":
    "목적: 배송 상황에 따라 시간이 달라질 수 있음을 미리 알려주기",
  "Normalizing Multi-stop Delivery Behavior": "여러 곳을 들르는 배송 상황 설명하기",
  "Purpose: Prevent misunderstanding of normal delivery patterns":
    "목적: 정상적인 배송 흐름을 고객이 오해하지 않도록 돕기",
  "Replacing a single ETA with a dynamic time range helps customers naturally understand delivery variability, reducing anxiety when arrival time changes.":
    "하나의 도착 시간 대신 시간 범위를 보여주면, 고객은 배송 시간이 조금 달라질 수 있다는 점을 더 쉽게 이해합니다.",
  "ETA over Map": "지도보다 먼저 보이는 도착 시간",
  "By placing the ETA above the map, customers can see": "도착 시간을 지도보다 위에 배치해 고객이",
  "when their order will arrive": "주문이 언제 도착하는지",
  "before anything else.": "가장 먼저 알 수 있게 했습니다.",
  "Visual delivery status indicators communicate progress at a glance, making it clear where the order is without guesswork.":
    "배송 상태를 시각적으로 보여줘 고객이 추측하지 않아도 현재 위치와 진행 상황을 알 수 있게 했습니다.",
  "Protected metrics": "공개할 수 없는 지표",
  "Silent cancellations lead to immediate competitor churn": "조용히 취소된 주문은 바로 이탈로 이어졌습니다",
  "We improved the app to help customers quickly find a new restaurant when their order is cancelled.":
    "주문이 취소됐을 때 고객이 바로 다른 식당을 찾을 수 있도록 화면을 개선했습니다.",
  "We found that silent cancellations were significantly reducing re-order rates. Customers received no notification, and after discovering the cancellation themselves, they left immediately.":
    "알림 없이 주문이 취소되면 고객은 뒤늦게 상황을 알게 됩니다. 이때 다시 주문하지 않고 바로 나가는 경우가 많았습니다.",
  "Due to the sensitive nature of this product's internal strategy, access to the full documentation is restricted. Please contact me directly for a temporary access code.":
    "이 프로젝트에는 내부 전략과 지표가 포함되어 있어 전체 문서는 공개하지 않습니다. 임시 접근 코드가 필요하면 직접 연락 주세요.",

  "A unified IoT platform that connects fragmented smart devices and proactively suggests \"Smart Mode\" based on user behavior patterns.":
    "여러 스마트 기기를 한곳에 연결하고, 사용자의 생활 패턴에 맞춰 '스마트 모드'를 제안하는 IoT 플랫폼입니다.",
  "Founded in 2016 by former Google Korea R&D leaders, Skelter Labs builds enterprise Conversational AI. LLM-based conversational systems deployed across industries are at its core. At the time of this project, the company was expanding from pure AI infrastructure to consumer-facing products, and brilli was one of the first such attempts.":
    "스켈터랩스는 전 구글코리아 R&D 리더들이 2016년에 설립한 대화형 AI 기업입니다. 이 프로젝트 당시 회사는 B2B AI 기술을 넘어 일반 사용자가 직접 쓰는 제품으로 영역을 넓히고 있었고, brilli는 그 첫 시도 중 하나였습니다.",
  "Market Gap": "시장의 빈틈",
  ", but most users still manage 5+ manufacturer apps separately. The market grew, but the experience didn't keep up.":
    "씩 성장하고 있었지만, 사용자는 여전히 제조사별 앱을 따로 써야 했습니다. 시장은 커졌지만 사용 경험은 그대로였습니다.",
  "Building a platform where leaving feels like a downgrade.": "다른 앱으로 돌아가면 오히려 불편하게 느껴지는 플랫폼 만들기.",
  "One ecosystem, all brands, zero fragmentation": "여러 브랜드를 하나로 묶고, 끊김 없이 쓰는 경험",
  "— that was the strategic challenge.": "이것이 이 프로젝트의 과제였습니다.",
  "5 devices, 5 apps, 5 login screens. Smart home management had become a full-time job. The exact opposite of what users wanted.":
    "기기 5개를 쓰려면 앱 5개와 로그인 5번이 필요했습니다. 편하려고 만든 스마트홈이 오히려 관리해야 할 일이 되어버렸습니다.",
  "Automation features were designed for power users. Most people gave up before reaching the valuable parts. The complexity wasn't a bug. It was the core problem to solve.":
    "자동화 기능은 숙련된 사용자에게 맞춰져 있었습니다. 대부분의 사용자는 좋은 기능을 만나기도 전에 설정 과정에서 포기했습니다. 문제는 기능 부족이 아니라 복잡함이었습니다.",
  "Every device waited for manual commands. True intelligence acts before the user asks. The design challenge was prediction, not control.":
    "기기는 사용자가 직접 명령할 때만 움직였습니다. 더 나은 스마트홈은 사용자가 말하기 전에 필요한 일을 제안해야 했습니다.",
  "a single Platform that learns real lifestyle patterns":
    "실제 생활 패턴을 배우는 하나의 플랫폼 안에 모이면",
  ", the app stops feeling like a tool and starts feeling like infrastructure. That's when it becomes indispensable.":
    "앱은 단순한 조작 도구가 아니라 집을 관리하는 기본 환경처럼 느껴질 수 있습니다.",
  "Core Needs": "주요 니즈",
  "Cognitive Offloading: A unified Dashboard that eliminates the need to think about which app to open.":
    "생각할 일 줄이기: 어떤 앱을 열어야 할지 고민하지 않아도 되는 통합 대시보드.",
  "Universal Command: A unified voice command system that works across all device brands.":
    "한 번에 명령하기: 브랜드가 달라도 같은 방식으로 말하고 제어할 수 있는 음성 명령.",
  "Fragmented Ecosystem": "흩어진 기기 환경",
  "High-Friction Setup": "번거로운 설정",
  "Setting up automation triggers requires complex and cumbersome manual configuration.":
    "자동화를 설정하려면 복잡한 조건을 직접 하나씩 입력해야 합니다.",
  "Proactive Automations": "먼저 제안하는 자동화",
  "Analyze 2 weeks of user behavior patterns to automatically suggest personalized routines.":
    "2주간의 사용 패턴을 보고 사용자에게 맞는 루틴을 제안합니다.",
  "Focus on what": "중요한 일에",
  "truly matters": "집중하세요",
  "handle the rest.": "나머지는 제가 도울게요.",
  "AI-driven automation that learns patterns and acts before you ask.":
    "생활 패턴을 배우고, 사용자가 말하기 전에 필요한 일을 제안합니다.",
  "Simple enough for anyone, not just early adopters.": "얼리어답터가 아니어도 쉽게 쓸 수 있게.",
  "Setup in minutes, not hours. Control without a manual.": "오래 걸리는 설정 없이, 설명서 없이 바로 쓸 수 있게.",
  "All brands, all devices, one Platform.": "브랜드가 달라도 한곳에서 관리할 수 있게.",
  "Translated key brand keywords into specific graphic motifs and combined them to build an intuitive Visual Identity.":
    "브랜드 키워드를 그래픽 요소로 풀어내고, 한눈에 이해되는 비주얼 아이덴티티로 정리했습니다.",
  "Combined contrasting tones of brightness and calm to visually balance the opposing core values of 'Joyful' and 'Smart'.":
    "'Joyful'의 밝은 느낌과 'Smart'의 차분한 느낌이 함께 보이도록 컬러를 조합했습니다.",
  "Evaluated drafts using a 4-quadrant matrix to select the":
    "여러 시안을 4분면 기준으로 비교해",
  "'Simple and Friendly' style that perfectly aligns with the brand's core values.":
    "브랜드에 가장 잘 맞는 'Simple and Friendly' 방향을 선택했습니다.",
  "Research showed users cared more about \"what's the status of my home right now\" than \"which device should I control.\" We redesigned the information architecture around this insight. Automation status is placed at the top, manual control at the bottom, and the interface follows the user's Mental Model, not a device catalog.":
    "리서치 결과, 사용자는 '어떤 기기를 누를까'보다 '지금 우리 집 상태가 어떤가'를 더 궁금해했습니다. 그래서 자동화 상태를 위에 두고, 직접 제어하는 기능은 아래로 내렸습니다. 기기 목록이 아니라 사용자가 생각하는 흐름에 맞춘 구조입니다.",
  "Clearly communicates conditions, devices, and current status.":
    "어떤 조건에서 어떤 기기가 어떤 상태인지 쉽게 알 수 있게 보여줍니다.",
  "Surfaces the most relevant device states first based on real-time context.":
    "현재 상황에서 가장 중요한 기기 상태를 먼저 보여줍니다.",
  "The system learns from repeated behaviors and automatically surfaces suggested routines. Usage data showed that after initial setup, users rarely manually added new automations. So we decided to de-prioritize the 'Add' button and fill that key Thumb Zone with AI-generated suggestions.":
    "시스템은 반복되는 행동을 보고 루틴을 제안합니다. 실제 사용 데이터를 보니, 초기 설정 이후 사용자가 자동화를 직접 추가하는 경우는 많지 않았습니다. 그래서 '추가' 버튼보다 추천 루틴을 더 잘 보이는 위치에 두었습니다.",
  "The most important decisions were made before drawing any UI. Which device data to expose, how to categorize behavior patterns, what criteria to trigger suggestions. Defining these early with engineers significantly reduced compromises at execution.":
    "가장 중요한 결정은 화면을 그리기 전에 했습니다. 어떤 기기 정보를 보여줄지, 행동 패턴을 어떻게 나눌지, 어떤 기준으로 추천을 띄울지 먼저 정했습니다. 이 기준을 엔지니어와 함께 맞춘 덕분에 구현 단계의 시행착오를 줄일 수 있었습니다.",
  "Owning the Full System": "전체 흐름 이해하기",
  "Building a product from scratch — navigation architecture, state transitions, empty states, edge cases — creates continuous refinement. You can't design the parts well without understanding the whole.":
    "처음부터 제품을 만들면 화면 구조, 상태 변화, 빈 화면, 예외 상황까지 모두 보게 됩니다. 전체 흐름을 이해해야 작은 화면도 제대로 설계할 수 있습니다.",
  "Ownership Beyond the Handoff": "출시 이후까지 보기",
  "Launching a product that changes how people live at home is a different kind of feedback than a design review. I realized here that Ownership means caring about outcomes even after the handoff.":
    "집에서 생활하는 방식을 바꾸는 제품은 디자인 리뷰와 전혀 다른 피드백을 줍니다. 이 프로젝트를 통해 핸드오프 이후의 결과까지 보는 태도가 중요하다는 것을 배웠습니다.",

  "Two days before Korea's largest bakery trade fair, a request came directly from the CEO: build digital signage for the exhibition booth. 48 hours on the clock. No engineering support. No time to open Figma. One designer had to own the full pipeline — concept, design, and live deployment — alone.":
    "국내 최대 베이커리 박람회를 이틀 앞두고, 대표가 전시 부스용 디지털 사이니지를 만들어 달라고 요청했습니다. 남은 시간은 48시간. 엔지니어 도움도, 피그마로 시안을 만들 시간도 없었습니다. 그래서 한 명의 디자이너가 콘셉트부터 화면 제작, 현장 배포까지 혼자 진행했습니다.",
  "Use the live output itself as the design tool.": "완성될 화면 자체를 보며 바로 설계했습니다.",
  "The CEO came to me with a direct request: build digital signage for the Bakery Fair exhibition booth.":
    "대표가 베이커리페어 전시 부스에 쓸 디지털 사이니지를 만들어 달라고 요청했습니다.",
  "Two days before the fair opened, with no engineering support, a single designer had to complete 8 live screens from scratch.":
    "박람회 개막 이틀 전이었고, 엔지니어의 도움 없이 화면 8개를 처음부터 만들어야 했습니다.",
  "Instead of a Figma file, I used browser-based code as the design tool and redefined the entire process — removing every intermediate artifact between design intent and live output.":
    "피그마 파일을 만들지 않고 브라우저에서 바로 화면을 만들었습니다. 디자인 의도와 실제 결과물 사이의 중간 과정을 줄이기 위해서였습니다.",
  "Collapsed the gap between design and implementation.": "디자인과 구현 사이의 거리를 줄였습니다.",
  "Corrected newline errors, overflow issues, and hierarchy collapse in the live order feed by redirecting AI with precise design criteria. Redefined the type scale for signage-appropriate reading distances.":
    "AI가 만든 화면에서 줄바꿈, 넘침, 정보 위계 문제가 생겼습니다. 읽는 거리와 사이니지 환경을 기준으로 타입 크기와 줄바꿈을 다시 잡았습니다.",
  "CEO Alignment": "대표와 빠르게 맞추기",
  "Evaluated the \"full-screen\" proposal against reading distance, information density, and signage context — and applied the decision immediately on-site without a single revision cycle.":
    "\"전체 화면으로 보여주자\"는 제안을 읽는 거리, 정보량, 부스 환경 기준으로 검토했습니다. 결정한 내용은 현장에서 바로 반영했습니다.",
  "Noticed that dark mode was harder to read than expected at the booth and adjusted it on the spot. The code-first method made real-time changes possible with zero handoff delay.":
    "현장에서 보니 다크 모드가 예상보다 읽기 어려웠습니다. 코드를 바로 수정할 수 있었기 때문에 색상과 대비를 즉시 조정했습니다.",
  "Constraints drive better methods": "제약이 더 나은 방법을 만든다",
  "The constraint of delivering in 4 hours without Figma created the Code-First method. Remove unnecessary intermediate artifacts, and the distance between design intent and live output collapses.":
    "피그마 없이 4시간 안에 결과물을 내야 했기 때문에 코드 퍼스트 방식이 필요했습니다. 중간 산출물을 줄이니 디자인 의도를 실제 화면에 더 빨리 반영할 수 있었습니다.",
  "Designer value lives beyond the tool": "디자이너의 가치는 도구 밖에서도 드러난다",
  "AI generated the code, but controlling it with design principles was the designer's role. Typography decisions, visual hierarchy judgment, real-time CEO alignment — that was the real design work.":
    "코드는 AI가 만들었지만, 무엇을 고치고 왜 고쳐야 하는지 판단하는 일은 디자이너의 몫이었습니다. 글자 크기, 정보 순서, 현장 상황에 맞춘 판단이 실제 디자인 작업이었습니다.",
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "ko" ? "ko" : "en";
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const isKorean = language === "ko";

  return (
    <div
      className="inline-flex items-center rounded-full border border-[#DFDFDF] bg-white p-0.5 text-[12px] font-black leading-none shadow-sm"
      aria-label="Language switcher"
      data-no-translate
    >
      <button
        type="button"
        onClick={() => setLanguage("ko")}
        aria-pressed={isKorean}
        className={`h-7 min-w-9 rounded-full px-2 transition-colors ${
          isKorean ? "bg-black text-white" : "text-[#999] hover:text-black"
        }`}
      >
        한
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={!isKorean}
        className={`h-7 min-w-9 rounded-full px-2 transition-colors ${
          !isKorean ? "bg-black text-white" : "text-[#999] hover:text-black"
        }`}
      >
        EN
      </button>
    </div>
  );
};

const shouldSkip = (node: Node) => {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script, style, noscript, svg, [data-no-translate]"));
};

const translateTextNode = (node: Text, language: Language) => {
  if (shouldSkip(node)) return;
  const current = node.textContent ?? "";
  const original = originalText.get(node) ?? normalize(current);
  if (!original) return;
  originalText.set(node, original);

  const leading = current.match(/^\s*/)?.[0] ?? "";
  const trailing = current.match(/\s*$/)?.[0] ?? "";

  if (language === "en") {
    node.textContent = `${leading}${original}${trailing}`;
    return;
  }

  const translated = naturalKoreanTranslations[original] ?? translations[original];
  if (!translated) return;
  node.textContent = `${leading}${translated}${trailing}`;
};

const translateAttributes = (language: Language) => {
  document.querySelectorAll<HTMLElement>("input[placeholder], textarea[placeholder]").forEach((element) => {
    if (element.closest("[data-no-translate]")) return;
    const current = element.getAttribute("placeholder") ?? "";
    const original = originalAttribute.get(element) ?? normalize(current);
    if (!original) return;
    originalAttribute.set(element, original);
    element.setAttribute("placeholder", language === "ko" ? translations[original] ?? original : original);
  });
};

export const LanguageDomTranslator = () => {
  const { language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const translate = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => (normalize(node.textContent ?? "") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
      });

      const nodes: Text[] = [];
      while (walker.nextNode()) {
        nodes.push(walker.currentNode as Text);
      }
      nodes.forEach((node) => translateTextNode(node, language));
      translateAttributes(language);
    };

    translate();
    const raf = window.requestAnimationFrame(translate);
    const timeout = window.setTimeout(translate, 150);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [language, location.pathname]);

  return null;
};
