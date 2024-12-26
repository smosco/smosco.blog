import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
}

export default function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  demoUrl,
  githubUrl,
  tags,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block h-full">
      <Card className="group relative h-full border border-border/40 bg-background/95 transition-colors hover:border-border/80">
        <CardContent className="flex h-full flex-col space-y-4 p-0">
          <div className="relative h-48">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="rounded-t-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 rounded-t-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-2">
              <h3 className="font-semibold tracking-tight">{title}</h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="pt-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-secondary/50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
