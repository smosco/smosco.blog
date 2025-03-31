// Post 타입 정의
export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string; // 날짜는 문자열로 저장
  category: string;
  thumbnail: string;
  draft: boolean;
  contentHtml: string; // HTML로 변환된 본문
  readingTime: number;
}
