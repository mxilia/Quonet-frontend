"use client"

import { useUser } from "@/lib/auth"
import { useUpdatePost } from "../api/update-post"
import { useRef } from "react"

type UpdatePostProps = {
  postId: string
  threadId: string
}

export const UpdatePost = ({ postId, threadId }: UpdatePostProps) => {
  const { data: user, isLoading, error } = useUser()
  const resetRef = useRef<(() => void) | null>(null)

  if (isLoading) return <div>is loading...</div>

  const updatePost = useUpdatePost()

  return null
}
