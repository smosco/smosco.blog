// 'use client';

// import { ExternalLink, Github, FileText } from 'lucide-react';

// export default function PortfolioPage() {
//   return (
//     <div className="bg-white min-h-screen">
//       <div className="max-w-[680px] mx-auto px-6 py-12 text-zinc-800">
//         {/* Next Table Order */}
//         <section className="mb-8">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-indigo-700">
//                 Next Table Order
//               </h1>
//               <p className="text-zinc-500 mt-1">2024.12 – 2025.01</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <Github size={20} />
//                 <span>GitHub</span>
//                 <ExternalLink size={16} />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <span>Site</span>
//                 <ExternalLink size={16} />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <FileText size={20} />
//                 <span>Docs</span>
//                 <ExternalLink size={16} />
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* 대표 이미지 */}
//         <div className="rounded-md overflow-hidden mb-10">
//           <div className="w-full aspect-[16/9] bg-zinc-100 flex items-center justify-center text-zinc-400">
//             대표 이미지 캡처 예정
//           </div>
//         </div>

//         {/* 개요 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">개요 📦</h2>
//           <p className="whitespace-pre-line leading-relaxed">
//             Next Table Order는 소형 매장이나 푸드코트에서 도입 가능한 웹 기반
//             테이블 오더 시스템입니다. 매장 내에서 고객이 테이블에 비치된 QR을
//             스캔하여 메뉴를 주문하고, 사장님은 실시간으로 주문을 관리할 수
//             있습니다. 복잡한 설정 없이 바로 사용할 수 있는 것이 특징이며, 관리자
//             페이지를 통해 매출 통계, 메뉴 관리, 실시간 주문 관리를 제공합니다.
//             Next.js 기반 SSR, Supabase를 활용한 실시간 주문, SSE 최적화, 사용자
//             경험 중심의 UI를 구현하며, 비개발자 매장 운영자도 쉽게 사용할 수
//             있는 UX를 목표로 개발되었습니다.
//           </p>
//         </section>

//         {/* 역할 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">역할 🙋🏻‍♂️</h2>
//           <ul className="list-disc list-inside space-y-1">
//             <li>전체 프로젝트 단독 기획 및 개발 (1인 개발)</li>
//             <li>프론트엔드/백엔드 통합 구현 및 UI/UX 설계</li>
//             <li>실시간 주문 흐름을 위한 SSE 구조 설계 및 성능 개선</li>
//             <li>데이터 정합성과 비즈니스 흐름을 고려한 주문 상태 모델링</li>
//           </ul>
//         </section>

//         {/* 기술 스택 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">기술 스택 🛠</h2>
//           <ul className="list-disc list-inside space-y-1">
//             <li>
//               Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS,
//               shadcn/ui
//             </li>
//             <li>Backend: Supabase (PostgreSQL + Realtime), Edge Function</li>
//             <li>Infra & Tools: Vercel, GitHub Actions</li>
//           </ul>
//         </section>

//         {/* 주요 기능 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">주요 기능 💡</h2>
//           <ul className="list-disc list-inside space-y-2 mb-6">
//             <li>메뉴 상세 모달 – 옵션 선택 및 수량 조절, 장바구니 담기 가능</li>
//             <li>
//               장바구니 & 결제 – 옵션 포함 가격 합산, 수량 조절 및 결제 요청 처리
//             </li>
//             <li>대시보드 – 매출 요약, 인기 메뉴, 최근 주문 리스트 제공</li>
//             <li>메뉴 관리 – 메뉴 CRUD, 재고 및 상태 관리</li>
//             <li>
//               실시간 주문 관리 – SSE 기반 실시간 주문 흐름, 주문 상태 필터 및
//               처리
//             </li>
//           </ul>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center text-zinc-400 rounded">
//               기능 이미지 1
//             </div>
//             <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center text-zinc-400 rounded">
//               기능 이미지 2
//             </div>
//             <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center text-zinc-400 rounded">
//               기능 이미지 3
//             </div>
//             <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center text-zinc-400 rounded">
//               기능 이미지 4
//             </div>
//           </div>
//         </section>

