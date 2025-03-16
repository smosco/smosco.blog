import slugify from 'slugify';

export function generateSlug(title: string): string {
  return slugify(title, {
    lower: true, // 소문자로 변환
    strict: true, // 특수문자 제거
    trim: true, // 앞뒤 공백 제거
  });
}
