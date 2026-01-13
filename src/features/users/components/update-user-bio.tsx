"use client"

import { useUser } from "@/lib/auth"
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user"
import { Form } from "@/components/ui/form/form"
import { Textarea } from "@/components/ui/form/textarea"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type UpdateUserBioProps = {
  userId: string
  handler: string
  email: string
}

export const UpdateUserBio = ({ userId, handler, email }: UpdateUserBioProps) => {
  const user = useUser()
  const updateUser = useUpdateUser({
    mutationConfig: {
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
  })
  const resetRef = useRef<(() => void) | null>(null)
  const router = useRouter()
  const notify = useNotificationStore((s) => s.notify)

  if (!user || !user.data) return null

  const onSubmit = async (data: UpdateUserInput) => {
    updateUser.mutate({
      userId: userId,
      data: data,
      handler: handler,
      email: email,
    })
  }

  return (
    <div className="border-foreground mb-2 border-b pb-2">
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
                className="no-scrollbar border-foreground h-20 w-full rounded-xl border bg-neutral-950 p-1 px-2 text-sm"
              />
              <button className="border-foreground hover:border-secondary hover:text-secondary rounded-xl border p-1 px-2 text-sm text-neutral-200">
                submit
              </button>
            </>
          )
        }}
      </Form>
    </div>
  )
}
