import { Header } from '@/components/layout/Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-[120px] px-4 max-w-4xl mx-auto min-h-[calc(100vh-80px)]">
        {children}
      </main>
    </>
  );
}
