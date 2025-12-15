'use client';

import { CreatePost } from "@/features/posts/components/create-post";
import { PostsList } from "@/features/posts/components/posts-list";
import { Threads } from "@/features/threads/components/threads";
import { useLogout } from "@/lib/auth";

const App = () => {
  const logout = useLogout();
  return (
    <div className="bg-neutral-900 min-h-screen">
      Hello World
      <Threads />
      <PostsList authorId={""} threadId={""} title={""} />
      <CreatePost />
      <div onClick={() => logout.mutate()}>logout</div>
    </div>
  );
}
export default App;