//         {/* 마주한 이슈 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-4">마주한 이슈 🔧</h2>
//           {[
//             {
//               title: '실수로 닫힌 주문 흐름 복구 + 자동 초기화',
//               asis: [
//                 '고객이 떠난 후에도 이전 주문이 테이블에 남아있는 문제 발생.',
//                 '사장님이 직접 주문을 초기화하지 않으면 새 손님의 주문과 혼동됨.',
//                 '사장님이 실수로 주문을 닫으면 다시 열 수 없는 치명적인 UX 문제도 존재.',
//               ],
//               tobe: [
//                 '손님 단위의 주문 그룹 order_group 도입으로 상태 구분',
//                 '사장님이 실수로 닫은 경우 복구 가능한 reopen 기능 추가',
//                 '일정 시간 비활성 상태 시 자동으로 닫히는 로직 구현',
//               ],
//               result: [
//                 '수동 개입 없이도 주문 흐름 자동화',
//                 '실수 복구 기능으로 UX 안정성 확보',
//               ],
//             },
//             {
//               title: '옵션이 다른 메뉴 구분 및 가격 반영 문제',
//               asis: [
//                 '같은 메뉴라도 옵션이 다르면 다른 항목으로 처리되어야 하지만, 기존에는 menuId 기준으로만 비교되어 장바구니 항목이 덮어쓰기 됨.',
//                 '옵션 가격이 총액에 반영되지 않아 매출 데이터 왜곡 가능성 존재.',
//               ],
//               tobe: [
//                 'menuId + 옵션 ID 조합으로 고유 키 생성하여 장바구니 항목 분리',
//                 '옵션별 가격 합산 로직 추가, UI 상에서도 옵션 구분 및 가격 명시',
//               ],
//               result: [
//                 '사용자 혼란 해소',
//                 '실제 매출 반영 가능',
//                 '사장님과 고객 모두에게 신뢰성 있는 주문 경험 제공',
//               ],
//             },
//             {
//               title: '실시간 주문 SSE 트래픽 병목 이슈',
//               asis: [
//                 'SSE로 실시간 주문을 구현했으나, 주문 1건이 변경될 때 전체 주문 데이터를 클라이언트에 전송하는 구조',
//                 '→ 주문 수 증가에 따라 성능 급감 (10만건 이상 시 3.2초 이상 응답 지연)',
//               ],
//               tobe: [
//                 'order_events 테이블 도입하여 변경 로그만 감지',
//                 '클라이언트는 변경된 주문 ID만 받아와 해당 항목만 refetch',
//               ],
//               result: [
//                 '100만건 이상 주문에서도 6ms 수준의 실시간 응답',
//                 '트래픽 절감 및 확장성 확보',
//               ],
//             },
//             {
//               title: '주문 시점 가격 보존을 위한 구조 개선',
//               asis: [
//                 '주문 시점 가격이 저장되지 않고 메뉴 테이블의 실시간 가격을 참조',
//                 '→ 과거 주문 금액이 변경되어 정확한 내역 파악 불가. 환불이나 고객 클레임 대응 어려움.',
//               ],
//               tobe: [
//                 'order_items, order_item_options 테이블에 주문 당시 가격 별도 저장',
//                 '총액은 저장된 가격 기준으로 계산',
//               ],
//               result: [
//                 '과거 내역 신뢰성 확보',
//                 '정확한 매출 집계 가능',
//                 '사장님 클레임 대응 용이',
//               ],
//             },
//             {
//               title: '실시간 시스템 확장성 문제 해결',
//               asis: [
//                 'SSE로 실시간 반영을 구현했지만, 모든 이벤트에서 전체 주문 목록을 다시 요청하는 구조',
//                 '→ 트래픽 과부하, 렌더링 병목 발생',
//               ],
//               tobe: [
//                 'SSE는 단순히 이벤트 신호만 전송',
//                 '클라이언트는 변경된 주문 ID만 API로 가져오도록 개선',
//               ],
//               result: [
//                 '실시간성 유지하면서도 서버와 클라이언트 모두 부하 감소',
//                 '사용자가 느끼는 반응 속도 개선',
//               ],
//             },
//           ].map(({ title, asis, tobe, result }, idx) => (
//             <div key={idx} className="mb-16">
//               <h3 className="text-lg font-bold mb-2">{title}</h3>

