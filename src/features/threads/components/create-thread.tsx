"use client"

import { useUser } from "@/lib/auth"
import { CreateThreadInput, createThreadInputSchema, useCreateThread } from "../api/create-thread"
import { canCreateThread } from "@/lib/authorization"
import { Form } from "@/components/ui/form/form"
import { Input } from "@/components/ui/form/input"
import { Textarea } from "@/components/ui/form/textarea"
import { useRef } from "react"
import { FieldError } from "react-hook-form"

export const CreateThread = () => {
  const user = useUser()
  const resetRef = useRef<(() => void) | null>(null)

  if (user.isLoading) return null
  if (!canCreateThread(user.data)) return null

  const createThread = useCreateThread()

  const onSubmit = async (data: CreateThreadInput) => {
    createThread.mutate(
      { data: data },
      {
        onSuccess: () => {
          resetRef.current?.()
          console.log("Thread created!")
        },
      },
    )
  }

  return (
    <div className="border-b border-foreground pb-2">
      <h1 className="text-xl mb-2 border-b border-foreground">Create Thread</h1>
      <Form schema={createThreadInputSchema} onSubmit={onSubmit}>
        {({ register, formState, reset }) => {
          resetRef.current = reset
          return (
            <>
              <Input
                label="Title"
                type="text"
                className="w-50 rounded-lg border border-foreground bg-neutral-950 p-1 px-2 text-sm"
                error={formState.errors.title}
                registration={register("title")}
              />
              <Textarea
                label="Description"
                className="no-scrollbar h-20 w-full rounded-xl border border-foreground bg-neutral-950 p-1 px-2 text-sm"
                error={formState.errors.description}
                registration={register("description")}
              />
              <Input
                label="Thread's Image"
                registration={register("image")}
                error={formState.errors.image as FieldError | undefined}
                type="file"
                accept="image/*"
                className="inline text-sm file:rounded-2xl file:border file:px-2 file:py-1 file:text-xs file:font-semibold hover:file:border-secondary hover:file:text-(--secondary)"
              />
              <button disabled={formState.isSubmitting}
                    className="mt-4 w-fit rounded-xl border border-foreground p-1 px-2 text-sm text-neutral-200 hover:border-secondary hover:text-secondary">
                submit
              </button>
              {formState.errors.root && <div className="text-xs text-red-500 mt-1">{formState.errors.root.message}</div>}
            </>
          )
        }}
      </Form>
    </div>
  )
}
