"use client";

import { Form } from "@/components/ui/form/form"
import { CreateAnnouncementInput, createAnnouncementInputSchema, useCreateAnnouncement } from "../api/create-announcement"
import { useRef } from "react";
import { useUser } from "@/lib/auth";
import { Textarea } from "@/components/ui/form/textarea";


export const CreateAnnouncement = () => {
  const user = useUser();
  const resetRef = useRef<(() => void) | null>(null);  
  const createAnnouncement = useCreateAnnouncement();

  if(user.isLoading) return <div>loading</div>;

  const onSubmit = async (data : CreateAnnouncementInput) => {
      createAnnouncement.mutate(
        { data },
        {
          onSuccess: () => {
            console.log("Announcement created!");
            resetRef.current?.();
          },
        }
      )
    }
  return (
    <div>
      <h1>announcement form</h1>
      <Form schema={createAnnouncementInputSchema} onSubmit={onSubmit}>
        {
          ({ register, formState, reset }) =>
          {
            resetRef.current = reset;
            return (
              <>
                <Textarea label="content" className="border pl-1" error={formState.errors.content} registration={register("content")}/>
                <button type="submit" disabled={formState.isSubmitting}>Submit</button><br/>
              </>
            )
          } 
          
        }
      </Form>
    </div>
  )
}