
import { useEffect } from "react";
import Button from "../UI/button";
import * as z from "zod";
import { useForm, Controller, SubmitHandler, SubmitErrorHandler, useFormContext,  FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { CartProcessContext } from "@/Components/Cart/CartProcessClient";
import { useOptimistic } from "react";

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = {
  watch: UseFormWatch<TFieldValues>
  getValues: UseFormGetValues<TFieldValues>
  getFieldState: UseFormGetFieldState<TFieldValues>
  setError: UseFormSetError<TFieldValues>
  clearErrors: UseFormClearErrors<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  trigger: UseFormTrigger<TFieldValues>
  formState: FormState<TFieldValues>
  resetField: UseFormResetField<TFieldValues>
  reset: UseFormReset<TFieldValues>
  handleSubmit: UseFormHandleSubmit<TFieldValues>
  unregister: UseFormUnregister<TFieldValues>
  control: Control<TFieldValues, TContext>
  register: UseFormRegister<TFieldValues>
  setFocus: UseFormSetFocus<TFieldValues>
}

export type FormValues = z.infer<typeof schema>;

<Form
  action="/api"
  method="post" // default to post
  onSubmit={() => {}} // function to be called before the request
  onSuccess={() => {}} // valid response
  onError={() => {}} // error response
  validateStatus={(status) => status >= 200} // validate status code
/>

const NestedInput =  (
  ({ register, formState: { isDirty } }) => (
    <div>
      <input {...register("test")} />
      {isDirty && <p>This field is dirty</p>}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.formState.isDirty === nextProps.formState.isDirty
);

export const NestedInputContainer = ({ children }) => {
  const methods = useFormContext();

  return <NestedInput {...methods} />;
};

export const ConnectForm = ({ children }) => {
  const methods = useFormContext()
  return children(methods)
}
const schema = z.object({
  variantId: z.string().min(1),
  quantity: z.number().int().min(1),
});

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>()
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>{children(methods)}</form>
  )
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // valgfritt: optimistisk teller i UI (lokalt)
  const [_, addOpt] = useOptimistic(0, (c, by: number) => c + by);

  const { register, handleSubmit } = useForm<FormValues>()

  export default function App() {
    const methods = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(methods.formState.isDirty); // make sure formState is read before render to enable the Proxy

export default function AddToCart({ variantId }: { variantId: string }) {
   const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      variantId: "",
      lastName: "",
    },
  });

  const router = useRouter();
  const processRef = CartProcessContext.useActorRef();
  const methods = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(methods.formState.isDirty); // make sure formState is read before render to enable the Proxy


  return (
    // <FormProvider {...methods}>
    //<form onSubmit={methods.handleSubmit(onSubmit)}>
     <Form<FormValues> onSubmit={onSubmit} className="space-y-4">
      {({ register }) => (
        <FormField
          control={form.control}
          name="variantId"
          render={({ field }) => <input type="hidden" {...field} />}
        />
        //<NestedInputContainer />
        //<input type="submit" />
        <div className="flex items-start gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <QuantitySelector
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Legger til..." : "Legg i kurv"}
          </Button>
        </div>

        {!state.success && state.message && (
          <p className="mt-2 text-xs text-center text-red-600">
            {state.message}
          </p>
        )}
      </form>
    </Form>
  //</FormProvider>
  );
}

export default AddToCart;

function NestedInput() {
  const { register } = useFormContext() // retrieve all hook methods

  return <input {...register("test")} />
}
