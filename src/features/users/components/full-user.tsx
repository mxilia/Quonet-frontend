"use client";

import { ImageFrame } from "@/components/ui/image-frame/image-frame";
import { useUserById } from "../api/get-user";

type FullUserProps = {
  userId: string;
}

const adminBg = "inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.30),transparent_50%)]";

export const FullUser = ({ userId } : FullUserProps ) => {
  const userQuery = useUserById({userId});
  if(userQuery.isLoading) return <div>loading</div>;
  const user = userQuery.data;
  if(!user) return <div>user not found</div>;
  return (
    <div className={`p-3 border border-(--darker-foreground) ${user.role === "member" ? "bg-(--darker-foreground)" : adminBg} rounded-2xl mb-2`}>
      <div className="flex items-center gap-2">
        <ImageFrame src={ user.profile_url ? user.profile_url : "/default-avatar.png"} height={40} width={40} alt="user profile" imgClassName="rounded-full" className="border border-(--foreground) rounded-full flex items-center justify-center bg-white" />
        <div className="text-xl text-center">{user.handler}</div>
        <div className={`border rounded-xl pl-1 pr-1 text-[10px] text-center mt-2 ${user.role === "owner" ? "text-(--secondary) border-(--secondary)" : user.role === "admin" ?  "text-yellow-300 border-yellow-300" : "text-green-300 border-green-300"}`}>{user.role}</div>
      </div>
      <div className="mt-3 text-2xl"> Bio </div>
      <p className="whitespace-pre-line text-[16px] text-neutral-300">{ user.bio === "" ? "no bio" : user.bio }</p>
    </div>
  )
}