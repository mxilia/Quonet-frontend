import { SmallUserSkeleton } from "./small-user-skeleton"

export const UsersListSkeleton = () => {
  return (
    <div className="w-full p-1 inline-flex flex-col gap-1">
      <SmallUserSkeleton />
      <SmallUserSkeleton />
      <SmallUserSkeleton />
      <SmallUserSkeleton />
    </div>
  )
}