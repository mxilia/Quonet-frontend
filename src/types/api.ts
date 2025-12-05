
export type BaseEntity = {
  id: string,
  created_at: number,
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type User = Entity<{
  handler: string;
  email: string;
  profile_url: string;
  role: 'member' | 'admin' | 'owner';
  is_banned: boolean;
  banned_until: number;

  posts: Post[];
  comments: Comment[];
  likes: Like[];
}>;

export type Thread = Entity<{
  title: string;
  image_url: string;
  posts: Post[];
}>;

export type Post = Entity<{
  title: string;
  author_id: string;
  thread_id: string;
  content: string;
  thumbnail_url: string;
  is_private: boolean;
  like_count: number;

  author: User;
  likes: Like[];
  comments: Comment[];
}>;

export type Comment = Entity<{
  author_id: string;
  content: string;
  like_count: number;

  parent_id: string | null;
  root_id: string;

  author: User;
  likes: Like[];
  comments: Comment[];
}>;

export type Like = Entity<{
  owner_id: string;
  parent_id: string;
  parent_type: 'post' | 'comment';
  is_positive: boolean;
}>;

export type RenewAccessTokenResponseEntity = {
  access_token: string;
  access_token_expires_at: number;
};

export type LoginResponse = {
  user: User;

  access_token: string;
  access_token_expires_at: number;
};