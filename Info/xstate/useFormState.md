
</> useFormState: ({ control: Control }) => FormState
This custom hook allows you to subscribe to each form state, and isolate the re-render at the custom hook level. It has its scope in terms of form state subscription, so it would not affect other useFormState and useForm. Using this hook can reduce the re-render impact on large and complex form application.

Props
Name	Type	Description
control	Object	control object provided by useForm. It's optional if you are using FormProvider.
name	string | string[]	Provide a single input name, an array of them, or subscribe to all inputs' formState update.
disabled	boolean = false	Option to disable the subscription.
exact	boolean = false	This prop will enable an exact match for input name subscriptions.
Return
Name	Type	Description
isDirty	boolean	Set to true after the user modifies any of the inputs.
Important: make sure to provide all inputs' defaultValues at the useForm, so hook form can have a single source of truth to compare whether the form is dirty.
const {
  formState: { isDirty, dirtyFields },
  setValue
} = useForm({ defaultValues: { test: "" } })

// isDirty: true ✅
setValue('test', 'change')

// isDirty: false because there getValues() === defaultValues ❌
setValue('test', '')
File typed input will need to be managed at the app level due to the ability to cancel file selection and FileList object.
Do not support custom object, Class or File object.
dirtyFields	object	An object with the user-modified fields. Make sure to provide all inputs' defaultValues via useForm, so the library can compare against the defaultValues.
Important: make sure to provide defaultValues at the useForm, so hook form can have a single source of truth to compare each field's dirtiness.
Dirty fields will not represent as isDirty formState, because dirty fields are marked field dirty at field level rather the entire form. If you want to determine the entire form state use isDirty instead.
touchedFields	object	An object containing all the inputs the user has interacted with.
defaultValues	object	The value which has been set at useForm's defaultValues or updated defaultValues via reset API.
isSubmitted	boolean	Set to true after the form is submitted. Will remain true until the reset method is invoked.
isSubmitSuccessful	boolean	Indicate the form was successfully submitted without any runtime error.
isSubmitting	boolean	true if the form is currently being submitted. false otherwise.
isLoading	boolean	true if the form is currently loading async default values.
Important: this prop is only applicable to async defaultValues
const {
  formState: { isLoading }
} = useForm({
  defaultValues: async () => await fetch('/api')
})
submitCount	number	Number of times the form was submitted.
isValid	boolean	Set to true if the form doesn't have any errors.
setError has no effect on isValid formState, isValid will always derived via the entire form validation result.
isValidating	boolean	Set to true during validation.
validatingFields	object	Capture fields which are getting async validation.
errors	object	An object with field errors. There is also an ErrorMessage component to retrieve error message easily.
disabled	boolean	Set to true if the form is disabled via the disabled prop in useForm.
 RULES
Returned formState is wrapped with Proxy to improve render performance and skip extra computation if specific state is not subscribed, so make sure you deconstruct or read it before render in order to enable the subscription.

const { isDirty } = useFormState() // ✅
const formState = useFormState() // ❌ should deconstruct the formState
Examples

Copy
CodeSandbox
JS
import { useForm, useFormState } from "react-hook-form"

function Child({ control }) {
  const { dirtyFields } = useFormState({ control })

  return dirtyFields.firstName ? <p>Field is dirty.</p> : null
}

export default function App() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "firstName",
    },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <Child control={control} />

      <input type="submit" />
    </form>
  )
}
Thank you for your support
