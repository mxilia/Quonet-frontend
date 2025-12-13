'use client';

import { path } from "@/config/path";
import { useUser } from "@/lib/auth";
import { canCreatePost } from "@/lib/authorization";
import { useRedirect } from "@/lib/redirect-client";
import { CreatePostInput, createPostInputSchema, useCreatePost } from "../api/create-post";
import { useEffect, useState } from "react";
import { SelectThread } from "@/features/threads/components/select-thread";
import { Form } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";

export const CreatePost = () => {
  const { data: user, isLoading, error } = useUser();
  
  if(isLoading) return (<div>is loading..</div>)

  const redirect = useRedirect();
  useEffect(() => {
    if(!canCreatePost(user)) redirect(path.public.login.getHref());
  }, [user])

  if(!canCreatePost(user)) return (<div>go login</div>)

  const createPost = useCreatePost({ authorId: user!.id });

  const onSubmit = async (data : CreatePostInput) => {
    createPost.mutate(
      { data },
      {
        onSuccess: () => {
          console.log("Post created!");
        },
      }
    )
  }

  return (
    <div>
      <h1> post form </h1>
      <Form schema={createPostInputSchema} onSubmit={onSubmit}>
        {
        ({ register, formState }) => (
          <>
            <Input label="title" type="text" className="border" error={formState.errors.title} registration={register("title")}/>
            <Input label="content" type="text" className="border" error={formState.errors.content} registration={register("content")}/>
            <SelectThread registeration={register("thread_id")} />
            <button type="submit">Submit</button><br/>
          </>
        )
      }
      </Form>
    </div>
  );
}