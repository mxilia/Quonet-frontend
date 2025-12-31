"use client"

import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { useUserById } from "../api/get-user"
import { FullUserSkeleton } from "./skeletons/full-user-skeleton"

type FullUserProps = {
  userId: string
}

const adminBg =
  "inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.30),transparent_50%)]"

export const FullUser = ({ userId }: FullUserProps) => {
  const userQuery = useUserById({ userId })
  if (userQuery.isLoading) return <FullUserSkeleton />
  const user = userQuery.data
  if (!user) return <div className="text-xs text-neutral-500">user not found</div>
  return (
    <div
      className={`border border-(--darker-foreground) p-3 ${user.role === "member" ? "bg-(--darker-foreground)" : adminBg} mb-2 rounded-2xl`}
    >
      <div className="flex items-center gap-2">
        <ImageFrame
          src={user.profile_url ? user.profile_url : "/default-avatar.png"}
          height={40}
          width={40}
          alt="user profile"
          imgClassName="rounded-full"
          className="flex items-center justify-center rounded-full border border-(--foreground) bg-white"
        />
        <div className="text-center text-xl">{user.handler}</div>
        <div
          className={`mt-2 rounded-xl border pr-1 pl-1 text-center text-[10px] ${user.role === "owner" ? "border-(--secondary) text-(--secondary)" : user.role === "admin" ? "border-yellow-300 text-yellow-300" : "border-green-300 text-green-300"}`}
        >
          {user.role}
        </div>
      </div>
      <div className="mt-3 text-2xl"> Bio </div>
      <p className="text-[16px] whitespace-pre-line text-neutral-300">
        {user.bio === "" ? "no bio" : user.bio}
      </p>
    </div>
  )
}
