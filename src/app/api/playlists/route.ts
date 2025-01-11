import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { YouTubeService } from '@/lib/youtube';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const account = await prisma.account.findFirst({
      where: {
        userId: session.user.id,
        provider: 'google'
      }
    });

    if (!account?.access_token) {
      return NextResponse.json({ error: 'No access token found' }, { status: 401 });
    }

    const youtube = new YouTubeService(account.access_token);
    const playlists = await youtube.getPlaylists();

    // Store playlists in database
    for (const playlist of playlists) {
      await prisma.playlist.upsert({
        where: { id: playlist.id },
        update: {
          title: playlist.snippet.title,
          description: playlist.snippet.description,
          thumbnailUrl: playlist.snippet.thumbnails?.default?.url
        },
        create: {
          id: playlist.id,
          title: playlist.snippet.title,
          description: playlist.snippet.description,
          thumbnailUrl: playlist.snippet.thumbnails?.default?.url,
          userId: session.user.id
        }
      });
    }

    return NextResponse.json(playlists);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlists' }, 
      { status: 500 }
    );
  }
}