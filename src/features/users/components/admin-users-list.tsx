import { useInfiniteUsers } from "../api/get-users"
import { DeleteUser } from "./delete-user"
import { UsersListSkeleton } from "./skeletons/users-list-skeleton"
import { SmallUser } from "./small-user"
import { UpdateUserRole } from "./update-user-role"

export const AdminUsersList = () => {
  const usersQuery = useInfiniteUsers()
  if (usersQuery.isLoading) return <UsersListSkeleton />

  const users = usersQuery.data?.pages.flatMap((page) => page.data)

  return (
    <div className="inline-flex w-full flex-col gap-1 p-1">
      <h1 className="text-xl"> Users </h1>
      {users?.map((e) => (
        <div key={e.id}>
          <SmallUser user={e} />
          <div className="inline-flex w-full items-center justify-between pt-1">
            <UpdateUserRole userId={e.id} handler={e.handler} email={e.email} />
            <DeleteUser userId={e.id} handler={e.handler} email={e.email} />
          </div>
        </div>
      ))}
    </div>
  )
}
