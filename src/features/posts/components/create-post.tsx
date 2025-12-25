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
import { FieldError } from "react-hook-form";

type CreatePostProps = {
  active: boolean;
  setActive: (e : boolean) => void,
}

export const CreatePost = ({ active, setActive } : CreatePostProps ) => {
  const user = useUser();
  const resetRef = useRef<(() => void) | null>(null);
  const createPost = useCreatePost();
  
  if(user.isLoading) return (<div>is loading..</div>)
  if(!canCreatePost(user.data)) return null;

  const onSubmit = async (data : CreatePostInput) => {
    console.log("submitted")
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
        <div className="bg-black p-3 w-100 rounded-lg border-(--foreground) border text-neutral-100">
          <div className="border-b border-(--foreground) pb-1 flex justify-between items-center" >
            <h1 className="text-xl font-semibold"> New Post </h1>
            <div onClick={() => setActive(false)} className="text-red-500 text-xs">close</div>
          </div>
          <Form schema={createPostInputSchema} onSubmit={onSubmit}>
            {
            ({ register, formState, reset }) => {
              resetRef.current = reset;
              return (
                <div className="inline-flex flex-col gap-2">
                  <Input label="Title" type="text" placeholder="Your post's title" className="text-sm border bg-neutral-950 border-(--foreground) rounded-lg w-50 p-1 px-2" error={formState.errors.title} registration={register("title")}/>
                  <Textarea label="Content" error={formState.errors.content} placeholder="Your post's content or story" registration={register("content")} className="text-sm border bg-neutral-950 border-(--foreground) rounded-xl w-full h-20 p-1 px-2 no-scrollbar"/>
                  <div>
                    <SelectThread 
                      label="Select Thread" registeration={register("thread_id")} error={formState.errors.thread_id}
                      className="text-sm border bg-neutral-950 border-(--foreground) rounded-xl w-full p-1 px-2" 
                      searchBarClassName="bg-neutral-900 text-sm border-(--foreground) border h-7 mr-10 mt-1 rounded-lg p-1 px-2 w-full"
                    />
                    <div className="text-xs text-neutral-500 mb-2">Please make sure to select which thread you want your post to be in. It's required. </div>
                  </div>
                  <Input label="Post's Thumbnail" registration={register("thumbnail")} error={formState.errors.thumbnail as FieldError | undefined} type="file" accept="image/*" className="inline text-sm file:py-1 file:px-2 file:rounded-2xl file:border file:text-xs file:font-semibold hover:file:border-(--secondary) hover:file:text-(--secondary)" />
                  <button type="submit" disabled={formState.isSubmitting} className="w-fit mt-4 border border-(--foreground) hover:text-(--secondary) hover:border-(--secondary) p-1 px-2 rounded-xl text-sm text-neutral-200">Submit</button>
                </div>
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