//               <div className="mb-6">
//                 <p className="font-lg font-bold mb-1">AS-IS</p>
//                 <ul className="list-disc list-inside">
//                   {asis.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="mb-6">
//                 <p className="font-lg font-bold mb-1">TO-BE</p>
//                 <ul className="list-disc list-inside">
//                   {tobe.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <p className="font-lg font-bold mb-1">결과</p>
//                 <ul className="list-disc list-inside">
//                   {result.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* 회고 */}
//         <section>
//           <h2 className="text-xl font-bold mb-2">회고</h2>
//           <p className="whitespace-pre-line leading-relaxed">
//             Next Table Order는 단순한 CRUD 기반의 프로젝트처럼 보였지만, 실제
//             운영 흐름을 고려한 상태 관리, 실시간 처리, 데이터 모델링의 복잡성이
//             높았다. 사장님의 실수까지도 UX로 흡수해야 한다는 관점, 데이터
//             정합성과 실시간 처리의 경계를 맞추는 설계 과정은 프론트엔드
//             개발자로서 비즈니스 전체 흐름에 대한 감각과 기술적 깊이를 함께
//             확장할 수 있었던 경험이었다. 특히 SSE 최적화와 주문 그룹 모델링은
//             실제 서비스 수준의 구조 설계를 고민하게 된 계기가 되었다.
//           </p>
//         </section>
//       </div>

//       <div className="max-w-[680px] mx-auto px-6 py-12 text-zinc-800">
//         {/* 개요 */}
//         <section className="mb-8">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-indigo-700">BIENGUAL</h1>
//               <p className="text-zinc-500 mb-6">2024.09 – 2024.12</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <Github size={20} />
//                 <span>GitHub</span>
//                 <ExternalLink size={16} />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <span>Site</span>
//                 <ExternalLink size={16} />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <FileText size={20} />
//                 <span>Docs</span>
//                 <ExternalLink size={16} />
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* 대표 이미지 */}
//         <div className="rounded-md overflow-hidden mb-10">
//           <div className="w-full aspect-[16/9] bg-zinc-100 flex items-center justify-center text-zinc-400">
//             대표 이미지 캡처 예정
//           </div>
//         </div>

//         {/* 개요 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">개요 📦</h2>
//           <p className="whitespace-pre-line leading-relaxed">
//             BIENGUAL은 CNN 뉴스 기사 및 YouTube 콘텐츠 기반의 자막을 수집해,
//             사용자에게 리딩·리스닝 학습을 제공하는 영어 학습 플랫폼입니다. 영상
//             및 기사 콘텐츠를 통해 문장 단위 학습, 단어/문장 북마크, 퀴즈 생성,
//             진행률 트래킹까지 하나의 흐름으로 연결된 러닝 경험을 제공합니다.
//           </p>
//         </section>

//         {/* 역할 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">역할 🧑‍💻</h2>
//           <ul className="list-disc list-inside space-y-1">
//             <li>
//               팀 내 프론트엔드 리더로서 전체 UI/UX 구조 기획 및 기술 설계 주도
//             </li>
//             <li>Next.js App Router 기반 구조 설계 및 서버 컴포넌트 도입</li>
//             <li>학습 콘텐츠 기반 퀴즈 기능 및 대시보드 구현</li>
//             <li>이미지 최적화, SEO, 병렬 API 요청 등 성능 최적화 작업 주도</li>
//           </ul>
//         </section>

//         {/* 기술 스택 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">기술 스택 🛠</h2>
//           <ul className="list-disc list-inside space-y-1">
//             <li>Next.js, TypeScript, React-Query, Tailwind CSS, shadcn/ui</li>
//             <li>Recharts, Supabase, CloudFront CDN, S3, Autocannon</li>
//           </ul>
//         </section>

//         {/* 주요 기능 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">주요 기능 💡</h2>
//           <ul className="list-disc list-inside space-y-1 mb-4">
//             <li>메인 화면 – 캐러셀, 콘텐츠 섹션, 트래커</li>
//             <li>리스닝/리딩 – 자막 탐색, 북마크/메모, 진행률 저장</li>
//             <li>스크랩 – 북마크/메모 관리, 수정/삭제</li>
//             <li>퀴즈 – 자동 문제 생성, 정답률 분석, 재도전 기능</li>
//             <li>대시보드 – 카테고리별 학습 분포 및 히스토리</li>
//           </ul>

