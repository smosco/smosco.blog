import { ExternalLink, Github, FileText } from 'lucide-react';
import IssueCard from './IssueCard';

interface LinkInfo {
  github?: string;
  site?: string;
  docs?: string;
}

interface ProjectSectionProps {
  title: string;
  period: string;
  links?: LinkInfo;
  overview: string;
  roles: string[];
  stack: string[];
  features: string[];
  featureImages?: string[]; // or use placeholders
  issues: {
    title: string;
    asIs: string[];
    toBe: string[];
    result: string[];
  }[];
  retrospective: string;
}

export default function ProjectSection({
  title,
  period,
  links,
  overview,
  roles,
  stack,
  features,
  featureImages = [],
  issues,
  retrospective,
}: ProjectSectionProps) {
  return (
    <div className="max-w-[680px] mx-auto px-6 py-12 text-zinc-800">
      <section className="mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">{title}</h1>
            <p className="text-zinc-500 mt-1">{period}</p>
          </div>
          <div className="flex items-center gap-4">
            {links?.github && (
              <a
                href={links.github}
                className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
              >
                <Github size={20} />
                <span>GitHub</span>
                <ExternalLink size={16} />
              </a>
            )}
            {links?.site && (
              <a
                href={links.site}
                className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
              >
                <span>Site</span>
                <ExternalLink size={16} />
              </a>
            )}
            {links?.docs && (
              <a
                href={links.docs}
                className="flex items-center gap-1 text-zinc-700 hover:text-zinc-900"
              >
                <FileText size={20} />
                <span>Docs</span>
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="rounded-md overflow-hidden mb-10">
        <div className="w-full aspect-[16/9] bg-zinc-100 flex items-center justify-center text-zinc-400">
          대표 이미지 캡처 예정
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">개요 📦</h2>
        <p className="whitespace-pre-line leading-relaxed">{overview}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">역할 🙋🏻‍♂️</h2>
        <ul className="list-disc list-inside space-y-1">
          {roles.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">기술 스택 🛠</h2>
        <ul className="list-disc list-inside space-y-1">
          {stack.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-2">주요 기능 💡</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-4">
          {featureImages.map((img, i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-zinc-100 flex items-center justify-center text-zinc-400 rounded"
            >
              {img}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">마주한 이슈 🔧</h2>
        {issues.map((issue, i) => (
          <IssueCard key={i} {...issue} />
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">회고</h2>
        <p className="whitespace-pre-line leading-relaxed">{retrospective}</p>
      </section>
    </div>
  );
}
