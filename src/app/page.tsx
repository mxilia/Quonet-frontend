'use client';

import { CreatePost } from "@/features/posts/components/create-post";
import { PostsList } from "@/features/posts/components/posts-list";
import { CreateThread } from "@/features/threads/components/create-thread";
import { Threads } from "@/features/threads/components/threads";
import { ThreadList } from "@/features/threads/components/threads-list";

const App = () => {
  return (
    <div>
      Hello World
      <Threads/>
      <PostsList authorId={""} threadId={""} title={""} />
      <CreatePost />
    </div>
  );
}
export default App;