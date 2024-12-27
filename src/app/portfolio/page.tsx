import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    id: 'biengual',
    title: 'Biengual',
    description:
      '사용자의 관심사에 맞춘 CNN기사와 유튜브 영상 콘텐츠를 통해 리딩과 리스닝 능력 향상할 수 있는 무료 영어학습 플랫폼입니다.',
    imageUrl: '/images/메인썸.png',
    demoUrl: 'https://example.com/blog',
    githubUrl: 'https://github.com/username/blog',
    tags: ['Next.js', 'TypeScript', 'React-Query', 'Tailwind CSS'],
  },
  {
    id: 'react-player-plugin-prompter',
    title: 'react-player-plugin-prompter',
    description:
      '영어 학습 서비스를 위한 자막 탐색 및 하이라이트 최적화 오픈소스 라이브러리입니다.',
    imageUrl: '/images/오픈소스썸.png',
    demoUrl: 'https://www.npmjs.com/package/react-player-plugin-prompter',
    githubUrl: 'https://github.com/smosco/react-player-plugin-prompter',
    tags: ['React', 'TypeScript', 'ESBuild', 'Yarn Workspaces'],
  },
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto grid gap-6 py-8 grid-cols-1 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
