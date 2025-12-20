'use client';

import { useUser } from "@/lib/auth";
import { canCreatePost } from "@/lib/authorization";
import { CreatePostInput, createPostInputSchema, useCreatePost } from "../api/create-post";
import { SelectThread } from "@/features/threads/components/select-thread";
import { Form } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { Textarea } from "@/components/ui/form/textarea";
import { useRef } from "react";
import { BlurBackground } from "@/components/ui/background/blur-background";

type CreatePostProps = {
  active: boolean;
  setActive: (e : boolean) => void,
}

export const CreatePost = ({ active, setActive } : CreatePostProps ) => {
  const { data: user, isLoading, error } = useUser();
  const resetRef = useRef<(() => void) | null>(null);
  
  if(isLoading) return (<div>is loading..</div>)

  if(!canCreatePost(user)) return (<div>go login</div>)

  const createPost = useCreatePost();

  const onSubmit = async (data : CreatePostInput) => {
    createPost.mutate(
      { data },
      {
        onSuccess: () => {
          console.log("Post created!");
          resetRef.current?.();
        },
      }
    )
  }

  if(!active) return null;

  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex justify-center items-center h-screen w-screen flex-col">
        <div className="bg-black p-3 rounded-lg border-(--foreground) border text-neutral-100">
          <h1> New Post </h1>
          <div onClick={() => setActive(false)}>close</div>
          <Form schema={createPostInputSchema} onSubmit={onSubmit}>
            {
            ({ register, formState, reset }) => {
              resetRef.current = reset;
              return (
                <>
                  <Input label="title" type="text" className="border pl-1" error={formState.errors.title} registration={register("title")}/>
                  <Textarea label="content" className="border pl-1" error={formState.errors.content} registration={register("content")}/>
                  <SelectThread registeration={register("thread_id")} />
                  <button type="submit" disabled={formState.isSubmitting}>Submit</button><br/>
                </>
              )
            }
            }
          </Form>
        </div>
      </div>
      <BlurBackground />
    </>
  );
}