Typescript Support
List of exported Typescript Types.

Menu
</>
Resolver
</>
SubmitHandler
</>
Control
</>
UseFormReturn
</>
UseFormProps
</>
UseFieldArrayReturn
</>
UseFieldArrayProps
</>
UseControllerReturn
</>
UseControllerProps
</>
FieldError
</>
FieldErrors
</>
Field
</>
FieldPath
</>
FieldPathByValue
</>
FieldValues
</>
FieldArrayWithId
</>
Mode
</>
RegisterOptions
</>
FormStateProxy
</>
NestedValue

In depth with examples:

</> Resolver
Copy
CodeSandbox
TS
import { useForm, Resolver } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  }
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <input {...register("firstName")} placeholder="Bill" />
      {errors?.firstName && <p>{errors.firstName.message}</p>}

      <input {...register("lastName")} placeholder="Luo" />

      <input type="submit" />
    </form>
  )
}
</> SubmitHandler
Copy
CodeSandbox
TS
import { useForm, SubmitHandler } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />

      <input type="submit" />
    </form>
  )
}
</> SubmitErrorHandler
Copy
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const onError: SubmitErrorHandler<FormValues> = (errors) =>
    console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...(register("firstName"), { required: true })} />
      <input {...(register("lastName"), { minLength: 2 })} />
      <input type="email" {...register("email")} />

      <input type="submit" />
    </form>
  )
}
</> Control
Copy
CodeSandbox
TS
import { useForm, useWatch, Control } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
}

function IsolateReRender({ control }: { control: Control<FormValues> }) {
  const firstName = useWatch({
    control,
    name: "firstName",
    defaultValue: "default",
  })

  return <div>{firstName}</div>
}

export default function App() {
  const { register, control, handleSubmit } = useForm<FormValues>()
  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <IsolateReRender control={control} />

      <input type="submit" />
    </form>
  )
}
</> UseFormReturn
Type
Code Example
Copy
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
</> UseFormProps
Copy
export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object,
  TTransformedValues extends FieldValues | undefined = undefined,
> = Partial<{
  mode: Mode
  disabled: boolean
  reValidateMode: Exclude<Mode, "onTouched" | "all">
  defaultValues: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>
  values: TFieldValues
  errors: FieldErrors<TFieldValues>
  resetOptions: Parameters<UseFormReset<TFieldValues>>[1]
  resolver: Resolver<TFieldValues, TContext>
  context: TContext
  shouldFocusError: boolean
  shouldUnregister: boolean
  shouldUseNativeValidation: boolean
  progressive: boolean
  criteriaMode: CriteriaMode
  delayError: number
}>
</> UseFieldArrayReturn
Copy
export type UseFieldArrayReturn<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = "id",
> = {
  swap: UseFieldArraySwap
  move: UseFieldArrayMove
  prepend: UseFieldArrayPrepend<TFieldValues, TFieldArrayName>
  append: UseFieldArrayAppend<TFieldValues, TFieldArrayName>
  remove: UseFieldArrayRemove
  insert: UseFieldArrayInsert<TFieldValues, TFieldArrayName>
  update: UseFieldArrayUpdate<TFieldValues, TFieldArrayName>
  replace: UseFieldArrayReplace<TFieldValues, TFieldArrayName>
  fields: FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName>[]
}
</> UseFieldArrayProps
Copy
export type UseFieldArrayProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> = {
  name: TFieldArrayName
  keyName?: TKeyName
  control?: Control<TFieldValues>
  rules?: {
    validate?
      | Validate<FieldArray<TFieldValues, TFieldArrayName>[], TFieldValues>
      | Record<
          string,
          Validate<FieldArray<TFieldValues, TFieldArrayName>[], TFieldValues>
        >
  } & Pick<
    RegisterOptions<TFieldValues>,
    'maxLength' | 'minLength' | 'required'
  >
  shouldUnregister?: boolean
}
</> UseControllerReturn
Copy
export type UseControllerReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>
  formState: UseFormStateReturn<TFieldValues>
  fieldState: ControllerFieldState
}
</> UseControllerProps
Copy
export type UseControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >
  shouldUnregister?: boolean
  defaultValue?: FieldPathValue<TFieldValues, TName>
  control?: Control<TFieldValues>
  disabled?: boolean
}
</> FieldError
Copy
export type FieldError = {
  type: LiteralUnion<keyof RegisterOptions, string>
  root?: FieldError
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}
</> FieldErrors
Copy
export type FieldErrors<T extends FieldValues = FieldValues> = Partial<
  FieldValues extends IsAny<FieldValues>
    ? any
    : FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError
}
</> Field
Copy
export type Field = {
  _f: {
    ref: Ref
    name: InternalFieldName
    refs?: HTMLInputElement[]
    mount?: boolean
  } & RegisterOptions
}
</> FieldPath
This type is useful when you define custom component's name prop, and it will type check against your field path.

