import { User } from "@/types/api"
import Image from "next/image"

type SmallUserProps = {
  user: User
}

export const SmallUser = ({ user }: SmallUserProps) => {
  return (
    <div className="border-foreground inline-flex w-full items-center gap-2 rounded-lg border p-2">
      {user.profile_url ? (
        <Image
          src={user.profile_url}
          className="h-7 w-7 rounded-sm"
          width={28}
          height={28}
          alt={`${user.handler} img`}
        />
      ) : (
        <div className="h-7 w-7 rounded-sm bg-neutral-700 text-xs"> no img </div>
      )}
      {user.handler}
      <div
        className={`mt-1 h-fit w-fit rounded-xl border pr-1 pl-1 text-center text-[10px] ${user.role === "owner" ? "border-secondary text-secondary" : user.role === "admin" ? "border-yellow-300 text-yellow-300" : "border-green-300 text-green-300"}`}
      >
        {user.role}
      </div>
    </div>
  )
}
