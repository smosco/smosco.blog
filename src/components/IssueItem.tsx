export default function IssueItem({
  title,
  description,
  details,
}: {
  title: string;
  description: string;
  details: string[];
}) {
  <div className="relative mb-8">
    <div className="absolute left-0 top-2 h-4 w-4 bg-blue-500 rounded-full"></div>
    <div className="pl-8">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="list-disc list-inside text-sm text-gray-600">
        {details.map((detail, idx) => (
          <li key={idx}>{detail}</li>
        ))}
      </ul>
    </div>
  </div>;
}

// <IssueItem
//   title="Responsive Carousel Component"
//   description="Swiper를 사용하지 않고 직접 반응형 Carousel 컴포넌트를 설계 및 구현했습니다."
//   details={[
//     '제네릭 타입을 활용한 유연한 설계로 다양한 UI 지원',
//     '디바이스별 항목 수 조정 로직 추가로 반응형 화면 지원',
//     'autoPlay와 터치 이벤트 충돌 방지 로직 구현으로 UX 개선',
//   ]}
// />
// <IssueItem
//   title="Image Optimization"
//   description="고해상도 이미지를 리사이징하여 성능을 대폭 개선했습니다."
//   details={['LCP 6.9초 → 2.4초 개선', 'Latency 46ms → 19ms 감소']}
// />
