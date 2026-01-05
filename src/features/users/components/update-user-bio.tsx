"use client"

import { useUser } from "@/lib/auth"
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user"
import { Form } from "@/components/ui/form/form"
import { Textarea } from "@/components/ui/form/textarea"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type UpdateUserBioProps = {
  userId: string;
  handler: string;
  email: string;
}

export const UpdateUserBio = ({ userId, handler, email }: UpdateUserBioProps) => {
  const user = useUser()
  const updateUser = useUpdateUser()
  const resetRef = useRef<(() => void) | null>(null)
  const router = useRouter()
  const notify = useNotificationStore((s) => s.notify)

  if (!user || !user.data) return null

  const onSubmit = async (data: UpdateUserInput) => {
    updateUser.mutate(
      {
        userId: userId,
        data: data,
        handler: handler,
        email: email,
      },
      {
        onSuccess: () => {
          notify({
            type: "success",
            message: "Updated bio successfully",
          })
          resetRef.current?.()
          router.refresh()
        },
        onError: () => {
          notify({
            type: "error",
            message: "Failed to update bio",
          })
        },
      },
    )
  }

  return (
    <div className="mb-2 border-b border-(--foreground) pb-2">
      <Form schema={updateUserInputSchema} onSubmit={onSubmit}>
        {({ register, formState, reset }) => {
          resetRef.current = reset
          return (
            <>
              <Textarea
                label="Bio"
                registration={register("bio")}
                error={formState.errors.bio}
                placeholder="Enter info about yourself that you want to share."
                className="no-scrollbar h-20 w-full rounded-xl border border-(--foreground) bg-neutral-950 p-1 px-2 text-sm"
              />
              <button className="rounded-xl border border-(--foreground) p-1 px-2 text-sm text-neutral-200 hover:border-(--secondary) hover:text-(--secondary)">
                submit
              </button>
            </>
          )
        }}
      </Form>
    </div>
  )
}
