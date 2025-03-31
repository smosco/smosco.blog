// components/portfolio/Section.tsx
import React from 'react';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="py-8 border-t border-gray-300">
    <h2 className="text-xl font-semibold mb-6">{title}</h2>
    <div className="space-y-6">{children}</div>
  </section>
);

export default Section;
