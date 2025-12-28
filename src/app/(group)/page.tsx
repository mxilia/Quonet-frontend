'use client';

import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { AnnouncementsLists } from "@/features/announcements/components/announcements-list";
import { CreatePost } from "@/features/posts/components/create-post";
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list";
import { ThreadList } from "@/features/threads/components/threads-list";
import { useUser } from "@/lib/auth";
import { isLogin } from "@/lib/authorization";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const user = useUser();
  const [active, setActive] = useState(false);
  return (
    <div className="pt-22 bg-black text-white min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center grow w-150 p-2">
        <CreatePost active={active} setActive={setActive} />
        {isLogin(user.data) &&
          <div onClick={() => {setActive(true)}} className="w-full flex gap-2 bg-(--darker-foreground) p-2 rounded-xl items-center mb-2">
            <Image src={user.data?.profile_url ? user.data.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="w-9 h-9 rounded-full border bg-white" />
            <div className="bg-black rounded-2xl text-sm p-2 pl-4 text-neutral-300 w-full"> Say something to the world? </div>
          </div>
        }
        <AnnouncementsLists />
        <TopLikedPostsList />
        <ThreadList />
      </div>
    </div>
  );
}
export default Home;