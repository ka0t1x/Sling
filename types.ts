export interface VideoData {
  id: string;
  url: string;
  username: string;
  description: string;
  song: string;
  likes: number;
  comments: number;
  shares: number;
  avatar: string;
}

export interface GeminiResponse {
  caption?: string;
  hashtags?: string[];
  analysis?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  stats: {
    following: string;
    followers: string;
    likes: string;
  };
}