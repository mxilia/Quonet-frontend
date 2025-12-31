"use client"

import { useUser } from "@/lib/auth"
import { canCreatePost } from "@/lib/authorization"
import { CreatePostInput, createPostInputSchema, useCreatePost } from "../api/create-post"
import { SelectThread } from "@/features/threads/components/select-thread"
import { Form } from "@/components/ui/form/form"
import { Input } from "@/components/ui/form/input"
import { Textarea } from "@/components/ui/form/textarea"
import { useRef } from "react"
import { BlurBackground } from "@/components/ui/background/blur-background"
import { FieldError } from "react-hook-form"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type CreatePostProps = {
  active: boolean
  setActive: (e: boolean) => void
}

export const CreatePost = ({ active, setActive }: CreatePostProps) => {
  const user = useUser()
  const resetRef = useRef<(() => void) | null>(null)
  const createPost = useCreatePost()
  const notify = useNotificationStore((s) => s.notify)

  if (user.isLoading) return null
  if (!canCreatePost(user.data)) return null

  const onSubmit = async (data: CreatePostInput) => {
    console.log("submitted")
    createPost.mutate(
      { data },
      {
        onSuccess: () => {
          setActive(false)
          notify({
            type: "success",
            message: "Created post successfully",
          })
          resetRef.current?.()
        },
        onError: () => {
          notify({
            type: "error",
            message: "Failed to create post",
          })
        },
      },
    )
  }

  if (!active) return null

  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center">
        <div className="w-70 rounded-lg border border-(--foreground) bg-black p-3 text-neutral-100 [@media(min-width:400px)]:w-100">
          <div className="flex items-center justify-between border-b border-(--foreground) pb-1">
            <h1 className="text-xl font-semibold"> New Post </h1>
            <div onClick={() => setActive(false)} className="text-xs text-red-500">
              close
            </div>
          </div>
          <Form schema={createPostInputSchema} onSubmit={onSubmit}>
            {({ register, formState, reset }) => {
              resetRef.current = reset
              return (
                <div className="inline-flex flex-col gap-2">
                  <Input
                    label="Title"
                    type="text"
                    placeholder="Your post's title"
                    className="w-50 rounded-lg border border-(--foreground) bg-neutral-950 p-1 px-2 text-sm"
                    error={formState.errors.title}
                    registration={register("title")}
                  />
                  <Textarea
                    label="Content"
                    error={formState.errors.content}
                    placeholder="Your post's content or story"
                    registration={register("content")}
                    className="no-scrollbar h-20 w-64 rounded-xl border border-(--foreground) bg-neutral-950 p-1 px-2 text-sm [@media(min-width:400px)]:w-94"
                  />
                  <div>
                    <SelectThread
                      label="Select Thread"
                      registeration={register("thread_id")}
                      error={formState.errors.thread_id}
                      className="w-64 rounded-xl border border-(--foreground) bg-neutral-950 p-1 px-2 text-sm [@media(min-width:400px)]:w-94"
                      searchBarClassName="bg-neutral-900 text-sm border-(--foreground) border h-7 mr-10 mt-1 rounded-lg p-1 px-2 [@media(min-width:400px)]:w-94 w-64"
                    />
                    <div className="mb-2 w-64 text-xs text-neutral-500 [@media(min-width:400px)]:w-94">
                      Please make sure to select which thread you want your post to be in. It's
                      required.{" "}
                    </div>
                  </div>
                  <Input
                    label="Post's Thumbnail"
                    registration={register("thumbnail")}
                    error={formState.errors.thumbnail as FieldError | undefined}
                    type="file"
                    accept="image/*"
                    className="inline text-sm file:rounded-2xl file:border file:px-2 file:py-1 file:text-xs file:font-semibold hover:file:border-(--secondary) hover:file:text-(--secondary)"
                  />
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="mt-4 w-fit rounded-xl border border-(--foreground) p-1 px-2 text-sm text-neutral-200 hover:border-(--secondary) hover:text-(--secondary)"
                  >
                    Submit
                  </button>
                </div>
              )
            }}
          </Form>
        </div>
      </div>
      <BlurBackground />
    </>
  )
}
