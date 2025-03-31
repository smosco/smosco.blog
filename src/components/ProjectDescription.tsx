import React from 'react';

export const ProjectDescription = ({
  description,
  techStack,
  demoLink,
  githubLink,
}: {
  description: string;
  techStack: string[];
  demoLink?: string;
  githubLink?: string;
}) => (
  <div className="rounded mb-8">
    <p className="text-gray-700 mb-4">{description}</p>
    <h4 className="font-medium text-sm mb-2">기술 스택</h4>
    <div className="flex flex-wrap gap-2 mb-4">
      {techStack.map((tech, idx) => (
        <span
          key={idx}
          className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs"
        >
          {tech}
        </span>
      ))}
    </div>
    {demoLink && (
      <a
        href={demoLink}
        className="text-blue-500 text-sm hover:underline mr-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Demo
      </a>
    )}
    {githubLink && (
      <a
        href={githubLink}
        className="text-blue-500 text-sm hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    )}
  </div>
);
