import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import PlaylistGrid from '@/components/playlists/PlaylistGrid';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      {session ? (
        <PlaylistGrid />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome to YouTube Playlist Viewer
          </h2>
          <p className="mt-2 text-gray-600">
            Please sign in with your Google account to view your playlists.
          </p>
        </div>
      )}
    </div>
  );
}