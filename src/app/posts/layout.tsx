import type { ReactNode } from 'react';

export default function PostsLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-4xl mx-auto">{children}</div>;
}
