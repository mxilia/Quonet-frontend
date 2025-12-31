"use client"

import { CreatePost } from "@/features/posts/components/create-post"
import { useUser } from "@/lib/auth"
import { isLogin } from "@/lib/authorization"
import { useState } from "react"
import Image from "next/image"

export const CreatePostTab = () => {
  const user = useUser()
  const [active, setActive] = useState(false)
  return (
    <>
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
    </>
  )
}
