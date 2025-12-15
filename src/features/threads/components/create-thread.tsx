'use client';

import { useUser } from "@/lib/auth";
import { CreateThreadInput, createThreadInputSchema, useCreateThread } from "../api/create-thread";
import { canCreateThread } from "@/lib/authorization";
import { Form } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";


export const CreateThread = () => {
  const { data: user, isLoading, error } = useUser();

  if(isLoading) return (<div>is loading..</div>);
  if(!canCreateThread(user)) return <div>forbid</div>;
  
  const createThread = useCreateThread();

  const onSubmit = async (data : CreateThreadInput) => {
    createThread.mutate(
      { data: data },
      {
        onSuccess: () => {
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
        ({ register, formState }) => (
          <>
            <Input label="Title" type="text" className="border" error={formState.errors.title} registration={register("title")}/>
            <Input label="Description" type="text" className="border" error={formState.errors.description} registration={register("description")}/>
            <button type="submit" className="border">submit</button>
          </>
        )
        }
      </Form>
      <div>-----------------------------------</div>
    </div>
  );
}