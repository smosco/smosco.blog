import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
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
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }, // fallback
      { url: '/favicon.svg', type: 'image/svg+xml' }, // modern
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
