import { useForm } from "react-hook-form";
//Important: this prop is only applicable to async defaultValues
const {
  formState: { isLoading }
} = useForm({
  defaultValues: async () => await fetch('/api')
})

type FormInputs = {
  test: string
}

//example 1
export default function App() {
  const {
    register,
    handleSubmit,
    // Read the formState before render to subscribe the form state through Proxy
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs) => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
}

//example 2


import { useForm } from "react-hook-form";
type FormInputs = {
  test: string
}
export default function App() {
  const {
    register,
    handleSubmit,
    formState
  } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs) => console.log(data);
  
  React.useEffect(() => {
    console.log("touchedFields", formState.touchedFields);
  }, [formState]);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
}

//example 3


import { useForm } from "react-hook-form";


type FormInputs = {
  test: string
}


export default function App() {
  const {
    register,
    handleSubmit,
    // Read the formState before render to subscribe the form state through Proxy
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm<FormInputs>();
  const onSubmit = (data: FormInputs) => console.log(data);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
}
