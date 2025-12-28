import { useUser } from "@/lib/auth";
import { CreateCommentInput, createCommentInputSchema, useCreateComment } from "../api/create-comment";
import { canCreateComment } from "@/lib/authorization";
import { Form } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { useRef } from "react";
import { BlurBackground } from "@/components/ui/background/blur-background";
import { Textarea } from "@/components/ui/form/textarea";

type CreateCommentProps = {
  parentId: string;
  rootId: string;
  handler: string;
  setIsReplying: (e: boolean) => void;
}

export const CreateComment = ({ parentId, rootId, handler, setIsReplying } : CreateCommentProps) => {
  const user = useUser();
  const resetRef = useRef<(() => void) | null>(null);

  if(!canCreateComment(user.data)) return null;

  const createPost = useCreateComment();

  const onSubmit = async (data : CreateCommentInput) => {
    createPost.mutate(
      { authorId: user.data!.id, parentId: parentId, rootId: rootId, data: data },
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
        <div className="bg-black p-3 w-100 rounded-lg border-(--foreground) border text-neutral-100">
          <div className="pb-1 flex justify-between items-center" >
            <h1 className="text-xl font-semibold"> {`Replying to ${handler}`} </h1>
            <div onClick={() => setIsReplying(false)} className="text-red-500 text-xs">close</div>
          </div>
          <Form schema={createCommentInputSchema} onSubmit={onSubmit}>
            {
            ({ register, formState, reset }) => { 
              resetRef.current = reset;
              return (
                <>
                  <Textarea registration={register("content")} placeholder={`Your thoughts on ${handler}`} className="text-sm border bg-neutral-950 border-(--foreground) rounded-xl w-full h-20 p-1 px-2 no-scrollbar" error={formState.errors.content}/>
                  <button type="submit" disabled={formState.isSubmitting} className="w-fit mt-1 border border-(--foreground) hover:text-(--secondary) hover:border-(--secondary) p-1 px-2 rounded-xl text-sm text-neutral-200">Submit</button>
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