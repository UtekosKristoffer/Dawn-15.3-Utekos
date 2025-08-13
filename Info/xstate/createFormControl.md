
createFormControl
This function create the entire form state subscription and allow you to subscribe update with or without react component. You can use this function without the need of React Context api.

Props
Name	Type	Description
...props	Object	UseFormProps
Returns
Name	Type	Description
formControl	Object	control object for useForm hook
control	Object	control object for useController, useFormState, useWatch
subscribe	Function	function to subscribe for form state update without render
...returns	Functions	useForm return methods
 NOTES
This function is published at v7.55.0 - This function is completely optional, you can consider to use this instead of useFormContext API. - You may find it useful if you would like to subscribe formsState by skipping react re-render.
 RULES
You should either use this API or context API
const props = createFormControl()

<FormProvider {...props} /> // ❌ You don't need provider

<input {...props.register('name')} /> // ✅ Direct use method from createFormControl
Examples:

Setup
Subscribe
const { formControl, control, handleSubmit, register } = createFormControl({
  mode: 'onChange',
  defaultValues: {
    firstName: 'Bill'
  }
}})

function App() {
  useForm({
    formControl,
  })

  return (
    <form onSubmit={handleSubmit(data => console.log)}>
      <input {...register('name')} />
      <FormState />
      <Controller />
    </form>
  );
}

function FormState() {
  useFormState({
    control // no longer need context api
  })
}

function Controller() {
  useFormState({
    control // no longer need context api
  })
}
Thank you for your support
If you find React Hook Form to be useful in your project, please consider to star and support it.

