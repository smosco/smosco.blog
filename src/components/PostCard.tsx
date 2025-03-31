import Image from 'next/image';

interface PostCardProps {
  category?: string;
  title: string;
  date: string;
  thumbnail: string;
}

export default function PostCard({
  category,
  title,
  date,
  thumbnail,
}: PostCardProps) {
  return (
    <div className="group flex justify-between items-center p-4 rounded-md transition-all duration-200 hover:-translate-y-[2px] hover:shadow-sm hover:bg-gray-100 dark:hover:bg-white/10">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold tracking-tight leading-snug group-hover:underline">
          {title}
        </h2>
        <time className="text-sm text-gray-400 mt-1">{date}</time>
      </div>
      <div className="ml-4 w-[144px] h-[81px] flex-shrink-0 relative rounded-md overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="144px"
        />
        {category && (
          <span className="absolute top-1 left-1 bg-white/80 dark:bg-black/50 text-[11px] text-gray-800 dark:text-gray-100 px-1.5 py-0.5 rounded-sm shadow-sm">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
