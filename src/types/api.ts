
export type BaseEntity = {
  id: string,
  created_at: number,
}

export type Entity<T> = {
  [K in keyof T]: T[K]
} & BaseEntity

export type Comment = Entity<{
  author_id: string,
  content: string,
  parent_id: string,
  root_id: string,
  author: User,
  likes: Like[],
  comments: Comment[],
}>

export type Like = Entity<{
  author_id: string,
  parent_id: string,
  parent_type: string,
}>

export type Post = Entity<{
  title: string,
  author_id: string,
  thread_id: string,
  content: string,
  thumbnail_url: string,
  is_private: boolean,
  author: User,
  likes: Like[],
  comments: Comment[],
}>

export type Thread = Entity<{
  title: string,
  image_url: string,
  posts: Post[],
}>

export type User = Entity<{
  handler: string,
  email: string,
  profile_url: string,
  is_admin: boolean,
  is_banned: boolean,
  banned_until: number,
  posts: Post[],
  comments: Comment[],
  likes: Like[],
}>