//           <div className="grid grid-cols-2 gap-4">
//             {[1, 2, 3, 4, 5].map((n, i) => (
//               <div
//                 key={n}
//                 className={`w-full aspect-[4/3] bg-zinc-100 rounded-md flex items-center justify-center text-zinc-400 ${
//                   i === 4 ? 'col-span-2 md:col-span-1' : ''
//                 }`}
//               >
//                 기능 이미지 {n}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* 마주한 이슈 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-4">마주한 이슈 🔧</h2>
//           {[
//             {
//               title: '퀴즈 상태 관리 구조 (이벤트 기반 설계 도입)',
//               asIs: [
//                 '단일 상태 변수로 정답 여부를 관리',
//                 '문제 개수 불일치, 결과 계산 오류 빈번',
//                 '시간 흐름 고려 불가 → 복잡한 로직 버그 다수 발생',
//               ],
//               toBe: [
//                 '상태를 이벤트의 축적으로 정의 (Event-Driven Architecture)',
//                 '`useReducer` 기반 FSM(Finite State Machine) 설계',
//                 '퀴즈 흐름을 `ready → submitting → correct/wrong`로 명확히 분리',
//                 '신규 로직 추가 시 기존 코드 변경 최소화',
//               ],
//               result: [
//                 '결과 계산 정확도 향상',
//                 '재도전 로직도 명확히 구현',
//                 '테스트 용이성 및 유지보수성 향상',
//               ],
//             },
//             {
//               title: '이미지 최적화 및 CDN 적용',
//               asIs: [
//                 'CNN/YouTube 썸네일을 원본 이미지 그대로 요청',
//                 '초기 로딩 지연 (LCP 6.9초), 사용 이탈 증가',
//               ],
//               toBe: [
//                 '썸네일 리사이징 및 WebP 변환',
//                 'S3 업로드 + CloudFront CDN 경유 제공',
//                 '`Cache-Control` 헤더 설정으로 반복 요청 최적화',
//                 'Autocannon으로 성능 테스트 및 검증',
//               ],
//               result: [
//                 'LCP: 6.9초 → 2.4초 (65% 개선)',
//                 'Latency: 46ms → 19ms',
//                 '백엔드 팀과 협업 통해 성능 향상 방향 설득',
//               ],
//             },
//             {
//               title: '병렬 요청 도입으로 메인 페이지 로딩 최적화',
//               asIs: [
//                 'API 요청을 순차적으로 처리 → Waterfall 문제 발생',
//                 '전체 콘텐츠 로딩 완료까지 시간 지연',
//               ],
//               toBe: [
//                 '`Promise.allSettled`로 병렬 요청',
//                 '실패한 요청만 fallback 처리해 유연성 확보',
//                 '주요 콘텐츠는 우선 로딩, 추천 콘텐츠는 백그라운드로 분리',
//               ],
//               result: [
//                 'LCP: 2.8초 → 2.3초 (18% 개선)',
//                 'Lighthouse 점수: 56 → 76',
//               ],
//             },
//             {
//               title: '반응형 Carousel을 직접 구현',
//               asIs: [
//                 '라이브러리(Swiper) 사용 시 데이터 처리 유연성 부족',
//                 '번들 크기 증가 및 미세한 반응형 제어 어려움',
//               ],
//               toBe: [
//                 '제네릭 기반 유연한 Carousel 설계',
//                 '화면 크기에 따라 콘텐츠 개수 동적 조절',
//                 'autoPlay 충돌 방지 및 모바일 터치 스와이프 대응',
//               ],
//               result: [
//                 '이미지뿐 아니라 다양한 UI 대응',
//                 '데스크탑/모바일 모두 자연스러운 UX 확보',
//                 '프로젝트 전체에 재사용 가능한 구조 도입',
//               ],
//             },
//             {
//               title: 'SEO 기반 설정',
//               asIs: [
//                 '메타태그 누락, 소셜 공유 시 썸네일 미표시',
//                 '검색 엔진에서 콘텐츠 미노출',
//                 '관리자 페이지도 크롤링 대상 포함',
//               ],
//               toBe: [
//                 '`generateMetadata`로 콘텐츠별 메타 태그 자동 생성',
//                 'sitemap.xml / robots.txt 설정',
//                 'Google Search Console 연동 후 CTR과 Position 확인',
//               ],
//               result: [
//                 'CTR: 22.6%, Average Position: 4.9',
//                 '검색 엔진 노출 시작, 콘텐츠 썸네일/제목 공유 가능',
//                 'SEO 개념에 대한 이해도 및 기술 적용 능력 향상',
//               ],
//             },
//           ].map(({ title, asIs, toBe, result }, idx) => (
//             <div key={idx} className="mb-16">
//               <h3 className="text-lg font-bold mb-2">{title}</h3>

