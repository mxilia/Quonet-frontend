"use client"

import { useUser } from "@/lib/auth"
import { useDeleteUser } from "../api/delete-user"
import { useRouter } from "next/navigation"
import { path } from "@/config/path"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type DeleteUserProps = {
  userId: string;
  handler: string;
  email: string;
}

export const DeleteUser = ({ userId, handler, email }: DeleteUserProps) => {
  const user = useUser()
  const router = useRouter()
  const deleteUser = useDeleteUser()
  const notify = useNotificationStore((s) => s.notify)

  if (!user || !user.data) return null

  const onDeleteUser = () => {
    deleteUser.mutate(
      {
        userId: userId,
        handler: handler,
        email: email,
      },
      {
        onSuccess: () => {
          notify({
            type: "success",
            message: "Updated handler successfully",
          })
        },
        onError: () => {
          notify({
            type: "error",
            message: "Failed to update handler",
          })
        },
      },
    )
    router.push(path.public.login.getHref())
  }

  return (
    <button
      onClick={onDeleteUser}
      className="w-fit rounded-xl h-fit border border-red-700 p-1 px-2 text-sm text-red-700 hover:bg-(--darker-foreground)"
    >
      {" "}
      delete account{" "}
    </button>
  )
}
