'use client';

import { CreatePost } from "@/features/posts/components/create-post";
import { PostsList } from "@/features/posts/components/posts-list";
import { useUser } from "@/lib/auth";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const user = useUser();
  const [active, setActive] = useState(false);
  return (
    <div className="pt-22 bg-black text-white min-h-screen flex flex-col items-center">
      <CreatePost active={active} setActive={setActive} />
      <div onClick={() => {setActive(true)}} className="flex gap-2 bg-(--darker-foreground) p-2 rounded-xl items-center">
        <Image src={user.data?.profile_url ? user.data.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="w-9 h-9 rounded-full border bg-white" />
        <div className="bg-black rounded-2xl text-sm p-2 pl-4 text-neutral-300 w-145"> Say something to the world? </div>
      </div>
      <PostsList />
    </div>
  );
}
export default Home;