//               <div className="mb-6">
//                 <p className="text-lg font-bold mb-1">AS-IS</p>
//                 <ul className="list-disc list-inside">
//                   {asIs.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="mb-6">
//                 <p className="text-lg font-bold mb-1">TO-BE</p>
//                 <ul className="list-disc list-inside">
//                   {toBe.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>

//               <div>
//                 <p className="text-lg font-bold mb-1">결과</p>
//                 <ul className="list-disc list-inside">
//                   {result.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </section>

//         {/* 회고 */}
//         <section>
//           <h2 className="text-xl font-bold mb-2">회고</h2>
//           <p className="whitespace-pre-line leading-relaxed">
//             이번 프로젝트는 단순한 기능 구현을 넘어서 사용자 경험과 성능 사이의
//             균형을 끊임없이 고민하며 개선해나간 여정이었습니다. 특히 이벤트 기반
//             아키텍처를 적용해 퀴즈 로직을 개선하고, 병렬 요청과 이미지 최적화를
//             통해 성능을 수치로 입증한 경험은 매우 값졌습니다. 또한 SEO,
//             Carousel, CDN 같은 비즈니스적 가치를 고려한 프론트엔드 개선 작업을
//             주도하며 기술만이 아닌 '제품 관점'에서 사고하는 태도를 키울 수
//             있었습니다.
//           </p>
//         </section>
//       </div>

//       <div className="max-w-[680px] mx-auto px-6 py-12 text-zinc-800">
//         {/* 타이틀 & 기간 */}
//         <section className="mb-8">
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-indigo-700">
//                 react-player-plugin-prompter
//               </h1>
//               <p className="text-zinc-500 mt-1">2024.10 – 2024.12</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <Github size={20} />
//                 <span>GitHub</span>
//                 <ExternalLink size={16} />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <span>Site</span>
//                 <ExternalLink size={16} />
//               </a>
//               <a
//                 href="#"
//                 className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
//               >
//                 <FileText size={20} />
//                 <span>Docs</span>
//                 <ExternalLink size={16} />
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* 대표 이미지 */}
//         <div className="rounded-md overflow-hidden mb-10">
//           <div className="w-full aspect-[16/9] bg-zinc-100 flex items-center justify-center text-zinc-400">
//             기능 이미지 캡처 예정
//           </div>
//         </div>

//         {/* 개요 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">개요 📦</h2>
//           <p className="leading-relaxed whitespace-pre-line">
//             react-player-plugin-prompter는 영어 영상 학습을 위한 자막 하이라이팅
//             및 탐색 기능에 특화된 React 기반 오픈소스 컴포넌트 라이브러리입니다.
//             영상 재생 시간에 맞춰 자막을 자동으로 스크롤하고, 사용자가 자막을
//             클릭하여 해당 시간으로 이동할 수 있는 기능을 제공합니다. 성능
//             최적화, 범용성, 개발자 사용성을 고려하여 설계하였습니다.
//           </p>
//         </section>

//         {/* 역할 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">역할 🙋🏻‍♂️</h2>
//           <ul className="list-disc list-inside space-y-1">
//             <li>전체 설계 및 구현 담당</li>
//             <li>NPM 배포용 라이브러리 구조 설계 및 자동화 파이프라인 구축</li>
//             <li>성능 최적화 및 오픈소스 설계 개선 실험 주도</li>
//           </ul>
//         </section>

//         {/* 기술 스택 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">기술 스택 🛠</h2>
//           <ul className="list-disc list-inside space-y-1">
//             <li>React, TypeScript, Vite, SCSS, esbuild</li>
//             <li>Yarn Workspaces (Monorepo)</li>
//             <li>GitHub Actions (CI/CD)</li>
//           </ul>
//         </section>

