"use client"

import { useUser } from "@/lib/auth"
import { useDeleteUser } from "../api/delete-user"
import { useRouter } from "next/navigation"
import { path } from "@/config/path"

export const DeleteUser = () => {
  const user = useUser()
  const router = useRouter()
  const deleteUser = useDeleteUser()

  if (!user || !user.data) return null

  const onDeleteUser = () => {
    deleteUser.mutate({
      userId: user.data!.id,
      handler: user.data!.handler,
      email: user.data!.email,
    })
    router.push(path.public.login.getHref())
  }

  return (
    <button
      onClick={onDeleteUser}
      className="w-fit rounded-xl border border-red-700 p-1 px-2 text-sm text-red-700 hover:bg-(--darker-foreground)"
    >
      {" "}
      delete account{" "}
    </button>
  )
}
