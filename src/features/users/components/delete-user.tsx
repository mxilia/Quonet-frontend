"use client"

import { useUser } from "@/lib/auth"
import { useDeleteUser } from "../api/delete-user"
import { useRouter } from "next/navigation"
import { path } from "@/config/path"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type DeleteUserProps = {
  userId: string
  handler: string
  email: string
}

export const DeleteUser = ({ userId, handler, email }: DeleteUserProps) => {
  const user = useUser()
  const router = useRouter()
  const deleteUser = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        notify({
          type: "success",
          message: "Deleted user successfully",
        })
      },
      onError: () => {
        notify({
          type: "error",
          message: "Failed to delete user",
        })
      },
    },
  })
  const notify = useNotificationStore((s) => s.notify)

  if (!user || !user.data) return null

  const onDeleteUser = () => {
    deleteUser.mutate({
      userId: userId,
      handler: handler,
      email: email,
    })
    // router.push(path.public.login.getHref())
  }

  return (
    <button
      onClick={onDeleteUser}
      className="h-fit w-fit rounded-xl border border-red-700 p-1 px-2 text-sm text-red-700 hover:bg-(--darker-foreground)"
    >
      {" "}
      delete account{" "}
    </button>
  )
}
