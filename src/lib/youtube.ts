import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export class YouTubeService {
  private oauth2Client: OAuth2Client;
  private youtube: any;

  constructor(accessToken: string) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    
    this.oauth2Client.setCredentials({
      access_token: accessToken
    });

    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client
    });
  }

  async getPlaylists() {
    try {
      const response = await this.youtube.playlists.list({
        part: ['snippet', 'contentDetails'],
        mine: true,
        maxResults: 50
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
    }
  }

  async getPlaylistItems(playlistId: string) {
    try {
      const response = await this.youtube.playlistItems.list({
        part: ['snippet', 'contentDetails'],
        playlistId: playlistId,
        maxResults: 50
      });
      return response.data.items;
    } catch (error) {
      console.error('Error fetching playlist items:', error);
      throw error;
    }
  }
}