"use client"

import { useUser } from "@/lib/auth"
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user"
import { Input } from "@/components/ui/form/input"
import { Form } from "@/components/ui/form/form"
import { useRef } from "react"
import { useRouter } from "next/navigation"

export const UpdateUserHandler = () => {
  const user = useUser()
  const updateUser = useUpdateUser()
  const resetRef = useRef<(() => void) | null>(null)
  const router = useRouter()

  const onSubmit = async (data: UpdateUserInput) => {
    updateUser.mutate(
      {
        userId: user.data!.id,
        data: data,
        handler: user.data!.handler,
        email: user.data!.email,
      },
      {
        onSuccess: () => {
          resetRef.current?.()
          router.refresh()
          console.log("Thread created!")
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
              <Input
                label="Handler"
                registration={register("handler")}
                error={formState.errors.handler}
                defaultValue={user.data?.handler}
                className="mb-1 w-50 rounded-lg border border-(--foreground) bg-neutral-950 p-1 px-2 text-sm"
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
