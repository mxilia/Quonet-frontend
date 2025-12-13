import { Post, User, Comment } from "@/types/api";

export const canCreateLike = (user: User | null | undefined) => {
  return user !== null && user !== undefined;
}

export const canCreateThread = (user : User | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner";
}

export const canCreatePost = (user : User | null | undefined) => {
  return user !== null && user !== undefined;
}

export const canDeleteThread = (user : User | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner";
}

export const canDeletePost = (user : User | null | undefined, post : Post | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner" || user?.id === post?.author_id;
}

export const canDeleteComment = (user : User | null | undefined, comment : Comment | null | undefined) => {
  return user?.role === "admin" || user?.role === "owner" || user?.id === comment?.author_id;
}