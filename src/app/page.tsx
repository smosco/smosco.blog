import React from 'react';
import { Github, Mail } from 'lucide-react';

const socialLinks = [
  {
    icon: Mail,
    href: 'mailto:go1ruf2tk3@gmail.com',
    label: 'Email',
  },
  {
    icon: Github,
    href: 'https://github.com/smosco',
    label: 'GitHub',
  },
];

function HomePage() {
  return (
    <div>
      <header className="mt-4 text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">한현 - Frontend Engineer</h1>
        <p className="text-gray-600">
          Product-minded Developer | Crafting Meaningful Solutions
        </p>

        <div className="mt-6 flex justify-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-blue-400"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </header>
    </div>
  );
}

export default HomePage;
