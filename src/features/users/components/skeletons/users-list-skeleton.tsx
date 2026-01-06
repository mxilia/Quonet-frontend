import { SmallUserSkeleton } from "./small-user-skeleton"

export const UsersListSkeleton = () => {
  return (
    <div className="inline-flex w-full flex-col gap-1 p-1">
      <SmallUserSkeleton />
      <SmallUserSkeleton />
      <SmallUserSkeleton />
      <SmallUserSkeleton />
    </div>
  )
}
