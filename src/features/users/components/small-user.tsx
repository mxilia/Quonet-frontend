import { User } from "@/types/api"
import Image from "next/image"

type SmallUserProps = {
  user: User
}

export const SmallUser = ({ user }: SmallUserProps) => {
  return (
    <div className="inline-flex w-full gap-2 rounded-lg border border-(--foreground) p-2">
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
    </div>
  )
}
