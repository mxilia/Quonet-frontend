import { useUser } from "@/lib/auth"
import {
  CreateCommentInput,
  createCommentInputSchema,
  useCreateComment,
} from "../api/create-comment"
import { canCreateComment } from "@/lib/authorization"
import { Form } from "@/components/ui/form/form"
import { Input } from "@/components/ui/form/input"
import { useRef } from "react"
import { BlurBackground } from "@/components/ui/background/blur-background"
import { Textarea } from "@/components/ui/form/textarea"
import { useNotificationStore } from "@/components/ui/notification/notification.store"

type CreateCommentProps = {
  parentId: string
  rootId: string
  handler: string
  setIsReplying: (e: boolean) => void
}

export const CreateComment = ({ parentId, rootId, handler, setIsReplying }: CreateCommentProps) => {
  const user = useUser()
  const resetRef = useRef<(() => void) | null>(null)
  const createPost = useCreateComment()
  const notify = useNotificationStore((s) => s.notify)

  if (!canCreateComment(user.data)) return null

  const onSubmit = async (data: CreateCommentInput) => {
    createPost.mutate(
      { authorId: user.data!.id, parentId: parentId, rootId: rootId, data: data },
      {
        onSuccess: () => {
          notify({
            type: "success",
            message: "Created comment successfully",
          })
          resetRef.current?.()
          setIsReplying(false)
        },
        onError: () => {
          notify({
            type: "error",
            message: "Failed to create comment",
          })
        },
      },
    )
  }
  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-center">
        <div className="w-70 rounded-lg border border-(--foreground) bg-black p-3 text-neutral-100 [@media(min-width:400px)]:w-100">
          <div className="flex items-center justify-between pb-1">
            <h1 className="text-xl font-semibold"> {`Replying to ${handler}`} </h1>
            <div onClick={() => setIsReplying(false)} className="text-xs text-red-500">
              close
            </div>
          </div>
          <Form schema={createCommentInputSchema} onSubmit={onSubmit}>
            {({ register, formState, reset }) => {
              resetRef.current = reset
              return (
                <>
                  <Textarea
                    registration={register("content")}
                    placeholder={`Your thoughts on ${handler}`}
                    className="no-scrollbar h-20 w-full rounded-xl border border-(--foreground) bg-neutral-950 p-1 px-2 text-sm"
                    error={formState.errors.content}
                  />
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="mt-1 w-fit rounded-xl border border-(--foreground) p-1 px-2 text-sm text-neutral-200 hover:border-(--secondary) hover:text-(--secondary)"
                  >
                    Submit
                  </button>
                </>
              )
            }}
          </Form>
        </div>
      </div>
      <BlurBackground />
    </>
  )
}
