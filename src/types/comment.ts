export interface Comment {
  id: number;
  movieId: string;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentRequest {
  movieId: string;
  content: string;
}
