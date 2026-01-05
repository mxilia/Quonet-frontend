import { User } from "@/types/api";
import Image from "next/image";

type SmallUserProps = {
  user: User;
}

export const SmallUser = ({ user }: SmallUserProps) => {
  return (
    <div className="w-full inline-flex gap-2 p-2 border border-(--foreground) rounded-lg">
      {user.profile_url ? 
      <Image src={user.profile_url} className="w-7 h-7 rounded-sm" width={28} height={28} alt={`${user.handler} img`}/> 
      : 
      <div className="rounded-sm w-7 text-xs h-7 bg-neutral-700"> no img </div>}
      {user.handler}     
    </div>
  )
}