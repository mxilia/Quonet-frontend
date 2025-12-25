'use client';

import { useUser } from "@/lib/auth";
import { CreateThreadInput, createThreadInputSchema, useCreateThread } from "../api/create-thread";
import { canCreateThread } from "@/lib/authorization";
import { Form } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { useRef } from "react";


export const CreateThread = () => {
  const { data: user, isLoading, error } = useUser();
  const resetRef = useRef<(() => void) | null>(null);

  if(isLoading) return (<div>is loading..</div>);
  if(!canCreateThread(user)) return <div>forbid</div>;
  
  const createThread = useCreateThread();

  const onSubmit = async (data : CreateThreadInput) => {
    createThread.mutate(
      { data: data },
      {
        onSuccess: () => {
          resetRef.current?.();
          console.log("Thread created!");
        },
      }
    )
  }

  return (
    <div>
      <h1>Create Thread</h1>
      <Form schema={createThreadInputSchema} onSubmit={onSubmit}>
        {
        ({ register, formState, reset }) => {
          resetRef.current = reset;
          return (
          <>
            <Input label="Title" type="text" className="border" error={formState.errors.title} registration={register("title")}/>
            <Textarea label="Description" className="border" error={formState.errors.description} registration={register("description")}/>
            <Input label="Image" registration={register("image")} type="file" accept="image/*" />
            <button type="submit" className="border">submit</button>
          </>
          );
        }
        }
      </Form>
      <div>-----------------------------------</div>
    </div>
  );
}