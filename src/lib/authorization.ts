import { Post, User, Comment } from "@/types/api"

export const canCreateLike = (user: User | null | undefined) => {
  return user !== null && user !== undefined
}

export const canCreateThread = (user: User | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner"
}

export const canDeleteThread = (user: User | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner"
}

export const canCreatePost = (user: User | null | undefined) => {
  return user !== null && user !== undefined
}

export const canDeletePost = (user: User | null | undefined, post: Post | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner" || user?.id === post?.author_id
}

export const canCreateComment = (user: User | null | undefined) => {
  return user !== null && user !== undefined
}

export const canDeleteComment = (
  user: User | null | undefined,
  comment: Comment | null | undefined,
) => {
  return user?.role === "admin" || user?.role === "owner" || user?.id === comment?.author_id
}

export const isAdmin = (user: User | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner"
}

export const isLogin = (user: User | null | undefined) => {
  return user !== null && user !== undefined
}
