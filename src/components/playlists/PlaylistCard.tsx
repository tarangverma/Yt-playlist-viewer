import { Playlist } from '@/types/youtube';
import Link from 'next/link';
import Image from 'next/image';

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <Link 
      href={`/playlist/${playlist.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative h-48 w-full">
        <Image
          src={playlist.snippet.thumbnails.medium.url}
          alt={playlist.snippet.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-1">
          {playlist.snippet.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-2">
          {playlist.snippet.description}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          {playlist.contentDetails.itemCount} videos
        </p>
      </div>
    </Link>
  );
}