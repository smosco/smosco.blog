'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Portfolio', href: '/portfolio' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <nav className="mx-auto max-w-4xl px-6 py-4">
        <ul className="flex items-center gap-8">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'text-sm transition-colors hover:text-black',
                  pathname === item.href ? 'text-black' : 'text-neutral-500',
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
