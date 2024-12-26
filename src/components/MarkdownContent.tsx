export default function MarkdownContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="markdown-content">{children}</div>;
}
