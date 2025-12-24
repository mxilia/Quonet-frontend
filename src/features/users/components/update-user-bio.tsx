'use client';

import { useUser } from "@/lib/auth";
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user";
import { Form } from "@/components/ui/form/form";
import { Textarea } from "@/components/ui/form/textarea";
import { useRouter } from 'next/navigation';

export const UpdateUserBio = () => {
  const user = useUser();
  const updateUser = useUpdateUser();
  const router = useRouter();

  const onSubmit = async (data : UpdateUserInput) => {
      updateUser.mutate(
        {
          userId: user.data!.id,
          data: data,
          handler: user.data!.handler,
          email: user.data!.email,
        },
        {
          onSuccess: () => {
            console.log("User updated!");
            router.refresh();
          },
        }
      )
    }
  

  return (
    <div className="border-b pb-2 border-(--foreground) mb-2">
      <Form schema={updateUserInputSchema} onSubmit={onSubmit}>
        {
          ({ register, formState }) => {
            return (
              <>
                <Textarea label="Bio" registration={register("bio")} error={formState.errors.bio} placeholder="Enter info about yourself that you want to share." className="text-sm border bg-neutral-950 border-(--foreground) rounded-xl w-full h-20 p-1 px-2 no-scrollbar" />
                <button className="border border-(--foreground) hover:text-(--secondary) hover:border-(--secondary) p-1 px-2 rounded-xl text-sm text-neutral-200">submit</button>
              </>
            )
          }
        }
      </Form>
    </div>
  )
}