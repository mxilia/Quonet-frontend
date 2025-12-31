"use client"

import { AnnouncementsLists } from "@/features/announcements/components/announcements-list"
import { CreatePost } from "@/features/posts/components/create-post"
import { TopLikedPostsList } from "@/features/posts/components/top-liked-post-list"
import { ThreadList } from "@/features/threads/components/threads-list"
import { useUser } from "@/lib/auth"
import { isLogin } from "@/lib/authorization"
import Image from "next/image"
import { useState } from "react"

const Home = () => {
  const user = useUser()
  const [active, setActive] = useState(false)
  return (
    <div className="flex min-h-screen flex-col items-center bg-black pt-22 text-white">
      <div className="flex w-full grow flex-col items-center pr-4 pl-4 sm:w-150 sm:p-2">
        <CreatePost active={active} setActive={setActive} />
        {isLogin(user.data) && (
          <div
            onClick={() => {
              setActive(true)
            }}
            className="mb-2 flex w-full items-center gap-2 rounded-xl bg-(--darker-foreground) p-2"
          >
            <Image
              src={user.data?.profile_url ? user.data.profile_url : "/default-avatar.png"}
              height={30}
              width={30}
              alt="user profile"
              className="h-9 w-9 rounded-full border bg-white"
            />
            <div className="w-full rounded-2xl bg-black p-2 pl-4 text-sm text-neutral-300">
              {" "}
              Say something to the world?{" "}
            </div>
          </div>
        )}
        <AnnouncementsLists />
        <TopLikedPostsList />
        <ThreadList />
      </div>
    </div>
  )
}
export default Home
