import { ExternalLink, Github, FileText, Globe } from 'lucide-react';
import Link from 'next/link';

type LinkItem = {
  label: string;
  url: string;
  icon: 'github' | 'site' | 'docs';
};

interface ProjectLinksProps {
  links: LinkItem[];
}

export function ProjectLinks({ links }: ProjectLinksProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github size={18} />;
      case 'site':
        return <Globe size={18} />;
      case 'docs':
        return <FileText size={18} />;
      default:
        return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.url}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 rounded-md text-zinc-700 hover:bg-zinc-200 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {getIcon(link.icon)}
          <span className="underline">{link.label}</span>
          <ExternalLink size={14} className="ml-0.5" />
        </Link>
      ))}
    </div>
  );
}
