import { CreatePost } from "./create-post"
import { PostsList } from "./posts-list"

type PostsProps = {
  authorId: string, 
  threadId: string, 
  title: string,
}

export const Posts = ({ authorId = "", threadId = "", title = "" } : PostsProps) => {
  return (
    <div>
      <CreatePost />
      <PostsList authorId={authorId} threadId={threadId} title={title} />
    </div>
  )
}