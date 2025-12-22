import { useUser } from "@/lib/auth";
import { UpdateUserInput, updateUserInputSchema, useUpdateUser } from "../api/update-user"
import { Input } from "@/components/ui/form/input";
import { Form } from "@/components/ui/form/form";

export const UpdateUser = () => {
  const user = useUser();
  const updateUser = useUpdateUser();

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
            console.log("Thread created!");
          },
        }
      )
    }
  

  return (
    <>
      <Form schema={updateUserInputSchema} onSubmit={onSubmit}>
        {
          ({ register, formState }) => {
            return (
              <>
                <Input registration={register("handler")} error={formState.errors.handler} />
                <button>submit</button>
              </>
            )
          }
        }
      </Form>
    </>
  )
}