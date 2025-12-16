'use client';

import { Posts } from "@/features/posts/components/posts";
import { Threads } from "@/features/threads/components/threads";
import { useLogout } from "@/lib/auth";

const Home = () => {
  const logout = useLogout();
  return (
    <div className="pt-17 bg-black text-white min-h-screen grid grid-cols-3">
      <Threads />
      <Posts authorId={""} threadId={""} title={""} />
    </div>
  );
}
export default Home;