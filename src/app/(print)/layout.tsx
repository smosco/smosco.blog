// app/(print)/layout.tsx
export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="px-4 max-w-[680px] mx-auto py-10">{children}</main>;
}
