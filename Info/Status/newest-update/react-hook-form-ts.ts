//TYPESCRIPT FOR REACT HOOK FORM

//Resolver

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

//SubmitHandler
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


//SubmitErrorHandler
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



//control
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


//UseFormReturn

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


//UseFormProps

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

//UseFormFieldReturn

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

//UseFieldArrayProps

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

//UseControllerProps

export type UseControllerReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>
  formState: UseFormStateReturn<TFieldValues>
  fieldState: ControllerFieldState
}


//FieldError

export type FieldError = {
  type: LiteralUnion<keyof RegisterOptions, string>
  root?: FieldError
  ref?: Ref
  types?: MultipleFieldErrors
  message?: Message
}

//FieldErrors

export type FieldErrors<T extends FieldValues = FieldValues> = Partial<
  FieldValues extends IsAny<FieldValues>
    ? any
    : FieldErrorsImpl<DeepRequired<T>>
> & {
  root?: Record<string, GlobalError> & GlobalError
}

//Field

export type Field = {
  _f: {
    ref: Ref
    name: InternalFieldName
    refs?: HTMLInputElement[]
    mount?: boolean
  } & RegisterOptions
}

//FieldPath
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>

//FieldPathByValue
export type FieldPathByValue<TFieldValues extends FieldValues, TValue> = {
  [Key in FieldPath<TFieldValues>]: FieldPathValue<
    TFieldValues,
    Key
  > extends TValue
    ? Key
    : never
}[FieldPath<TFieldValues>]


//Mode
export type ValidationMode = typeof VALIDATION_MODE
export type Mode = keyof ValidationMode

//RegisterOptions
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


//FormStateProxy

export type FormStateProxy<TFieldValues extends FieldValues = FieldValues> = {
  isDirty: boolean
  isValidating: boolean
  dirtyFields: FieldNamesMarkedBoolean<TFieldValues>
  touchedFields: FieldNamesMarkedBoolean<TFieldValues>
  validatingFields: FieldNamesMarkedBoolean<TFieldValues>
  errors: boolean
  isValid: boolean
}


