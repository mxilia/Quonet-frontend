import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { z, ZodObject, ZodRawShape } from "zod";

type FormProps<Shape extends ZodRawShape> = Omit<UseFormProps<z.input<ZodObject<Shape>>, any, z.output<ZodObject<Shape>>>, "resolver"> 
  & { 
    schema: ZodObject<Shape>; 
    className?: string;
    children: (methods: UseFormReturn<z.input<ZodObject<Shape>>, any, z.output<ZodObject<Shape>>>) => React.ReactNode;
    onSubmit: (data : z.output<ZodObject<Shape>>) => Promise<void>
  };

export const Form = <Shape extends ZodRawShape>({ schema, className, children, onSubmit, ...formProps }: FormProps<Shape>) => {
  const form = useForm<z.input<ZodObject<Shape>>, any, z.output<ZodObject<Shape>>>({
    ...formProps,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>
          { children(form) }
        </fieldset>
      </form>
    </FormProvider>
  )
}
  

