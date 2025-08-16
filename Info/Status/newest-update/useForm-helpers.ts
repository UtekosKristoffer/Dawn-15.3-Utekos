//You should avoid providing undefined as a default value, as it conflicts with the default state of a controlled component.
// defaultValues are cached. To reset them, use the reset API.
// defaultValues will be included in the submission result by default.
// It's recommended to avoid using custom objects containing prototype methods, such as Moment or Luxon, as defaultValues.
// There are other options for including form data:

// adding a hidden input
<input {...register("hidden", { value: "data" })} type="hidden" />

  // include data onSubmit
const onSubmit = (data) => {
  const output = {
    ...data,
    others: "others",
  }
}

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


//fieldErrors

function App() {
  const { errors, data } = useFetch("/api")

  useForm({
    errors, // will get updated once errors returns
  })
}


//resetOptions 
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


//works

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

// example with zod
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


const schema = z.object({
  name: z.string(),
  age: z.number(),
})


type Schema = z.infer<typeof schema>


const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })


  return (
    <form
      onSubmit={handleSubmit((data) => {
        // handle inputs
        console.log(data)
      })}
    >
      <input {...register("name")} />
      <input {...register("age", { valueAsNumber: true })} type="number" />
      <input type="submit" />
    </form>
  )
}






