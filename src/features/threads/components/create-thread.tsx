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
    <div className="border-foreground border-b pb-2">
      <h1 className="border-foreground mb-2 border-b text-xl">Create Thread</h1>
      <Form schema={createThreadInputSchema} onSubmit={onSubmit}>
        {({ register, formState, reset }) => {
          resetRef.current = reset
          return (
            <>
              <Input
                label="Title"
                type="text"
                className="border-foreground w-50 rounded-lg border bg-neutral-950 p-1 px-2 text-sm"
                error={formState.errors.title}
                registration={register("title")}
              />
              <Textarea
                label="Description"
                className="no-scrollbar border-foreground h-20 w-full rounded-xl border bg-neutral-950 p-1 px-2 text-sm"
                error={formState.errors.description}
                registration={register("description")}
              />
              <Input
                label="Thread's Image"
                registration={register("image")}
                error={formState.errors.image as FieldError | undefined}
                type="file"
                accept="image/*"
                className="hover:file:border-secondary inline text-sm file:rounded-2xl file:border file:px-2 file:py-1 file:text-xs file:font-semibold hover:file:text-(--secondary)"
              />
              <button
                disabled={formState.isSubmitting}
                className="border-foreground hover:border-secondary hover:text-secondary mt-4 w-fit rounded-xl border p-1 px-2 text-sm text-neutral-200"
              >
                submit
              </button>
              {formState.errors.root && (
                <div className="mt-1 text-xs text-red-500">{formState.errors.root.message}</div>
              )}
            </>
          )
        }}
      </Form>
    </div>
  )
}
