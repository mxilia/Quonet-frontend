"use client"

import { useState } from "react"
import { CommentsList } from "./comments-list"
import { CreateComment } from "./create-comment"

type CommentsProps = {
  rootId: string
}

export const Comments = ({ rootId }: CommentsProps) => {
  const [isReplying, setIsReplying] = useState(false)
  const [parentId, setParentId] = useState("")
  const [handler, setHandler] = useState("")
  return (
    <>
      {isReplying && (
        <CreateComment
          parentId={parentId}
          rootId={rootId}
          handler={handler}
          setIsReplying={setIsReplying}
        />
      )}
      <CommentsList
        rootId={rootId}
        depth={0}
        setHandler={setHandler}
        setIsReplying={setIsReplying}
        setParentId={setParentId}
      />
    </>
  )
}
