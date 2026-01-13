"use client"

import { useUser } from "@/lib/auth"
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user"
import { useRef } from "react"
import { useNotificationStore } from "@/components/ui/notification/notification.store"
import { Form } from "@/components/ui/form/form"
import { Select } from "@/components/ui/form/select"

type UpdateUserRoleProps = {
  userId: string
  handler: string
  email: string
}

export const UpdateUserRole = ({ userId, handler, email }: UpdateUserRoleProps) => {
  const user = useUser()
  const updateUser = useUpdateUser({
    mutationConfig: {
      onSuccess: () => {
        notify({
          type: "success",
          message: "Updated role successfully",
        })
        resetRef.current?.()
      },
      onError: () => {
        notify({
          type: "error",
          message: "Failed to update role",
        })
      },
    },
  })
  const resetRef = useRef<(() => void) | null>(null)
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
    <div>
      <Form schema={updateUserInputSchema} onSubmit={onSubmit}>
        {({ register, formState, reset }) => {
          resetRef.current = reset
          return (
            <div className="inline-flex gap-1">
              <Select
                options={[
                  {
                    label: "owner",
                    value: "owner",
                  },
                  {
                    label: "admin",
                    value: "admin",
                  },
                  {
                    label: "member",
                    value: "member",
                  },
                ]}
                registration={register("role")}
                error={formState.errors.role}
                className="border-foreground rounded-xl border bg-neutral-950 p-1 px-2 text-sm"
              />
              <button
                className="border-foreground hover:border-secondary hover:text-secondary rounded-xl border p-1 px-2 text-sm text-neutral-200"
                type="submit"
              >
                submit
              </button>
            </div>
          )
        }}
      </Form>
    </div>
  )
}
