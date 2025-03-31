import React from 'react';
import { YouTubePlayer } from '@/components/YouTubePlayer';

export const FeatureItem = ({
  videoId,
  title,
  contributions,
}: {
  videoId: string;
  title: string;
  contributions: string[];
}) => (
  <div className="flex flex-col lg:flex-row bg-gray-100 rounded border border-gray-300 overflow-hidden">
    <div className="relative w-full lg:w-1/2 aspect-video">
      <YouTubePlayer videoId={videoId} />
    </div>

    <div className="p-6 lg:w-2/3">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {contributions.map((contribution, idx) => (
          <li key={idx}>{contribution}</li>
        ))}
      </ul>
    </div>
  </div>
);