//         {/* 주요 기능 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-2">주요 기능 💡</h2>
//           <ul className="list-disc list-inside space-y-2 mb-6">
//             <li>영상 재생 시간에 따른 자막 자동 하이라이트 및 스크롤</li>
//             <li>자막 클릭 시 영상 탐색 기능 (seekTo)</li>
//             <li>한 줄 보기 / 전체 보기 모드 전환</li>
//             <li>단어 클릭 이벤트 처리 (단어 뜻 보기 기능 연동 가능)</li>
//             <li>외부 플레이어 연동 고려한 인터페이스 설계</li>
//           </ul>

//           {/* 기능 이미지 캡처 자리 */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="w-full aspect-[4/3] bg-zinc-100 rounded-md flex items-center justify-center text-zinc-400">
//               한 줄 보기 모드
//             </div>
//             <div className="w-full aspect-[4/3] bg-zinc-100 rounded-md flex items-center justify-center text-zinc-400">
//               전체 보기 모드
//             </div>
//             <div className="w-full aspect-[4/3] bg-zinc-100 rounded-md flex items-center justify-center text-zinc-400">
//               자막 하이라이팅 + 클릭 탐색
//             </div>
//             <div className="w-full aspect-[4/3] bg-zinc-100 rounded-md flex items-center justify-center text-zinc-400">
//               단어 클릭 이벤트
//             </div>
//           </div>
//         </section>

//         {/* 마주한 이슈 */}
//         <section className="mb-12">
//           <h2 className="text-xl font-bold mb-4">마주한 이슈 🔧</h2>

//           {/* 이슈 1 */}
//           <div className="mb-16">
//             <h3 className="text-lg font-bold mb-2">자막 탐색 성능 이슈</h3>

//             <div className="mb-6">
//               <p className="text-lg font-bold mb-1">AS-IS</p>
//               <ul className="list-disc list-inside">
//                 <li>
//                   순차 탐색(O(n)) 방식으로 자막 탐색 → 자막이 1,000개 이상일 때
//                   성능 저하, 탐색 평균 13.20ms
//                 </li>
//               </ul>
//             </div>

//             <div className="mb-6">
//               <p className="text-lg font-bold mb-1">TO-BE</p>
//               <ul className="list-disc list-inside">
//                 <li>
//                   이진 탐색(O(log n)) 알고리즘으로 개선 → 평균 0.15ms로 단축,
//                   88% 이상 속도 개선
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <p className="text-lg font-bold mb-1">결과</p>
//               <ul className="list-disc list-inside">
//                 <li>실시간 UX 개선 및 대용량 확장성 확보</li>
//               </ul>
//             </div>
//           </div>

//           {/* 이슈 2 */}
//           <div className="mb-16">
//             <h3 className="text-lg font-bold mb-2">
//               비효율적인 개발 흐름 → 모노레포 전환
//             </h3>

//             <div className="mb-6">
//               <p className="text-lg font-bold mb-1">AS-IS</p>
//               <ul className="list-disc list-inside">
//                 <li>
//                   CRA 환경에서 데모 & 라이브러리를 함께 개발 → 배포 후 테스트
//                   반복, 중복 설정 많음
//                 </li>
//               </ul>
//             </div>

