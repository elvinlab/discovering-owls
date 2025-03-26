export interface Comment {
  id: string;
  content: string;
  translations?: Record<string, string>;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  likes: number;
}