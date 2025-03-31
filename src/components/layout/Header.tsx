'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Posts', href: '/posts' },
  { name: 'Portfolio', href: '/portfolio' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full backdrop-blur transition-all duration-300',
        scrolled
          ? 'h-[60px] border-b border-gray-200 bg-white/70 dark:bg-black/30'
          : 'h-[120px] border-transparent bg-white/0 dark:bg-black/0',
      )}
    >
      <div className="grid grid-cols-[1fr_minmax(auto,56rem)_1fr] h-full">
        <div className="col-start-2 col-end-3 px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl italic font-bold hover:underline">
            smosco.
          </Link>
          <nav className="flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'text-black dark:text-white'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