//             <div className="mb-6">
//               <p className="text-lg font-bold mb-1">TO-BE</p>
//               <ul className="list-disc list-inside">
//                 <li>
//                   Yarn Workspaces 기반 모노레포 구조로 전환 → core/demo 폴더
//                   분리, 공통 설정 중앙 관리, GitHub Actions + esbuild 기반 자동
//                   배포
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <p className="text-lg font-bold mb-1">결과</p>
//               <ul className="list-disc list-inside">
//                 <li>개발 생산성 향상 및 테스트 효율 개선</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* 회고 */}
//         <section>
//           <h2 className="text-xl font-bold mb-2">회고</h2>
//           <p className="leading-relaxed whitespace-pre-line">
//             이 프로젝트는 내가 직접 설계하고 만든 첫 오픈소스 라이브러리였다.
//             기능 자체는 단순해 보일 수 있지만, 자막을 시간에 맞게 탐색하고
//             하이라이팅하는 문제는 데이터 탐색 성능과 UI/UX를 모두 고려해야 하는
//             흥미로운 도전이었다.
//             {'\n\n'}
//             특히 아래의 경험이 기억에 남는다:
//             {'\n\n'}- 성능 최적화의 중요성: 자막이 1,000개만 넘어가도 순차
//             탐색은 충분히 UX를 망가뜨릴 수 있다는 걸 체감했다. 단순한 로직이라도
//             제대로 설계해야 한다는 걸 배웠다.
//             {'\n'}- 좋은 오픈소스란 무엇인가에 대한 고민: 지나치게 많은 Props
//             요구, 필수 콜백 함수, 외부 상태 의존 등은 사용자의 진입 장벽이
//             되었다. 이를 개선하려면 기본 동작을 제공하거나 Context를 활용하는
//             방식이 필요함을 느꼈다.
//             {'\n'}- 자동화와 설계의 힘: esbuild와 GitHub Actions를 도입하며 빌드
//             속도와 배포 생산성을 대폭 향상시켰고, 작은 오픈소스라도 충분히
//             자동화가 큰 도움이 된다는 점을 체감했다.
//             {'\n\n'}
//             앞으로는 더 많은 사용자가 쉽게 쓸 수 있도록, 불필요한 설정을 줄이고
//             직관적인 API를 제공하는 방향으로 개선해 나갈 예정이다.
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// }

'use client';

import { projects } from '@/data/projects';
import ProjectSection from '@/components/print/ProjectSection';
import { Github, Mail, Book } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="px-6 py-10 max-w-[680px] mx-auto text-gray-800">
      {/* Profile Section */}
      <section className=" mb-12">
        <div className="flex items-start gap-4">
          {/* Name & Role */}
          <div>
            <h1 className="text-2xl font-bold">한현</h1>
            <p className="text-gray-600 mt-1">Frontend Engineer</p>
          </div>
        </div>

        {/* Highlight Sentence */}
        <div className="mt-8 text-lg font-medium text-gray-900">
          사용자에게 닿는 결과를 고민하며, 끝까지 책임지는 개발자입니다. 👨‍💻
        </div>

        {/* Description */}
        <div className="mt-4 text-base leading-relaxed text-gray-700">
          기획부터 함께 고민하고, 불완전한 흐름을 발견하면 더 나은 방향을
          제안합니다. 팀원이 빠진 프로젝트도 끝까지 완수했고, 주말에도 자리를
          지켰습니다. 화려한 말보다, 일하는 방식과 꾸준함으로 신뢰를 얻고
          싶습니다.
        </div>

        <div className="mt-4 text-base leading-relaxed text-gray-700">
          모르는 기술은 직접 실험하며 익히고, 설득이 필요할 땐 수치와 근거로
          설명합니다. 출근길 지하철에서도 문제 해결을 고민하고, 팀의 어려움엔
          먼저 나서서 함께 풀어냅니다.
        </div>

        <div className="mt-6 text-base leading-relaxed text-gray-700">
          작은 기능에도 사용자의 맥락과 목표를 담아내는 것, 그게 제가 제품을
          만드는 프론트엔드 개발자로서 가장 중요하게 생각하는 부분입니다. 💪
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <div className="w-6 h-6 rounded-full bg-gray-400"></div>
            </div>
            <span>1998. 05. 13</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <Book className="w-6 h-6 text-gray-500" />
            </div>
            <a href="https://smosco.dev" className="underline text-gray-700">
              https://smosco.dev
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <Mail className="w-6 h-6 text-gray-500" />
            </div>
            <span>go1ruf2tk3@gmail.com</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-200 rounded-full p-2">
              <Github className="w-6 h-6 text-gray-500" />
            </div>
            <a
              href="https://github.com/smosco"
              className="underline text-gray-700"
            >
              https://github.com/smosco
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>

        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>
              Next.js, React.js, TypeScript, Javascript, Styled-Component,
              Tailwind CSS, SCSS
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>React Query, Zustand, Redux</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-500 text-lg">✦</span>
            <span>Git, GitHub, GitHub Actions</span>
          </li>
        </ul>
      </section>

      {/* Project Sections */}
      {projects.map((project, i) => (
        <ProjectSection key={i} {...project} />
      ))}
    </div>
  );
}
