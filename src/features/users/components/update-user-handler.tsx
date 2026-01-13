"use client"

import { useUser } from "@/lib/auth"
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user"
import { Input } from "@/components/ui/form/input"
import { Form } from "@/components/ui/form/form"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type UpdateUserHandlerProps = {
  userId: string
  handler: string
  email: string
}

export const UpdateUserHandler = ({ userId, handler, email }: UpdateUserHandlerProps) => {
  const user = useUser()
  const updateUser = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        resetRef.current?.()
        router.refresh()
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
              <Input
                label="Handler"
                registration={register("handler")}
                error={formState.errors.handler}
                defaultValue={user.data?.handler}
                className="border-foreground mb-1 w-50 rounded-lg border bg-neutral-950 p-1 px-2 text-sm"
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
