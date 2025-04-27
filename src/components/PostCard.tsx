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
    <div className="group flex justify-between items-center p-4 rounded-lg transition-all duration-300 bg-white hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1">
      <div className="flex flex-col justify-center">
        {category && (
          <div className="inline-block w-fit bg-gray-100 group-hover:bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 transition-colors duration-300">
            {category}
          </div>
        )}
        <h2 className="text-lg font-bold tracking-tight leading-snug text-gray-900 group-hover:underline">
          {title}
        </h2>
        <time className="text-sm text-gray-400 mt-1">{date}</time>
      </div>
      <div className="ml-6 w-[144px] h-[81px] flex-shrink-0 relative rounded-md overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="144px"
        />
      </div>
    </div>
  );
}
