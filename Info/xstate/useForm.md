
React hooks for form validation

Menu
</> useForm
</>  register
</>  unregister
</>  formState
</>  watch
</>  subscribe
</>  handleSubmit
</>  reset
</>  resetField
</>  setError
</>  clearErrors
</>  setValue
</>  setFocus
</>  getValues
</>  getFieldState
</>  trigger
</>  control
</>  Form
</> useController
</>  Controller
</> useFormContext
</>  FormProvider
</>
useWatch
</> useFormState
</>  ErrorMessage
</>
useFieldArray
</>
useLens
</>
createFormControl
</> useForm: UseFormProps
useForm is a custom hook for managing forms with ease. It takes one object as optional argument. The following example demonstrates all of its properties along with their default values.

Generic props:

Option	Description
mode	Validation strategy before submitting behaviour.
reValidateMode	Validation strategy after submitting behaviour.
defaultValues	Default values for the form, this value will be cached.
values	Reactive values to update the form values.
errors	Server returns errors to update form. ⚠ Important: Keep the errors object reference-stable to avoid infinite re-renders.
resetOptions	Option to reset form state update while updating new form values.
criteriaMode	Display all validation errors or one at a time.
shouldFocusError	Enable or disable built-in focus management.
delayError	Delay error from appearing instantly.
shouldUseNativeValidation	Use browser built-in form constraint API.
shouldUnregister	Enable and disable input unregister after unmount.
disabled	Disable the entire form with all associated inputs.
Schema validation props:

Option	Description
resolver	Integrates with your preferred schema validation library.
context	A context object to supply for your schema validation.
Props
mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit' !React Native: compatible with Controller
This option allows you to configure the validation strategy before a user submits the form. The validation occurs during the onSubmit event, which is triggered by invoking the handleSubmit function.

Name	Type	Description
onSubmit	string	Validation is triggered on the submit event, and inputs attach onChange event listeners to re-validate themselves.
onBlur	string	Validation is triggered on the blur event.
onChange	string	Validation is triggered on the changeevent for each input, leading to multiple re-renders. Warning: this often comes with a significant impact on performance.
onTouched	string	Validation is initially triggered on the first blur event. After that, it is triggered on every change event.

Note: when using with Controller, make sure to wire up onBlur with the render prop.
all	string	Validation is triggered on both blur and change events.
reValidateMode: onChange | onBlur | onSubmit = 'onChange' !React Native: Custom register or using Controller
This option allows you to configure validation strategy when inputs with errors get re-validated after a user submits the form (onSubmit event and handleSubmit function executed). By default, re-validation occurs during the input change event.

defaultValues: FieldValues | () => Promise<FieldValues>
The defaultValues prop populates the entire form with default values. It supports both synchronous and asynchronous assignment of default values. While you can set an input's default value using defaultValue or defaultChecked (as detailed in the official React documentation), it is recommended to use defaultValues for the entire form.

Copy
useForm({
  defaultValues: {
    firstName: '',
    lastName: ''
  }
})

// set default value async
useForm({
  defaultValues: async () => fetch('/api-endpoint');
})
 RULES
You should avoid providing undefined as a default value, as it conflicts with the default state of a controlled component.

defaultValues are cached. To reset them, use the reset API.

defaultValues will be included in the submission result by default.

It's recommended to avoid using custom objects containing prototype methods, such as Moment or Luxon, as defaultValues.

There are other options for including form data:

// adding a hidden input
<input {...register("hidden", { value: "data" })} type="hidden" />
// include data onSubmit
const onSubmit = (data) => {
  const output = {
    ...data,
    others: "others",
  }
}
values: FieldValues
The values prop will react to changes and update the form values, which is useful when your form needs to be updated by external state or server data. The values prop will overwrite the defaultValues prop, unless resetOptions: { keepDefaultValues: true } is also set for useForm.

Copy
// set default value sync
function App({ values }) {
  useForm({
    values, // will get updated when values props updates
  })
}

function App() {
  const values = useFetch("/api")

  useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    values, // will get updated once values returns
  })
}
errors: FieldErrors
The errors props will react to changes and update the server errors state, which is useful when your form needs to be updated by external server returned errors.

Copy
function App() {
  const { errors, data } = useFetch("/api")

  useForm({
    errors, // will get updated once errors returns
  })
}
resetOptions: KeepStateOptions
This property is related to value update behaviors. When values or defaultValues are updated, the reset API is invoked internally. It's important to specify the desired behavior after values or defaultValues are asynchronously updated. The configuration option itself is a reference to the reset method's options.

Copy
// by default asynchronously value or defaultValues update will reset the form values
useForm({ values })
useForm({ defaultValues: async () => await fetch() })

// options to config the behaviour
// eg: I want to keep user interacted/dirty value and not remove any user errors
useForm({
  values,
  resetOptions: {
    keepDirtyValues: true, // user-interacted input will be retained
    keepErrors: true, // input errors will be retained with value update
  },
})
context: object
This context object is mutable and will be injected into the resolver's second argument or Yup validation's context object.	
CodeSandbox
criteriaMode: firstError | all
When set to firstError (default), only the first error from each field will be gathered.
When set to all, all errors from each field will be gathered.
CodeSandbox
shouldFocusError: boolean = true
When set to true (default), and the user submits a form that fails validation, focus is set on the first field with an error.

 NOTE
Only registered fields with a ref will work. Custom registered inputs do not apply. For example: register('test') // doesn't work
The focus order is based on the register order.
delayError: number
This configuration delays the display of error states to the end-user by a specified number of milliseconds. If the user corrects the error input, the error is removed instantly, and the delay is not applied.	
CodeSandbox
shouldUnregister: boolean = false
By default, an input value will be retained when input is removed. However, you can set shouldUnregister to true to unregister input during unmount.

