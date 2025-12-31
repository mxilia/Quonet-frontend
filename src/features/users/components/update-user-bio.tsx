"use client"

import { useUser } from "@/lib/auth"
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user"
import { Form } from "@/components/ui/form/form"
import { Textarea } from "@/components/ui/form/textarea"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export const UpdateUserBio = () => {
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
          console.log("User updated!")
          resetRef.current?.()
          router.refresh()
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