Copy
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>
</> FieldPathByValue
This type will return union with all available paths that match the passed value

Copy
export type FieldPathByValue<TFieldValues extends FieldValues, TValue> = {
  [Key in FieldPath<TFieldValues>]: FieldPathValue<
    TFieldValues,
    Key
  > extends TValue
    ? Key
    : never
}[FieldPath<TFieldValues>]
</> FieldValues
Copy
export type FieldValues = Record<string, any>
</> FieldArrayWithId
Copy
export type FieldArrayWithId<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = "id",
> = FieldArray<TFieldValues, TFieldArrayName> & Record<TKeyName, string>
</> Mode
Copy
export type ValidationMode = typeof VALIDATION_MODE

export type Mode = keyof ValidationMode
</> RegisterOptions
Copy
export type RegisterOptions<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Partial<{
  required: Message | ValidationRule<boolean>
  min: ValidationRule<number | string>
  max: ValidationRule<number | string>
  maxLength: ValidationRule<number>
  minLength: ValidationRule<number>
  validate:
    | Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
    | Record<
        string,
        Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues>
      >
  value: FieldPathValue<TFieldValues, TFieldName>
  setValueAs: (value: any) => any
  shouldUnregister?: boolean
  onChange?: (event: any) => void
  onBlur?: (event: any) => void
  disabled: boolean
  deps: FieldPath<TFieldValues> | FieldPath<TFieldValues>[]
}> &
  (
    | {
        pattern?: ValidationRule<RegExp>
        valueAsNumber?: false
        valueAsDate?: false
      }
    | {
        pattern?: undefined
        valueAsNumber?: false
        valueAsDate?: true
      }
    | {
        pattern?: undefined
        valueAsNumber?: true
        valueAsDate?: false
      }
  )
</> FormStateProxy
Copy
export type FormStateProxy<TFieldValues extends FieldValues = FieldValues> = {
  isDirty: boolean
  isValidating: boolean
  dirtyFields: FieldNamesMarkedBoolean<TFieldValues>
  touchedFields: FieldNamesMarkedBoolean<TFieldValues>
  validatingFields: FieldNamesMarkedBoolean<TFieldValues>
  errors: boolean
  isValid: boolean
}
</> NestedValue (Deprecated at 7.33.0)
Code Example
Type
Copy
CodeSandbox
TS
import { useForm, NestedValue } from "react-hook-form"
import { Autocomplete, TextField, Select } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"

type Option = {
  label: string
  value: string
}

const options = [
  { label: "Chocolate", value: "chocolate" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Vanilla", value: "vanilla" },
]

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{
    autocomplete: NestedValue<Option[]>
    select: NestedValue<number[]>
  }>({
    defaultValues: { autocomplete: [], select: [] },
  })
  const onSubmit = handleSubmit((data) => console.log(data))

  React.useEffect(() => {
    register("autocomplete", {
      validate: (value) => value.length || "This is required.",
    })
    register("select", {
      validate: (value) => value.length || "This is required.",
    })
  }, [register])

  return (
    <form onSubmit={onSubmit}>
      <Autocomplete
        options={options}
        getOptionLabel={(option: Option) => option.label}
        onChange={(e, options) => setValue("autocomplete", options)}
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(errors?.autocomplete)}
            helperText={errors?.autocomplete?.message}
          />
        )}
      />

      <Select
        value=""
        onChange={(e) => setValue("muiSelect", e.target.value as number[])}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>

      <input type="submit" />
    </form>
  )
}
