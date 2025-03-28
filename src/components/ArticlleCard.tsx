import { ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  date: string;
  category: string;
  thumbnail: string;
}

export default function ArticleCard({
  title,
  date,
  category,
  thumbnail,
}: ArticleCardProps) {
  return (
    <div className="group relative hover:bg-slate-200 bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition-all duration-100 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* 이미지 */}
        <div className="w-full sm:w-1/3 h-40 overflow-hidden relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* 설명 */}
        <div className="p-6 flex flex-col justify-between w-full sm:w-2/3">
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              {category}
            </span>
          </div>

          <h2 className="mt-3 text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
            {title}
          </h2>

          <time className="block mt-2 text-sm text-slate-600 dark:text-slate-400">
            {date}
          </time>

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ArrowUpRight size={20} className="text-slate-400 " />
          </div>
        </div>
      </div>
    </div>
  );
}
