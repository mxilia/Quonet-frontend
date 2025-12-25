import { useUser } from "@/lib/auth";
import { CreateCommentInput, createCommentInputSchema, useCreateComment } from "../api/create-comment";
import { canCreateComment } from "@/lib/authorization";
import { Form } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { useRef } from "react";
import { BlurBackground } from "@/components/ui/background/blur-background";

type CreateCommentProps = {
  parentId: string;
  rootId: string;
  handler: string;
  setIsReplying: (e: boolean) => void;
}

export const CreateComment = ({ parentId, rootId, handler, setIsReplying } : CreateCommentProps) => {
  const { data: user, isLoading, error } = useUser();
  const resetRef = useRef<(() => void) | null>(null);
    
  if(isLoading) return (<div>is loading..</div>)

  if(!canCreateComment(user)) return (<div>go login</div>)

  const createPost = useCreateComment();

  const onSubmit = async (data : CreateCommentInput) => {
    createPost.mutate(
      { authorId: user!.id, parentId: parentId, rootId: rootId, data: data },
      {
        onSuccess: () => {
          console.log("Comment created!");
          resetRef.current?.();
          setIsReplying(false);
        },
      }
    )
  }
  return (
    <>
      <div className="fixed top-0 left-0 z-10 flex justify-center items-center h-screen w-screen flex-col">
        <div className="bg-black p-3 rounded-lg border-(--foreground) border text-neutral-100">
          <h1>{`Replying to ${handler}`}</h1>
          <button onClick={() => setIsReplying(false)}>close</button>
          <Form schema={createCommentInputSchema} onSubmit={onSubmit}>
            {
            ({ register, formState, reset }) => { 
              resetRef.current = reset;
              return (
                <>
                  <Input registration={register("content")}  error={formState.errors.content} className="bg-(--darker-foreground) pl-2"/>
                  <button type="submit" className="">Submit</button><br/>
                </>
              )
            }
            }
          </Form>
        </div>
      </div>
      <BlurBackground />
    </>
  )
}