This is a global configuration that overrides child-level configurations. To have individual behavior, set the configuration at the component or hook level, not at useForm.

By default, shouldUnregister: false means unmounted fields are not validated by built-in validation.

By setting shouldUnregister to true at useForm level, defaultValues will not be merged against submission result.

Setting shouldUnregister: true makes your form behave more closely to native forms.

Form values are stored within the inputs themselves.

Unmounting an input removes its value.

Hidden inputs should use the hidden attribute for storing hidden data.

Only registered inputs are included as submission data.

Unmounted inputs must be notified at either useForm or useWatch's useEffect for the hook form to verify that the input is unmounted from the DOM.

const NotWork = () => {
  const [show, setShow] = React.useState(false)
  // ❌ won't get notified, need to invoke unregister
  return show && <input {...register("test")} />
}

const Work = ({ control }) => {
  const { show } = useWatch({ control })
  // ✅ get notified at useEffect
  return show && <input {...register("test1")} />
}

const App = () => {
  const [show, setShow] = React.useState(false)
  const { control } = useForm({ shouldUnregister: true })
  return (
    <div>
      // ✅ get notified at useForm's useEffect
      {show && <input {...register("test2")} />}
      <NotWork />
      <Work control={control} />
    </div>
  )
}
shouldUseNativeValidation: boolean = false
This config will enable browser native validation. It will also enable CSS selectors :valid and:invalid making styling inputs easier. You can still use these selectors even when client-side validation is disabled.

Only works with onSubmit and onChange modes, as the reportValidity execution will focus the error input.
Each registered field's validation message is required to be string to display them natively.
This feature only works with the register API and  useController/Controller that are connected with actual DOM references.
Examples:

Copy
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", {
          required: "Please enter your first name.",
        })} // custom message
      />
      <input type="submit" />
    </form>
  )
}
disabled: boolean = false
This config allows you to disable the entire form and all associated inputs when set to true.
This can be useful for preventing user interaction during asynchronous tasks or other situations where inputs should be temporarily unresponsive.

Examples:

Copy
import { useForm, Controller } from "react-hook-form"

const App = () => {
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, control } = useForm({
    disabled,
  })

  return (
    <form
      onSubmit={handleSubmit(async () => {
        setDisabled(true)
        await sleep(100)
        setDisabled(false)
      })}
    >
      <input
        type={"checkbox"}
        {...register("checkbox")}
        data-testid={"checkbox"}
      />
      <select {...register("select")} data-testid={"select"} />

      <Controller
        control={control}
        render={({ field }) => <input disabled={field.disabled} />}
        name="test"
      />

      <button type="submit">Submit</button>
    </form>
  )
}
resolver: Resolver
This function allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others. The goal is to make sure you can seamlessly integrate whichever validation library you prefer. If you're not using a library, you can always write your own logic to validate your forms.

Copy
npm install @hookform/resolvers
Props
Name	Type	Description
values	object	This object contains the entire form values.
context	object	This is the context object which you can provide to the useForm config. It is a mutable object that can be changed on each re-render.
options	
{
  "criteriaMode": "string",
  "fields": "object",
  "names": "string[]"
}
This is the option object containing information about the validated fields, names and criteriaMode from useForm.
 RULES
Schema validation focuses on field-level error reporting. Parent-level error checking is limited to the direct parent level, which is applicable for components such as group checkboxes.
This function will be cached.
Re-validation of an input will only occur one field at time during a user’s interaction. The lib itself will evaluate the error object to trigger a re-render accordingly.
A resolver can not be used with the built-in validators (e.g.: required, min, etc.)
When building a custom resolver:
Make sure that you return an object with both values and errors properties. Their default values should be an empty object. For example: {}.
The keys of the errors object should match the name values of your fields, but they must be hierarchical rather than a single key for deep errors: ❌ { "participants.1.name": someErr } will not set or clear properly - instead, use ✅ { participants: [null, { name: someErr } ] } as this is reachable as errors.participants[1].name - you can still prepare your errors using flat keys, and then use a function like this one from the zod resolver: toNestErrors(flatErrs, resolverOptions)
Examples:

Yup
Zod
Joi
Ajv
Vest
Custom
Copy
CodeSandbox
TS
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
  .required()

const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema), // yup, joi and even your own.
  })

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register("name")} />
      <input type="number" {...register("age")} />
      <input type="submit" />
    </form>
  )
}
Need more? See Resolver Documentation

 TIP
You can debug your schema via the following code snippet:

Copy
resolver: async (data, context, options) => {
  // you can debug your validation schema here
  console.log("formData", data)
  console.log(
    "validation result",
    await anyResolver(schema)(data, context, options)
  )
  return anyResolver(schema)(data, context, options)
}
useForm return and useEffect dependencies
In a future major release, useForm return will be memoized to optimize performance and reflect changes in formState. As a result, adding the entire return value of useForm to a useEffect dependency list may lead to infinite loops.

 WARNING
The following code is likely to create this situation:

const methods = useForm()

useEffect(() => {
  methods.reset({ ... })
}, [methods])
Passing only the relevant methods, as showed below, should avoid this kind of issue:

const methods = useForm()

useEffect(() => {
  methods.reset({ ... })
}, [methods.reset])
 TIP
The recommended way is to pass destructured methods to the dependencies of an useEffect

const { reset } = useForm()

useEffect(() => {
  reset({ ... })
}, [reset])
More info can be found on this issue

Return
The following list contains reference to useForm return props.

register
unregister
formState
watch
handleSubmit
reset
resetField
setError
clearErrors
setValue
setFocus
getValues
getFieldState
trigger
control
Form
