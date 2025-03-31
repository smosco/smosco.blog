import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from '@/components/layout/Header';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap', // 폰트 로드 전에 기본 폰트 표시
});

export const metadata: Metadata = {
  title: 'smosco from cosmos',
  description: 'smosco의 테크 블로그',
  openGraph: {
    type: 'website',
    title: 'smosco from cosmos',
    description: 'smosco의 테크 블로그',
    url: 'https://smosco-dev.vercel.app/',
    images: [
      {
        url: 'https://smosco-dev.vercel.app/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'blog og image',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <Header />
        <main className="pt-[120px] px-4 min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
