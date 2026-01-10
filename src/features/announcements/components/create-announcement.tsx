"use client"

import { Form } from "@/components/ui/form/form"
import {
  CreateAnnouncementInput,
  createAnnouncementInputSchema,
  useCreateAnnouncement,
} from "../api/create-announcement"
import { useRef } from "react"
import { useUser } from "@/lib/auth"
import { Textarea } from "@/components/ui/form/textarea"

export const CreateAnnouncement = () => {
  const user = useUser()
  const resetRef = useRef<(() => void) | null>(null)
  const createAnnouncement = useCreateAnnouncement()

  if (user.isLoading) return <div>loading</div>

  const onSubmit = async (data: CreateAnnouncementInput) => {
    createAnnouncement.mutate(
      { data },
      {
        onSuccess: () => {
          console.log("Announcement created!")
          resetRef.current?.()
        },
      },
    )
  }
  return (
    <div className="mb-2">
      <h1 className="border-foreground mb-2 border-b text-xl">Create Announcement</h1>
      <Form schema={createAnnouncementInputSchema} onSubmit={onSubmit}>
        {({ register, formState, reset }) => {
          resetRef.current = reset
          return (
            <>
              <Textarea
                label="content"
                className="no-scrollbar border-foreground h-20 w-full rounded-xl border bg-neutral-950 p-1 px-2 text-sm"
                error={formState.errors.content}
                registration={register("content")}
              />
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-fit rounded-xl border border-(--foreground) p-1 px-2 text-sm text-neutral-200 hover:border-(--secondary) hover:text-(--secondary)"
              >
                Submit
              </button>
              <br />
            </>
          )
        }}
      </Form>
    </div>
  )
}
